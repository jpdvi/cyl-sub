import React, {useState, useEffect} from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, DiscreteColorLegend} from 'react-vis';
import '../node_modules/react-vis/dist/style.css';


function Chart(props) {
  const [bytes_ts_data, setBytesTsData] = useState([{x:0, y:0}])
  const [bytes_fs_data, setBytesFsData] = useState([{x:0, y:0}])

  useEffect(()=>{
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
