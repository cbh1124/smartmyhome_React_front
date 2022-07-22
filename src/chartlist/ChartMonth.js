import React,{useEffect, useRef, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import Clock from '../ReactClock';
import {Route, Link} from 'react-router-dom';
import ReactApexChart from "react-apexcharts"

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

function ChartMonth(){
    const[daytemp, setDaytemp] = useState([]);
    const[dayhumi, setDayhumi] = useState([]);
    const[daydate, setDaydate] = useState([]);

    useEffect(() =>{
        fetch("http://172.30.1.46:8095/api/daychart")
            .then(res=>res.json())
            .then(data => {
                data.map((item, index) =>{
                    setDaytemp(data=>[...data, Number(item.stemp).toFixed(1)])
                    setDayhumi(data=>[...data, Number(item.shumi).toFixed(1)])
                    setDaydate(data=>[...data, item.sdate])
                })  
                
            })
    }, []);
    
    let option = 
    {
        series: [
            {
                name: '온도',
                data: daytemp
            }, 
            {
                name: '습도',
                data: dayhumi
            }
        ],
        options: {
            chart: {
                height: 350,
                type: 'line',
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                      speed: 2000
                    }
                  }
            },
            dataLabels: {
                enabled: true
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'datetime',
                categories: daydate,
                labels: {
                    datetimeUTC: false
                }
            },
            tooltip: {
                x: {
                format: 'yyyy-MM-dd'
                //2022-06-29 16:18:13
                },
            },
            colors: ['#FFCA2C', '#0DCAF0'],
            title: {
                text: 'monthly',
                align: 'center'
            },
        },
   }

    useInterval(()=>{
        fetch("http://172.30.1.46:8095/api/daychart")
            .then(res=>res.json())
            .then(data => {
                setDaytemp([])
                setDayhumi([])
                setDaydate([])
                data.map((item, index) =>{
                    setDaytemp(data=>[...data, Number(item.stemp).toFixed(1)])
                    setDayhumi(data=>[...data, Number(item.shumi).toFixed(1)])
                    setDaydate(data=>[...data, item.sdate])
                })
            })
    }, 2000);

    
    return(
        <>
            <ReactApexChart class=""
                        options={option.options}
                        series={option.series}
                        type="area" 
                        width="100%"
                        height="100%"
                        
            />    
        </>
    )
}

export default ChartMonth;