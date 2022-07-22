import React,{useEffect, useState} from 'react';
import ReactPlayer from 'react-player/lazy';
import Head from '../Head';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from 'react-bootstrap';
import { signout, call } from "../service/ApiService";
import { CardActionArea } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row  } from 'react-bootstrap';
import { Resizable  } from 're-resizable'; 


function Cctvcenter(){

    const [state, setState] = useState(0);


    useEffect(() => {
        call("/video/cctvcheck", "GET", null).then((response)=>
            {
                setState(response);
                console.log(state)
            }
        )
    }, []);
    
    let cardcell = [];

    if(state>0){
        for(var i =0; i<state; i++){
            const cctvurl = 'http://172.30.1.46:8095/video/live.mp4/CCTV' + i
           cardcell.push(
                <Resizable>
                <Card sx={{ margin : 5, maxWidth : 325}}>
                    <CardActionArea>
                        <CardContent>
                            <p>CCTV {i}번</p>
                            <Resizable>
                                <ReactPlayer
                                    className='react-player'
                                    url={cctvurl}       // 플레이어 url
                                    width='100%'         // 플레이어 크기 (가로)
                                    height='100%'        // 플레이어 크기 (세로)
                                    playing={true}        // 자동 재생 on
                                    muted={true}          // 자동 재생 on
                                    light={false}         // 플레이어 모드
                                    pip={true}            // pip 모드 설정 여부
                                    autoPlay={true}
                                />
                            </Resizable>
                        </CardContent>
                    </CardActionArea>
                </Card>
                </Resizable>
            
            )
        }
    }else{
        cardcell.push (
            <Card sx={{ maxWidth: 400 }}>
                <CardContent>
                    연동된 CCTV가 없습니다.
                </CardContent>
            </Card>
        )
    }
    
    return(
        <>
            <Head/>
            <div class="container">
                <div class ="card">
                    <Container>
                        <Row>
                            {cardcell}
                        </Row>
                    </Container>
                </div>
            </div>
            
        </>
    )
}

export default Cctvcenter;