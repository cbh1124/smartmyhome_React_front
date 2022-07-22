import React, {useState, useEffect, useRef }  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import "./Humidity.scss";

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


function Humidity(){
    const [humi, setHumi] = useState(0);

    useEffect(() =>{
      
        fetch("http://172.30.1.46:8095/api/humi", {
          method: "GET",
          headers: {
            'Content-type': 'application/json'
        } 
      })
        .then(res => res.json())
        .then(data => {
            setHumi(data);
            
        })
      }, []);
      
    // https://mingule.tistory.com/65 // https://from2020.tistory.com/15?category=369852
    useInterval(() => {
        fetch("http://172.30.1.46:8095/api/humi")
        .then(res => res.json())
        .then(data => {
            setHumi(data);
        })
    }, 10000);

    return(
        <> 
        <Card class="container-fluid m-0 ">
             <span class ="m-2 temp-font">Humidity</span>
             <span class="d-flex justify-content-center temp-value">{humi}%</span>
             <div class="row m-0">
                 <div class="pl-4 pr-4">
                     <div class="progress-outer">
                         <div class="progress">
                                 <div
                                     class="progress-bar progress-bar-warning progress-bar-striped bg-info active"
                                     style={{width:`${ humi }%`}}></div>
                                 <div class="progress-bar" role="progressbar" style={{width: "25%;"}} ></div>
                         </div>
                     </div>
                 </div>
             </div>
        </Card>
     </>
    )
}

export default Humidity;