import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import './App.css';
import Clock from './ReactClock';
import {Route, Link} from 'react-router-dom'
import { signout, call } from "./service/ApiService";
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import ListAltIcon from '@mui/icons-material/ListAlt';

function Head(){

    const[state, setState] = useState();
    const[check, setCheck] = useState(false);
   
    useEffect(() => {
        call("/auth/usersearch", "POST", null).then((response) =>
            {   
                if(response.check === false){
                    window.location.href = "/login";
                }
            }
        );
    }, []);
    
    return(
        
            <Navbar>
                <Container className ="navbar">
                    <Navbar.Brand   className="iotfont">
                        <Link class="nav-link active p-0 m-0 " to="/" style={{ color: 'black' }} >
                            IOT Smart Home
                        </Link>           
                    </Navbar.Brand>
                    <nav class="nav">
                        <Link class="nav-link active " to="/cctv">
                            <img className="img1 bshadow pb-1" src="img/videocam.svg" alt="" />
                            {/* <div class = "img1 bshadow pb-1">
                                <VoiceChatIcon sx={{ color: "#000000" }} ></VoiceChatIcon>
                            </div> */}
                        </Link>
                        
                        <Link class="nav-link active " to="/todotest">
                            <img className="img1 bshadow pb-1" src="img/todolist.svg" alt="" />
                            {/* <div class = "img1 bshadow pb-1">
                                <ListAltIcon sx={{ color: "#000000" }} ></ListAltIcon>
                            </div> */}
                        </Link>
                        <Link class="nav-link active " to="/weather">
                            <img className="img1 bshadow pb-1" src="img/weather.svg" alt="" />
                        </Link>
                        <Link class="nav-link active " to="/chartlist">
                            <img className="img1 bshadow pb-1" src="img/temperature.svg" alt="" />
                        </Link>
                        <Link class="nav-link active " to="/bus">
                            <img className="img1 bshadow pb-1" src="img/bus-station.svg" alt="" />
                        </Link>
                        <a class="nav-link disabled">
                            <div className="img1"/>
                        </a>
                        
                        <div class="justify-content-end pt-1">
                            <Clock/>
                        </div>  
                    </nav>
                    
                </Container>
            </Navbar>
        
    )

}

export default Head;