import { useRef, useState, useEffect } from "react";
import * as bodyPix from "@tensorflow-models/body-pix";
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';
// Register WebGL backend.
import '@tensorflow/tfjs-backend-webgl';
import Webcam from "react-webcam";
import styled, { css } from "styled-components";

const Segmentation = () => {
  const webcamRef = useRef<null | Webcam>(null);
  const canvasRef = useRef<null | HTMLCanvasElement>(null);

  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [pix, setPix] = useState<null | bodyPix.BodyPix>(null);

  const runBodySegment = async () => {
    const net = await bodyPix.load();
    setPix(net);
  };

  const detect = async (net: bodyPix.BodyPix) => {
    try {
      if (!webcamRef.current) {
        throw new Error('no webcamRef.current');
      }
      if (!canvasRef.current) {
        throw new Error('no canvasRef.current');
      }

      const { video } = webcamRef.current;
      if (!video) {
        throw new Error('video is null');
      }

      const { videoWidth, videoHeight } = video;

      // set video width and height
      video.width = videoWidth;
      video.height = videoHeight;

      // set canvas width and height
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // make detections
      const person = await net.segmentPersonParts(video);

      // draw detections
      const coloredPartImage = bodyPix.toColoredPartMask(person);

      bodyPix.drawMask(
        canvasRef.current,
        video,
        coloredPartImage,
        0.7,
        0.1,
        false
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isWebcamReady) {
      (async () => {
        runBodySegment();
      })();
    }
  }, [ isWebcamReady ]);

  useEffect(() => {
    if (pix) {
      const intervalId = window.setInterval(() => {
        detect(pix);
      }, 100);

      return (() => {
        window.clearInterval(intervalId);
      });
    }
  }, [pix]);

  return (
    <div>
      <StyledWebcam ref={webcamRef} mirrored={false} onCanPlay={() => setIsWebcamReady(true)} />
      <StyledCanvas ref={canvasRef} />
    </div>
  );
};

export default Segmentation;

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