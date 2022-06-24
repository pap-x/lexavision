import * as React from 'react';
import logo from './assets/images/logo.png';
import './App.css';
import Settings from './components/settings/Settings';
import Language from './components/language/Language';
import Camera from './components/camera/Camera'
import Browse from './components/browse/Browse';

function App() {

  const [sourceType, setSourceType] = React.useState('document');
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');

  const inputFile = React.useRef(null); 

  const handleSourceType = (event, newSourceType) => {
    setSourceType(newSourceType);
  };

  const handleFrom = (event) => {
    setFrom(event.target.value);
  };

  const handleTo = (event) => {
    setTo(event.target.value);
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
        <Browse inputFile={inputFile}/>
      </div>
    </div>
  );
}

export default App;
