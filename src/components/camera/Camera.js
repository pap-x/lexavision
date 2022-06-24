import IconButton from '@mui/material/IconButton';
import './Camera.css'
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export default function Camera() {

  return (
    <IconButton className="camera-btn" aria-label="camera" sx={{border: "2px solid #757575"}}>
        <CameraAltIcon className="camera-icon" fontSize="large"/>
    </IconButton>
  );
}