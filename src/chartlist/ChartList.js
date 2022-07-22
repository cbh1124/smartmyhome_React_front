import React,{useEffect, useRef, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import Clock from '../ReactClock';
import {Route, Link} from 'react-router-dom';
import ReactApexChart from "react-apexcharts"
import ChartDay from './ChartDay';
import ChartHour from './ChartHour';
import ChartMonth from './ChartMonth';
import ChartReal from './ChartReal';
import Head from '../Head';

function useInterval(callback, delay) {
    const savedCallback = useRef(); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.
    
    useEffect(() => {
      savedCallback.current = callback; // callback이 바뀔 때마다 ref를 업데이트 해준다.
    }, [callback]);
  
    useEffect(() => {
      function tick() {
        savedCallback.current(); // tick이 실행되면 callback 함수를 실행시킨다.
      }
      if (delay !== null) { // 만약 delay가 null이 아니라면 
        let id = setInterval(tick, delay); // delay에 맞추어 interval을 새로 실행시킨다.
        return () => clearInterval(id); // unmount될 때 clearInterval을 해준다.
      }
    }, [delay]); // delay가 바뀔 때마다 새로 실행된다.
}


function ChartList(){
    const[chart, setChart] = useState([]);
    const[chart2, setChart2] = useState([]);
    const[chart3, setChart3] = useState([]);

    return(
        <>
            <Head/>
            <Container style={{height :"85.4vh"}} >
                <Row>
                    <Col>
                        <Card style={{height :"40vh"}}>
                            <ChartReal/>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{height :"40vh"}}>
                            <ChartDay/>
                        </Card>
                    </Col>
                </Row>
                
                <div class ="pb-4">

                </div>
                
                <Row>
                    <Col>
                        <Card style={{height :"40vh"}}>
                            <ChartHour/>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{height :"40vh"}}>
                            <ChartMonth/>
                        </Card>
                    </Col>
                </Row>
            </Container>
            
        </>
    )
}

export default ChartList;