import React,{useState, useEffect ,useRef} from 'react';
import Head from '../Head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import './Weather.css';
import './Dustcard.css';

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

function Dustcard(){
    const[dust, setDust] = useState([]);
    const dust_img = "img/dust.svg"

    let dustcheck = (
        <span class ="dustfont_m">
            
        </span>
    )

    let uldustcheck = (
        <span class ="dustfont_m">
            
        </span>
    )

    useEffect(() =>{
        fetch("http://172.30.1.46:8095/api/dust")
        .then(res => res.json())
        .then(data => {
            if(data.data.response.header.resultCode === '00'){
                const datas = data.data.response.body.items

                setDust([]);
                datas.map((item, idx) => {
                    // 첫번째 값은 현재 시간으로 가장 최근 값(시간)을 가져옴 
                    if(idx === 0){
                        // 첫번째 값 pm10 초미세먼지
                        setDust(data => [...data, item.pm10Value])
                        // 두번째 값 pm25 미세먼지
                        setDust(data => [...data, item.pm25Value])
                    }
                })
            }
        })
    }, []);

    useInterval(()=>{
        fetch("http://172.30.1.46:8095/api/dust")
            .then(res=>res.json())
            .then(data => {
                if(data.data.response.header.resultCode === '00'){
                    const datas = data.data.response.body.items

                    setDust([]);
                    datas.map((item, idx) => {
                        // 첫번째 값은 현재 시간으로 가장 최근 값(시간)을 가져옴 
                        if(idx === 0){
                            // 첫번째 값 pm10 초미세먼지
                            setDust(data => [...data, item.pm10Value])
                            // 두번째 값 pm25 미세먼지
                            setDust(data => [...data, item.pm25Value])
                        }
                    })
                }
            })
    }, 600000);


    if(dust[1] <= 30){
        dustcheck = (
            <span class ="dustfont_m" style = {{color :"#55A1F8"}}>
                좋음
            </span>
        )
    }else if(dust[1] <= 80 ){
        dustcheck = (
            <span class ="dustfont_m" style = {{color :"#56E892"}}>
                보통
            </span>
        )
    }else if(dust[1] <= 150 ){
        dustcheck = (
            <span class ="dustfont_m" style = {{color :"#FF7F27"}}>
                나쁨
            </span>
        )
    }else if(dust[1] >= 151 ){
        dustcheck = (
            <span class ="dustfont_m" style = {{color :"#ED1C24"}}> 
                매우나쁨
            </span>
        )
    } 

    if(dust[0] <= 14){
        uldustcheck = (
            <span class ="dustfont_m" style = {{color :"#55A1F8"}}>
                좋음
            </span>
        )
    }else if(dust[0] <= 35 ){
        uldustcheck = (
            <span class ="dustfont_m"  style = {{color :"#56E892"}}>
                보통
            </span>
        )
    }else if(dust[0] <= 75 ){
        uldustcheck = (
            <span class ="dustfont_m" style = {{color :"#FF7F27"}}>
                나쁨
            </span>
        )
    }else if(dust[0] >= 76 ){
        uldustcheck = (
            <span class ="dustfont_m" style = {{color :"#ED1C24"}}> 
                매우나쁨
            </span>
        )
    } 

    return(
        <>
            <div class ="d-flex justify-content-center">
                    
                    <img src= {dust_img} alt="" style ={{height : "8vh"}}/>
                    <span class="dustfont">미세먼지</span>
                    
                    <span class ="dustfont_s">
                        {dust[1]}ug/m
                    </span>

                    <div> {dustcheck} </div>
                
                
                {/* <Col class ="" style={{   }}>
                    
                </Col> */}
            </div>
            <div class="p-3">

            </div>
            <div class ="d-flex justify-content-center">
                
                    <img src= {dust_img} alt="" style ={{height : "8vh"}}/>
                    <span class="chodustfont">초미세먼지</span>
                    
                    <span class ="dustfont_s">
                        {dust[0]}ug/m
                    </span>

                    <div>
                        {uldustcheck}
                    </div>
                
                
                {/* <Col class ="" style={{   }}>
                    
                </Col> */}
            </div>
        </>
    )
}

export default Dustcard
