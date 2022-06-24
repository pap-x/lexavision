import * as React from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import IconButton from '@mui/material/IconButton';
import './Browse.css'

export default function Browse({handleImage}) {

  const inputFile = React.useRef(null);
  
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  return (
    <div className="Browse">
        <input type='file' id='file' ref={inputFile} style={{display: 'none'}} accept="image/png, image/gif, image/jpeg" onChange={handleImage}/>
        <IconButton className="browse-btn" aria-label="browse" sx={{border: "2px solid #757575"}} onClick={onButtonClick}>
            <AddPhotoAlternateIcon className="browse-icon" fontSize="large"/>
        </IconButton>
    </div>
  );
}