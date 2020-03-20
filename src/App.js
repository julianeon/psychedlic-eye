import React, { useState} from 'react';
import './App.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Unit = ({color,divisor}) => {
    let factor=0.5*(100/divisor);
    if (factor<1) { factor=1; }
    let realColor = {
        backgroundColor: color,
        height: factor.toString()+'vh',
        textAlign: 'center',
        lineHeight: factor.toString()+'vh',
    }
    return(
	<Col style={realColor}>👁</Col>
    )
}

function Layer({colorRange,total,number}) {
    const lineElements=[...Array(number).keys()];
    const line=lineElements.map((item)=>(<><Unit divisor={total} color={colorRange[item % colorRange.length]}/></>));
    return <Row>{line}</Row>
}

const LayerWall = ({colorRange,lines}) => {
    const layermaker=lines.map((item)=><Layer colorRange={colorRange} total={lines.length} number={item}/>);
    return (<>{layermaker}</>)
}

function App() {
    const [total,setTotal]=useState(40);
    const lowerBound=4;
    const upperBound=100;
    const clr=["red"];
    const upcolors=["red","blue"]
    const downcolors=["teal","pink","green","silver","brown","purple","gold"]
    return (
	<div style={{backgroundColor:'red',height:'100vh'}}>
          <div style={{position: 'sticky', top: '0',zIndex:'1'}}>
            <Button variant="light" onClick={()=>{if (total<=upperBound) { setTotal(total+2) }}}>Increase</Button>
            <Button variant="dark" onClick={()=>{ if (total>=lowerBound) { setTotal(total-2) }}}>Decrease</Button>
          </div>
          
    	  <LayerWall lines={[...Array(total/2).keys()]} colorRange={upcolors}/>
    	  <LayerWall lines={[...Array(total/2).keys()].reverse()} colorRange={downcolors}/>
	  </div>	  
    );
}

export default App;


