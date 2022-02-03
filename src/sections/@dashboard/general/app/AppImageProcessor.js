import PropTypes from 'prop-types';
// @mui
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from '@mui/material';
// hooka
import useFaceapi from '../../../../hooks/useFaceapi';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

AppImageProcessor.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default function AppImageProcessor({ imageUrl }) {
  const { sourceRef, canvasRef, canvasParentRef, isLoading } = useFaceapi(false);

  return (
    <Stack justifyContent={'center'} sx={{ height: '100%', position: 'relative' }}>
      <img
        src={imageUrl}
        ref={sourceRef}
        alt="analyzed image"
        style={{ maxHeight: '100%', objectFit: 'contain', opacity: isLoading ? 0.3 : 1 }}
      />
      {isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', width: '100%' }}>
          <CircularProgress color="primary" size={60} />
        </div>
      )}
      <div
        ref={canvasParentRef}
        style={{ position: 'absolute', top: '0', zIndex: '9999', height: '100%', width: '100%', overflow: 'hidden' }}
      >
        <canvas ref={canvasRef} style={{ backgroundColor: 'transparent' }} />
      </div>
    </Stack>
  );
}
