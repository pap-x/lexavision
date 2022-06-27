import * as React from 'react';
import logo from './assets/images/logo.png';
import './App.css';
import Settings from './components/settings/Settings';
import Language from './components/language/Language';
import Camera from './components/camera/Camera'
import Browse from './components/browse/Browse';
import Image from './components/image/Image';
import config from './config';

function App() {

  const [sourceType, setSourceType] = React.useState('document');
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const [image, setImage] = React.useState(''); 

  //Image to Byte64 converter
  const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      }
      reader.onerror = error => reject(error);
  });
  
  const handleSourceType = (event, newSourceType) => {
    setSourceType(newSourceType);
  };

  const handleFrom = (event) => {
    setFrom(event.target.value);
  };

  const handleTo = (event) => {
    setTo(event.target.value);
  };

  const handleImage = async (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      
      try {
        const base64Image = await toBase64(event.target.files[0]); 
        console.log(base64Image);

        //CLARIFAI API call
        const raw = JSON.stringify({
          "user_app_id": {
              "user_id": config.CL_USER_ID,
              "app_id": config.CL_APP_ID
          },
          "inputs": [
              {
                  "data": {
                      "image": {
                          "base64": base64Image
                      }
                  }
              }
          ]
        });
  
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + config.CL_PAT
            },
            body: raw
        };

        //Insert condition for picture or document
        const MODEL_ID = "f1b1005c8feaa8d3f34d35f224092915";
  
        fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
            .then(response => response.text())
            .then(result => {
              let jsonResult = JSON.parse(result);
              if (jsonResult.status.description==="Ok") {
                let raw_text = "";
                for (let line of jsonResult.outputs[0].data.regions) {
                  raw_text += line.data.text.raw + " ";
                }
                console.log(raw_text);
              }
              else {
                console.log("There was an error with your request!");
              }
            })
            .catch(error => console.log('error', error));
      }
      catch(error) {
        console.log(error);
      }

    }
  };

  return (
    <div className="App">
      <div className="top-bar">
        <img src={logo} alt='Lexavision' className="logo-img"/>
      </div>
      <div className="main">
        <Settings sourceType={sourceType} handleSourceType={handleSourceType}/>
        <Language from={from} handleFrom={handleFrom} to={to} handleTo={handleTo}/>
      </div>
      <div className="controls">
        <Camera />
        <Browse handleImage={handleImage}/>
      </div>
      <div className="results">
        <Image image={image}/>
      </div>
    </div>
  );
}

export default App;
