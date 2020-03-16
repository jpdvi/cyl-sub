import React, {useState, useEffect} from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import axios from 'axios';

function QueryForm(props) {
  const defaultSelectDeviceText = "Select Device ...";
  const [isValidForm, setValidForm] = useState(false);
  const [numWindow, setNumWindow] = useState(undefined);
  const [windowTime, setWindowTime] = useState(undefined);
  const [endTime, setEndTime] = useState(undefined);
  const [selectedDeviceId, setSelectedDeviceId] = useState(undefined);
  const [deviceIds, setDeviceIds] = useState([]);

  useEffect(()=>{
    fetchDeviceIds()
  }, [props]);
  
  // Actions
  function fetchDeviceIds() {
    axios.get('http://localhost:5000/device')
    .then(res => {
      setDeviceIds(res.data);
    })
  }
  
  // Common
  function buildQueryParams() { // -> String
    let queries = [];

    if (numWindow == null && windowTime == null && endTime == null) {
      return "";
    }

    if (numWindow && numWindow !== "") queries.push(`num_windows=${numWindow}`);
    if (windowTime && windowTime !== "") queries.push(`window_time=${windowTime}`);
    if (endTime && endTime !== "") queries.push(`end_time=${endTime}`);

    return "?" + queries.map((q, idx) => {
      if (idx < queries.length - 1) return `${q}&`;
      return q;
    }).join('');
  }
  
  // Handlers
  function handleFormSubmit(e) { // -> void
    e.preventDefault();
    if ( selectedDeviceId === defaultSelectDeviceText ||
      selectedDeviceId === null ||
      selectedDeviceId === undefined ){
      setValidForm(false);
      return
    }

    props.setSelectedDeviceId(selectedDeviceId);

    axios.get(`http://localhost:5000/device/${selectedDeviceId}${buildQueryParams()}`)
    .then(res => {
      props.setCurrentDeviceData(res.data);
    });
  }

  // These names do not align with the requirement names but
  // I thought they were clearer from a UI perspective.
  function handleDeviceIdSelect(e) {
    setSelectedDeviceId(e.target.value)
  }

  function handleWindowCount(e) {
    setNumWindow(e.target.value)
  }

  function handleWindowInterval(e) {
    setWindowTime(e.target.value)
  }

  function handleEndTime(e) {
    setEndTime(e.target.value)
  }
  
  // Components
  function DeviceList({deviceIds}){
    return deviceIds.map((_id, idx)=>{
      return (
	<option key={idx} value={_id}>
	{_id}
	</option>
      )
    });
  }

  return (
    <Form noValidate validated={isValidForm} onSubmit={handleFormSubmit}>
      <Form.Group>
	  <Form.Label>Device ID</Form.Label>
	  <Form.Control onChange={handleDeviceIdSelect} required name="deviceId" as="select" value={selectedDeviceId}>
	    <option key={-1} value={undefined}>{defaultSelectDeviceText}</option>
	    <DeviceList deviceIds={deviceIds}/>
	  </Form.Control>
	  {/* TODO: Handle Validation */}
	  <Form.Control.Feedback>Invalid Device Id</Form.Control.Feedback>
	<Form.Row>
	  <Col>
	    <Form.Label>Window(num) Count</Form.Label>
	    <Form.Control onChange={handleWindowCount} name="windowCount" type="text"/>
	  </Col>
	  <Col>
	    <Form.Label>Window Interval(time)</Form.Label>
	    <Form.Control onChange={handleWindowInterval} name="windowInterval" type="text"/>
	  </Col>
	  <Col>
	    <Form.Label>End Time</Form.Label>
	    <Form.Control onChange={handleEndTime} name="endTime" type="text"/>
	  </Col>
	</Form.Row>
      </Form.Group>
      <Button type="submit">Search</Button>
    </Form>
  );
}

export default QueryForm;
