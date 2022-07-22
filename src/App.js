import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import './App.css';
import Clock from './ReactClock';
import './Room.css'
import Room from './Room';
import Mylocation from './Mylocation';
import Notice from './Notice';
import Feature from './Feature';
import Temperature from './Temperature';
import Humidity from './Humidity';
import Cctv from './Cctv';
import Graph from './Graph';
import Chart from './Chart';
import {Route, Link} from 'react-router-dom'
import Head from './Head';
import { signout, call } from "./service/ApiService";
import GifLoader from 'react-gif-loader';
import SpeedDials from './SpeedDials';


function App() {
    const[state, setState] = useState({loading:true});

    useEffect(() => {
      call("/auth/usersearch", "POST", null).then((response) =>
          {
            if(response.check === false){
              window.location.href = "/login";
            }else{
              setState({loading:false})
            }
          }
          
      );
      console.log(state);

    }, []);

    let loadingPage = (
        <GifLoader
                loading={true}
                imageSrc="https://media.giphy.com/media/l378zKVk7Eh3yHoJi/source.gif"
                overlayBackground="rgba(0,0,0,0.5)"
        />
    )

    let content = loadingPage;
    let appPage = (
      <div>
        <Container>
          <Head/>
          {/* <hr/> */}
          <Notice/>
          <Container className="applayout2">
              <Row>
                <Col xs={2} className="applayout2">
                  <Room/>
                </Col>
                <Col xs={5} className="applayout2">
                  <Card>
                    <Mylocation/>
                  </Card>
                </Col>
                <Col xs={4} className="applayout2">
                  <Card>
                    <Cctv/>
                  </Card>
                </Col>
                <Col xs={1} className="applayout2">
                  <Card>
                      <Feature/>
                  </Card>
                </Col>
              </Row>
          </Container>
          <Container className="pb-2">
            <span className="reportfont pb-2">
              System Report
            </span>
          </Container>
          <Container class = "">
            <Row>
              <Col xs = {4}>
                <Temperature />
              </Col>
              <Col xs = {4}>
                <Humidity/>
              </Col>
              <Col xs = {4}>
                <div class ="size">
                  <Chart/> 
                </div>
              </Col>
            </Row>
          </Container>
          
        </Container>
        <SpeedDials/>
      </div>
    )
    
    if(!state.loading){
      content = appPage;
    }

    return (     
      <>
        {content}
      </>
    );
}
export default App;