import React,{useState, useEffect, useRef} from 'react'
import ReactApexChart from "react-apexcharts"
import './Chart.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';

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

function Chart(){
  const[temp, settemp] = useState([]);
  const[humi, sethumi] = useState([]);
  const[date, setdate] = useState([]);

  useEffect(() =>{
    fetch("http://172.30.1.46:8095/api/minichart")
        .then(res=>res.json())
        .then(data => {
          settemp([])
          sethumi([])
          setdate([])
          data.map((item, index) =>{
            settemp(data=>[...data, Number(item.stemp).toFixed(1)])
            sethumi(data=>[...data, Number(item.shumi).toFixed(1)])
            setdate(data=>[...data, item.sdate])
          })  
        })
  }, []);

  let option = 
  {
    series: [
      {
        name: "",
        data: temp
      },
      {
        name: "",
        data: humi
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#FFCA2C', '#0DCAF0'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: '',
        align: 'left'
      },
      grid: {
        borderColor: '#FFFFFF',
        row: {
          colors: ['#FFFFFF', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: date,
        title: {
          text: ''
        },
        labels:{
            show : false
        }

      },
      yaxis: {
        title: {
          text: ''
        },
        show: false,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      },
      responsive: [{
        breakpoint: undefined,
        options: {},
    }]
    
    },
  }

    useInterval(() => {
      fetch("http://172.30.1.46:8095/api/minichart")
      .then(res=>res.json())
      .then(data => {
        settemp([])
        sethumi([])
        setdate([])
        data.map((item, index) =>{
          settemp(data=>[...data, Number(item.stemp).toFixed(1)])
          sethumi(data=>[...data, Number(item.shumi).toFixed(1)])
          setdate(data=>[...data, item.sdate])
        })  
      })
    }, 20000);

    
    return(
        <>
            <Card class="container-fluid ml-0 mr-0 mt-0 mb-1">
                <span class ="m-2 mb-0 temp-font">Chart</span>
                <div class ="p-2 pt-0"> 
                
                    <ReactApexChart class=""
                    options={option.options}
                    series={option.series}
                    type="line" 
                    width="100%"
                    height="60%"
                    offsetX="1000000"
                    />
                </div>
            </Card>
        </>
    )

}

export default Chart;