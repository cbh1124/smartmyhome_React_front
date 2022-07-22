import React,{useEffect,useState,useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Card } from 'react-bootstrap';
import './Cctv.css' 
import ReactPlayer from 'react-player/lazy';

function Cctv(){

    return(
        <>
            <Container>
                
                <p className="mt-3 mb-0 logo1">Cctv</p>
                <p className="mt-0 logo2">IOT System</p>
                <Card className="mymap mb-3" id="myMap" >
                    {/* <img  src="http://172.30.1.57:81/stream"/> */}
                    {/* <img  src="http://172.30.1.22:4747/video?640x480"/> */}
                    <ReactPlayer
                        className='react-player'
                        url={'http://172.30.1.46:8095/video/live.mp4/CCTV0'}    // 플레이어 url
                        width='100%'         // 플레이어 크기 (가로)
                        height='100%'        // 플레이어 크기 (세로)
                        playing={true}        // 자동 재생 on
                        muted={true}          // 자동 재생 on
                        light={false}         // 플레이어 모드
                        pip={true}            // pip 모드 설정 여부
                        autoPlay={true}
                    />
                <img src="http://localhost:8095/video/live.mp4" alt="" />
                    {/* <video loop muted autoplay={true} playinline controls={true}
                     style={{width :'100%'}}  >
                            <source src='http://localhost:8095/video/live.mp4'  type ='video/mp4'/>
                    </video> */}
                </Card>
                
            </Container>
        </>
    )
}

export default Cctv;