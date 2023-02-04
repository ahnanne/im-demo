import { atom } from 'recoil';
import rtcConfig from './config';

/**
 * RTCPeerConnection 인터페이스는 로컬 컴퓨터와 원격 피어 간의
 * WebRTC 연결을 담당하며 원격 피어에 연결하기 위한 메서드들을 제공하고,
 * 연결을 유지하고 연결 상태를 모니터링하며
 * 더 이상 연결이 필요하지 않을 경우연결을 종료합니다.
 */
export const pc = atom<RTCPeerConnection>({
  key: 'PC',
  default: new RTCPeerConnection(rtcConfig),
});

/** My webcam. */
export const localStream = atom<MediaStream | null>({
  key: 'LocalStream',
  default: null,
});

/** Peer's webcam. */
export const remoteStream = atom<MediaStream | null>({
  key: 'RemoteStream',
  default: null,
});
