import './Image.css'

export default function Image({image}) {

  if (image!=='') {
    return (<img src={image} alt="selected image" className="image"/>);
  }
  else {
    return null;
  }
}