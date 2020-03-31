import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, DiscreteColorLegend} from 'react-vis';
import '../node_modules/react-vis/dist/style.css';


function Chart(props) {
  const [bytes_ts_data, setBytesTsData] = useState([{x:0, y:0}])
  const [bytes_fs_data, setBytesFsData] = useState([{x:0, y:0}])

  useEffect(()=>{
    if (props.isSidebarSelect) {
	axios.get(`http://localhost:5000/device/${props.selectedDeviceId}?window_time=60&end_time=1524835945&num_windows=10`)
	.then(res => {
	  console.log(res)
	  props.setCurrentDeviceData(res.data)
	})
      props.setIsSidebarSelect(false)
    }

    renderChartData(props)
  }, [props])

  function renderChartData(props){ // -> []barChartObject
    if (props.currentDeviceData.length === 0) return;
    console.log('Running')
    let bytes_fs = [];
    let bytes_ts = [];
      Object.keys(props.currentDeviceData).forEach((key, idx) => {
	  bytes_ts.push({x: idx, y: props.currentDeviceData[key]['bytes_ts']});
	  bytes_fs.push({x: idx, y: props.currentDeviceData[key]['bytes_fs']});
    })
    setBytesTsData(bytes_ts);  
    setBytesFsData(bytes_fs);
  }

  return (
  <XYPlot
      width={500}
      height={300}
    >
    <DiscreteColorLegend items={[{color: 'blue', title: 'bytes_fs'},
      {color: 'green', title: 'bytes_ts'}]}
      orientation='horizontal'
    />
    <HorizontalGridLines />
    {/*Bytes to server chart display*/}
    <LineSeries
      color='green'
      data={bytes_ts_data}/>
    {/*Bytes from server chart display*/}
    <LineSeries
      color='blue'
      data={bytes_fs_data}/>
    <XAxis title="time"/>
    <YAxis title="bytes"/>
  </XYPlot>
  );
}

export default Chart;
