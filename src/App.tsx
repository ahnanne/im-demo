import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pc, localStream, remoteStream } from 'store/rtc/atom';
import { firestore } from 'firebase/config';

function App() {
  const peerConnection = useRecoilValue(pc);
  const [localStr, setLocalStr] = useRecoilState(localStream);
  const [remoteStr, setRemoteStr] = useRecoilState(remoteStream);

  const localVideoRef = useRef<null | HTMLVideoElement>(null);
  const remoteVideoRef = useRef<null | HTMLVideoElement>(null);
  const [callInput, setCallInput] = useState('');
  const [callDisabled, setCallDisabled] = useState(true);
  const [answerDisabled, setAnswerDisabled] = useState(true);
  const [hangupDisabled, setHangupDisabled] = useState(true);
  const [webcamDisabled, setWebcamDisabled] = useState(false);

  useEffect(() => {
    if (localStr && remoteStr) {
      // local stream(이 쪽 웹캠) 쪽 트랙(MediaStreamTrack)을 피어 커넥션으로 밀어넣는다.
      localStr.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStr);
      });

      // remote stream(상대방 웹캠) 쪽에서 트랙을 가져와서 비디오 스트림에 추가한다.

      /** Listen to audio/video from the peer connection */
      peerConnection.ontrack = event => {
        event.streams[0].getTracks().forEach(track => {
          remoteStr.addTrack(track);
        });
      };

      const localVideo = localVideoRef.current;
      const remoteVideo = remoteVideoRef.current;

      if (!localVideo) {
        throw new Error('localVideo is null');
      }
      if (!remoteVideo) {
        throw new Error('remoteVideo is null');
      }

      localVideo.srcObject = localStr;
      remoteVideo.srcObject = remoteStr;

      setCallDisabled(false);
      setAnswerDisabled(false);
      setWebcamDisabled(true);
    }
  }, [remoteStr]);

  // 1. 미디어 소스를 설정한다.
  const handleWebcamButtonClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStr(stream);
      setRemoteStr(new MediaStream());
    } catch (e) {
      console.log(e);
    }
  };

  console.log(peerConnection);

  // 2. offer를 생성한다.
  const handleCallButtonClick = async () => {
    // Firestore 콜렉션 참조
    const callDoc = firestore.collection('calls').doc();
    const offerCandidates = callDoc.collection('offerCandidates');
    const answerCandidates = callDoc.collection('answerCandidates');

    setCallInput(callDoc.id); // Firestore에 의해 자동으로 생성되는 id

    // 발신 후보자들을 받고 DB에 저장한다.
    // setLocalDescription 전에 이렇게 리스너를 설정해둬야 한다.
    peerConnection.onicecandidate = event => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };

    // offer 생성
    const offerDescription = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offerDescription);

    /**
     * The RTCSessionDescription interface describes one end of a connection
     * (or potential connection) and how it's configured.
     * https://developer.mozilla.org/en-US/docs/Web/API/RTCSessionDescription
     */
    const offer: RTCSessionDescriptionInit = {
      sdp: offerDescription.sdp ?? '', // Session Description Protocol
      type: offerDescription.type,
    };

    await callDoc.set({ offer });

    // 상대방 응답 대기 (listen for remote answer)
    callDoc.onSnapshot(snapshot => {
      // * onSnapshot: Attaches a listener for QuerySnapshot events.
      // (listen to changes in firestore)
      const data = snapshot.data();

      // 상대방이 응답할 때(when answers the call) 실행한다.
      if (!peerConnection.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);

        peerConnection.setRemoteDescription(answerDescription);
      }
    });

    // 상대방이 응답하면, 피어 커넥션에 후보 추가하기
    answerCandidates.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          peerConnection.addIceCandidate(candidate);
        }
      });
    });

    setHangupDisabled(false);
  };

  // 3. 고유한 ID를 사용하여 응답한다.
  const handleAnswerButtonClick = async () => {
    try {
      const callDoc = firestore.collection('calls').doc(callInput);
      const offerCandidates = callDoc.collection('offerCandidates');
      const answerCandidates = callDoc.collection('answerCandidates');

      peerConnection.onicecandidate = event => {
        event.candidate && answerCandidates.add(event.candidate.toJSON());
      };

      const callData = (await callDoc.get()).data();

      if (!callData) {
        throw new Error('callData is undefined');
      }

      const offerDescription = callData.offer;
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offerDescription));

      const answerDescription = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answerDescription);

      const answer: RTCSessionDescriptionInit = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      await callDoc.update({ answer });

      offerCandidates.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const data = change.doc.data();
            peerConnection.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <StyledWrapper>
      <StyledH1>WebRTC demo</StyledH1>

      <StyledH2>Start your webcam</StyledH2>
      <StyledVideos>
        <StyledVideo>
          <StyledH3>Local</StyledH3>
          <video id="localVideo" autoPlay playsInline ref={localVideoRef}></video>
        </StyledVideo>
        <StyledVideo>
          <StyledH3>Remote</StyledH3>
          <video id="remoteVideo" autoPlay playsInline ref={remoteVideoRef}></video>
        </StyledVideo>
      </StyledVideos>

      <button
        type="button"
        id="webcamButtom"
        disabled={webcamDisabled}
        onClick={handleWebcamButtonClick}
      >
        Start webcam
      </button>
      <StyledH2>Create a new call</StyledH2>
      <button type="button" id="callButton" disabled={callDisabled} onClick={handleCallButtonClick}>
        Call
      </button>

      <StyledH2>Join a call</StyledH2>
      <CallInfoBox>
        <input id="callInput" value={callInput} readOnly disabled />
        <button id="answerButton" disabled={answerDisabled} onClick={handleAnswerButtonClick}>
          Answer
        </button>

        <button id="hangupButton" disabled={hangupDisabled}>
          Hangup
        </button>
      </CallInfoBox>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const StyledH1 = styled.h1`
  color: var(--black);
`;

const StyledH2 = styled.h1`
  color: var(--black);
  font-size: 36px;
`;

const StyledH3 = styled.h1`
  color: var(--black);
  font-size: 24px;
`;

const StyledVideos = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid var(--black);
  margin-bottom: 20px;
`;

const StyledVideo = styled.div`
  width: 400px;
  height: 300px;
  padding: 6px;

  & video {
    width: 100%;
    height: 200px;
  }
`;

const CallInfoBox = styled.div`
  * {
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export default App;
