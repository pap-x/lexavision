import React, { useState, useEffect } from 'react';
import logo from './assets/images/logo.png';
import './App.css';
import Language from './components/language/Language';
import Camera from './components/camera/Camera'
import Browse from './components/browse/Browse';
import Image from './components/image/Image';
import Translation from './components/translation/Translation';

function App() {

  const [from, setFrom] = useState('auto');
  const [to, setTo] = useState('');
  const [image, setImage] = useState('');
  const [extractedText, setExText] = useState('');
  const [translation, setTranslation] = useState(''); 
  const [loadingText, setLoadText] = useState(false);

  const optiic = new (require('optiic'))({
    apiKey: "test"
  });

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

  const handleFrom = (event) => {
    setFrom(event.target.value);
  };

  const handleTo = (event) => {
    setTo(event.target.value);
  };

  useEffect(()=>{ 
     //If we have already extracted text from the image, translate it to the selected language
    if (extractedText) {
      translateText(extractedText)
        .then(translation => handleTranslation(translation))
        .catch(error=> console.log(error)); 
    }
  }, [to]);

  const handleTranslation = (data) => {
    const text = data;  //.join('\n');
    setTranslation(text);
  };

  const imageToText = image => new Promise((resolve, reject) => {
    optiic.process({
      url: image
    })
    .then(response => {
      console.log(response);
      setExText(response.text);
      resolve(response.text);
    })
    .catch(error => {
      console.log('error', error);
      reject(error);
    });
  });
  
  const translateText = text => new Promise((resolve, reject) => {
    //DEEPL API call
    const combinedText = text;  //.join("&text=");
    
    const fromLang = (from==='auto') ? '' : from;

    const toLang = to || 'EL'
    const body = "text="+combinedText+"&source_lang="+fromLang+"&target_lang="+toLang;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    };

    fetch("https://api-free.deepl.com/v2/translate?auth_key=" + process.env.REACT_APP_DEEPL_KEY, requestOptions)
      .then(response => response.text())
      .then(result => {
        const jsonResult = JSON.parse(result);
        const textArray = jsonResult.translations.map(line => line.text);

        resolve(textArray); 
      })

      .catch(error => reject(error));
  })

  const handleImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setLoadText(true);
      setImage(URL.createObjectURL(event.target.files[0]));
      
      try {
        //Use optiic to convert to text and then if language is selected, translate it
          imageToText(event.target)
          .then(originalText => {
            // If to language is selected then translate, else don't
            return (to ? translateText(originalText) : originalText);
          })
          .then(translation => {
            console.log(translation);
            handleTranslation(translation);
            setLoadText(false);
          })
          .catch(error=> console.log(error)); 
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
        <span className="desc-text">[ Image translation made easy! ]</span>
        <div className="whitespace"></div>
      </div>
      <div className="main">
        <Language from={from} handleFrom={handleFrom} to={to} handleTo={handleTo}/>
      </div>
      <div className="controls">
        <Camera handleImage={handleImage} optiic={optiic}/>
        <Browse handleImage={handleImage}/>
      </div>
      <div className="results">
        <Image image={image} loadingText={loadingText}/>
        <Translation translation={translation}/>
      </div>
    </div>
  );
}

export default App;
