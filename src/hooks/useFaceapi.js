import { useRef, useEffect, useState } from 'react';
// face-api
import * as faceapi from 'face-api.js';

// ----------------------------------------------------------------------

const MODELS_URL = '../../models';

export default function useFaceapi(isWebcam = true) {
  const [isLoading, setIsLoading] = useState(true);

  const sourceRef = useRef(null);
  const canvasRef = useRef(null);
  const canvasParentRef = useRef(null);

  const init = async () => {
    await faceapi.loadSsdMobilenetv1Model(MODELS_URL);
    await faceapi.loadAgeGenderModel(MODELS_URL);
    await faceapi.loadFaceExpressionModel(MODELS_URL);
    if (isWebcam)
      setInterval(() => {
        detect();
      }, 2000);
    else detect();
  };

  const detect = async () => {
    if (typeof sourceRef.current !== 'undefined' && sourceRef.current !== null) {
      let input;
      if (isWebcam) input = sourceRef.current.video;
      else input = sourceRef.current;

      const fullFaceDescriptions = await faceapi.detectAllFaces(input).withFaceExpressions().withAgeAndGender();
      let detectionsForSize;
      if (isWebcam)
        detectionsForSize = faceapi.resizeResults(fullFaceDescriptions, {
          width: input.videoWidth,
          height: input.videoHeight,
        });
      else
        detectionsForSize = faceapi.resizeResults(fullFaceDescriptions, {
          width: input.width,
          height: input.height,
        });
      // draw them into a canvas
      const canvas = canvasRef.current;
      canvas.width = canvasParentRef.current.offsetWidth;
      canvas.height = canvasParentRef.current.offsetHeight;
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, detectionsForSize, { withScore: true });
      faceapi.draw.drawFaceExpressions(canvas, detectionsForSize);

      detectionsForSize.forEach((result) => {
        const { age, gender, genderProbability } = result;
        new faceapi.draw.DrawTextField(
          [`${age} years`, `${gender} (${parseFloat(genderProbability).toFixed(2)})`],
          result.detection.box.bottomRight
        ).draw(canvas);
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    canvasRef.current.width = canvasParentRef.current.offsetWidth;
    canvasRef.current.height = canvasParentRef.current.offsetHeight;
    init();
  }, []);

  return { sourceRef, canvasRef, canvasParentRef, isLoading };
}

// Usage
// const countdown = useCountdown(new Date('07/07/2022 21:30'));
