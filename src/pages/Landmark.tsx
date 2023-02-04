import { LegacyRef, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/face-landmarks-detection';
import Webcam from 'react-webcam';

import styled, { css } from 'styled-components';

const Landmark = () => {
  const webcamRef = useRef<null | Webcam>(null);
  const canvasRef = useRef<null | HTMLCanvasElement>(null);

  return (
    <div>
      <StyledWebcam ref={webcamRef} />
      <StyledCanvas ref={canvasRef} />
    </div>
  );
};

export default Landmark;

const commonStyle = css`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
  z-index: 9;
  width: 640px;
  height: 480px;
`;

const StyledWebcam = styled(Webcam)`
  ${commonStyle}
`;

const StyledCanvas = styled.canvas`
  ${commonStyle}
`;
