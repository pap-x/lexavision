import './Image.css'

export default function Browse({image}) {

  if (image!=='') {
    return (<img src={image} alt="selected image" className="image"/>);
  }
  else {
    return null;
  }
}