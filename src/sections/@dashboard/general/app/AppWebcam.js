// hooks
import useFaceapi from '../../../../hooks/useFaceapi';
// components
import Webcam from 'react-webcam';
// ----------------------------------------------------------------------

const videoConstraints = {
  height: 1080,
  width: 1920,
  facingMode: 'environment',
};

export default function AppWebcam() {
  const { sourceRef, canvasRef, canvasParentRef } = useFaceapi();

  return (
    <Stack justifyContent={'center'} sx={{ height: '100%', position: 'relative' }}>
      <Webcam
        ref={sourceRef}
        screenshotQuality={1}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        screenshotFormat="image/jpeg"
        height={'100%'}
        width={'100%'}
      />
      {/* canvas */}
      <div
        ref={canvasParentRef}
        style={{ position: 'absolute', top: '0', zIndex: '9999', height: '100%', width: '100%', overflow: 'hidden' }}
      >
        <canvas ref={canvasRef} style={{ backgroundColor: 'transparent' }} />
      </div>
    </Stack>
  );
}
