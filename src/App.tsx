import styled from 'styled-components';

function App() {
  return (
    <StyledWrapper>
      <StyledH1>WebRTC demo</StyledH1>

      <StyledH2>Start your webcam</StyledH2>
      <StyledVideos>
        <StyledVideo>
          <StyledH3>Local</StyledH3>
          <video id="localVideo" autoPlay playsInline></video>
        </StyledVideo>
        <StyledVideo>
          <StyledH3>Remote</StyledH3>
          <video id="remoteVideo" autoPlay playsInline></video>
        </StyledVideo>
      </StyledVideos>

      <button type="button" id="webcamButtom">
        Start webcam
      </button>
      <StyledH2>Create a new call</StyledH2>
      <button type="button" id="callButton" disabled>
        Call
      </button>

      <StyledH2>Join a call</StyledH2>
      <input id="callInput" />
      <button id="answerButton" disabled>
        Answer
      </button>

      <button id="hangupButton" disabled>
        Hangup
      </button>
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
`;

export default App;
