import './Image.css'

export default function Image({image, loadingText}) {

  if (image!==''&&loadingText) {
    return (<div className="Image-load">
              <img src={image} alt="selected image" className="image-el"/>
            </div>);
  }
  else if (image!==''&&!loadingText) {
    return (<div className="Image">
            <img src={image} alt="selected image" className="image-el"/>
          </div>);
  }
  else {
    return null;
  }
}