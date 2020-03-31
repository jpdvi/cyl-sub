import React, {useEffect, useState} from 'react';
import axios from 'axios'

function SideBar(props) {
  const [devices, setDevices] = useState([])
  useEffect(()=>{
    fetchAllDevices() 
  }, [])

  function fetchAllDevices() {
    axios.get('http://localhost:5000/devices')
    .then((res)=>{
      setDevices(res.data)
    })
  }
  

  function Device(props) {
    const device = props.device

    function setDeviceId() {
      console.log(device)
      props.setSelectedDeviceId(device['device_id']);
      props.setIsSidebarSelect(true);
    }

    return (
	<div onClick={setDeviceId}>
	  <div class="row">
	    <div class="col-md-6">
	      {device["model"]}
	    </div>
	    <div class="col-md-6">
	      {device["organization"]}
	    </div>
	  </div>
	</div>
    )
  }
  function DeviceList() {
    return devices.map((d,idx)=>{
      return (
	<Device setSelectedDeviceId={props.setSelectedDeviceId} setIsSidebarSelect={props.setIsSidebarSelect} device={d}/>
      )
    })
  }

  return (
    <div>
      <DeviceList/>
    </div>
  )
}

export default SideBar; 
