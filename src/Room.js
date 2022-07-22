import React, {Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Clock from 'react-live-clock';
import './App.css'; 
import './Room.css';
import { Card, Container, Row, Col } from 'react-bootstrap';
import GridViewIcon from '@mui/icons-material/GridView';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import KingBedIcon from '@mui/icons-material/KingBed';
import LivingIcon from '@mui/icons-material/Living';
import KitchenIcon from '@mui/icons-material/Kitchen';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';

class Room extends Component{
    render(){
        return(
            <div>       
                <Card className = "mb-2">
                    <Row className="pl-1 pr-1 pt-2 pb-2 m-0">
                        <Col xs ={1} className="">
                            {/* <img className="roomimg " src="img/dashboard.svg" alt="" /> */}
                            <GridViewIcon/>
                        </Col>
                        <Col xs = {9} className="">
                            <div className="cardstyle mt-2">
                                Dashboard
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Card className = "mb-2">
                    <Row className="pl-1 pr-1 pt-2 pb-2 m-0">
                        <Col xs ={1} className="">
                            {/* <img className="roomimg " src="img/dashboard.svg" alt="" /> */}
                            <SingleBedIcon/>
                        </Col>
                        <Col xs = {9} className="">
                            <div className="cardstyle mt-2">
                                MyRoom
                            </div>
                        </Col>
                    </Row>
                </Card>

                <Card className = "mb-2">
                    <Row className="pl-1 pr-1 pt-2 pb-2 m-0">
                        <Col xs ={1} className="">
                            {/* <img className="roomimg " src="img/dashboard.svg" alt="" /> */}
                            <KingBedIcon/>
                        </Col>
                        <Col xs = {9} className="">
                            <div className="cardstyle mt-2">
                                BedRoom
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Card className = "mb-2">
                    <Row className="pl-1 pr-1 pt-2 pb-2 m-0">
                        <Col xs ={1} className="">
                            {/* <img className="roomimg " src="img/dashboard.svg" alt="" /> */}
                            <LivingIcon/>
                        </Col>
                        <Col xs = {9} className="">
                            <div className="cardstyle mt-2">
                                LivingRoom
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Card className = "mb-2">
                    <Row className="pl-1 pr-1 pt-2 pb-2 m-0">
                        <Col xs ={1} className="">
                            {/* <img className="roomimg " src="img/dashboard.svg" alt="" /> */}
                            <KitchenIcon/>
                        </Col>
                        <Col xs = {9} className="">
                            <div className="cardstyle mt-2">
                                Kitchen
                            </div>
                        </Col>
                    </Row>
                </Card>
                
                <Card className = "">
                    <Row className="pl-1 pr-1 pt-2 pb-2 m-0">
                    <Col xs ={1}>
                        {/* <img className="roomimg " src="img/dashboard.svg" alt="" /> */}
                        <LocalPostOfficeIcon/>
                    </Col>
                    <Col xs = {9} className="">
                        <div className="cardstyle mt-2">
                            Office
                        </div>
                    </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

export default Room;