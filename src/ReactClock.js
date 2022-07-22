import React, {Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import Clock from 'react-live-clock';
import './App.css'; 

class ReactClock extends Component{
    render(){
        return(
            <div class ="clock ">
                <Row className= 'times' >
                    <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Seoul'}>
                    </Clock>
                </Row>
                <Row className= 'times2' >
                    <Clock format={'MM월DD일, YYYY'} ticking={true} timezone={'Asia/Seoul'}>
                    </Clock>
                </Row>
            </div>
        )
    }
}

export default ReactClock;