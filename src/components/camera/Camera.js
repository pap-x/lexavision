import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import './Camera.css'
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export default function Camera({handleImage}) {

  const inputFile = React.useRef(null);
  
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };


  return (
    <div className="Camera">
      <input type="file" id='file' ref={inputFile} style={{display: 'none'}} accept="image/*" capture="environment" onChange={handleImage}/>
      <IconButton className="camera-btn" aria-label="camera" sx={{border: "2px solid #757575"}} onClick={onButtonClick}>
          <CameraAltIcon className="camera-icon" fontSize="large"/>
      </IconButton>
    </div>
  );
}