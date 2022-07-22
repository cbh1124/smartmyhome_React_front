import React from 'react';
import "./Feature.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import HeatPumpIcon from '@mui/icons-material/HeatPump';
import LightIcon from '@mui/icons-material/Light';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';

function Feature() {
    return (
      <>
        <div className="test m-1" >
            {/* <img className="pt-2 img-icon" src="img/system.svg" alt="" /> */}
            <SettingsSystemDaydreamIcon fontSize=""/>
            {/* <span className="bold">System</span> */}
            <div className="bold">
                System
            </div>
        </div>
        
        <div className="test m-1">
            {/* <img className="pt-2 img-icon" src="img/fan.svg" alt="" /> */}
            <HeatPumpIcon></HeatPumpIcon>
            {/* <span className="bold p-2">Fan</span> */}
            <div className="bold">
                Fan
            </div>
        </div>
        
        <div className="test m-1">
            {/* <img className="pt-2 img-icon" src="img/cool.svg" alt="" /> */}
            <AcUnitIcon fontSize=""></AcUnitIcon>
            {/* <span className="bold p-2">Cool</span> */}
            <div className="bold">
            Cool
            </div>
        </div>
        
        <div className="test m-1">
            {/* <img className="pt-2 img-icon" src="img/heat.svg" alt="" /> */}
            <WhatshotIcon></WhatshotIcon>
            {/* <span className="bold p-2">Heat</span> */}
            <div className="bold ">
                Heat
            </div>
        </div>
        
        <div className="test m-1">
            {/* <img className="pt-2 img-icon" src="img/light.svg" alt="" /> */}
            <LightIcon></LightIcon>
            {/* <span className="bold p-2">Light</span> */}
            <div className="bold">
                Light
            </div>
        </div>
        
        <div className="test m-1">
            {/* <img className="pt-2 img-icon" src="img/power-off.svg" alt="" /> */}
            <SettingsPowerIcon></SettingsPowerIcon>
            {/* <span className="bold p-2">Off</span> */}
            <div className="bold">
                Off
            </div>
        </div> 
      </>
    );
  }
  
  export default Feature;