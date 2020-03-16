import React, {useState} from 'react';
import './App.css';
import Chart from './Chart';
import QueryForm from './QueryForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const appStyle = {
  display : "flex",
  "flexDirection": "column"
}

const logoStyle = {
  marginTop: "2vh",
  marginBottom: "5vh",
}

const formStyle = {
  display: "flex",
  justifyContent:"center"
}

const chartContainerStyle = {
  display: "flex", 
  justifyContent: "center",
  marginBottom : "10vh"
}


function App() {
  
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [currentDeviceData, setCurrentDeviceData] = useState([]);

  return (
    <div className="App" style={appStyle}>
      <div style={logoStyle}>
	<img alt="Cylera" src="https://static.wixstatic.com/media/313dbe_eff920de57934c189ae4797788a3cdac~mv2.png/v1/fill/w_500,h_100,al_c,q_85,usm_0.66_1.00_0.01/PNG_1.webp"/>
      </div>
      <div style={chartContainerStyle}>
	<Chart currentDeviceData={currentDeviceData}
	       selectedDeviceId={selectedDeviceId}/> 
      </div>
      <div style={formStyle}>
      <QueryForm setCurrentDeviceData={setCurrentDeviceData} setSelectedDeviceId={setSelectedDeviceId}/>
      </div>
    </div>
  );
}

export default App;
