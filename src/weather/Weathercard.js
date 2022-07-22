import React,{useState, useEffect ,useRef} from 'react';
import Head from '../Head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import './Weather.css'

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

function Weathercard(){
    // 맑음
    const svg_1 = "https://basmilius.github.io/weather-icons/production/fill/all/clear-day.svg"
    // 비 옴
    const svg_2 = "https://basmilius.github.io/weather-icons/production/fill/all/rain.svg"
    // 눈/비
    const svg_3 = "https://basmilius.github.io/weather-icons/production/fill/all/sleet.svg"
    // 눈
    const svg_4 = "https://basmilius.github.io/weather-icons/production/fill/all/snow.svg"
    // 빗방울
    const svg_5 = "https://basmilius.github.io/weather-icons/production/fill/all/raindrops.svg"
    // 빗방울 눈날림
    const svg_6 = "https://basmilius.github.io/weather-icons/production/fill/all/sleet.svg"
    //눈날림
    const svg_7 = "https://basmilius.github.io/weather-icons/production/fill/all/snowflake.svg"

    const[weather, setWeather] = useState([]);

    useEffect(() =>{
        fetch("http://172.30.1.46:8095/api/weather")
            .then(res => res.json())
            .then(data => {
                if(data.data.response.header.resultCode === '00'){
                    const datas = data.data.response.body.items.item;
                    //0. PTY 강수형태 
                    //1. REH 습도 %
                    //2. RN1 1시간 강수량 mm
                    //3. T1H 기온 C
                    //4. UUU 동서바람성분  m/s
                    //5. VEC 풍향 deg
                    //6. VVV 남북바람성분 m/s
                    //7. WSD 풍속 m/s
                    setWeather([]);
                    // eslint-disable-next-line array-callback-return
                    datas.map((item,idx)=>{
                        if(idx === 0){
                            console.log("강수형태" + item.obsrValue)
                            setWeather(data => [...data, item.obsrValue])
                        }
                        if(idx === 1){
                            console.log("습도" + item.obsrValue)
                            setWeather(data => [...data, item.obsrValue])
                        }
                        if(idx === 2){
                            console.log("1시간 강수량" + item.obsrValue);
                            setWeather(data => [...data, item.obsrValue])
                        }
                        if(idx === 3){
                            console.log("기온" + item.obsrValue);
                            setWeather(data => [...data, item.obsrValue])
                        }
                        if(idx === 4){
                            console.log("동서바람성분" + item.obsrValue);
                            setWeather(data => [...data, item.obsrValue])
                        }
                        if(idx === 5){
                            console.log("풍향" + item.obsrValue);
                            setWeather(data => [...data, item.obsrValue])
                        }
                        if(idx === 6){
                            console.log("남북바람성분" + item.obsrValue);
                            setWeather(data => [...data, item.obsrValue])
                        }
                        if(idx === 7){
                            console.log("풍속" + item.obsrValue)
                            setWeather(data => [...data, item.obsrValue])
                        }
                        
                    })
                }else{

                }

        })
      }, []);

    useInterval(()=>{
        fetch("http://172.30.1.46:8095/api/weather")
            .then(res=>res.json())
            .then(data => {
                if(data.data.response.header.resultCode === '00'){
                    const datas = data.data.response.body.items.item;
                    //0. PTY 강수형태 
                    //1. REH 습도 %
                    //2. RN1 1시간 강수량 mm
                    //3. T1H 기온 C
                    //4. UUU 동서바람성분  m/s
                    //5. VEC 풍향 deg
                    //6. VVV 남북바람성분 m/s
                    //7. WSD 풍속 m/s
                    setWeather([]);
                    // eslint-disable-next-line array-callback-return
                    datas.map((item,idx)=>{
                        if(idx === 0){
                            console.log("강수형태" + item.obsrValue)
                            setWeather(data => [...data, item.obsrValue])
                        }
                        if(idx === 1){
                            console.log("습도" + item.obsrValue)
                            setWeather(data => [...data, item.obsrValue])
                        }
                        if(idx === 2){
                            console.log("1시간 강수량" + item.obsrValue);
                            setWeather(data => [...data, item.obsrValue])
                        }
                        if(idx === 3){
                            console.log("기온" + item.obsrValue);
                            setWeather(data => [...data, item.obsrValue])
                        }
                        if(idx === 4){
                            console.log("동서바람성분" + item.obsrValue);
                            setWeather(data => [...data, item.obsrValue])
                        }
                        if(idx === 5){
                            console.log("풍향" + item.obsrValue);
                            setWeather(data => [...data, item.obsrValue])
                        }
                        if(idx === 6){
                            console.log("남북바람성분" + item.obsrValue);
                            setWeather(data => [...data, item.obsrValue])
                        }
                        if(idx === 7){
                            console.log("풍속" + item.obsrValue)
                            setWeather(data => [...data, item.obsrValue])
                        }
                        
                        //강수형태 
                        // 0 :  아무것도 없음 
                        // 1 :  비
                        // 2 :  비/눈
                        // 3 :  눈
                        // 4 :  초단기 실황은 4번이 존재 하지 않음 빗방울 
                        // 5 :  빗방울 눈날림 
                        // 6 :  눈날림 
                        console.log("값 체크2")
                        console.log(weather);
                    })
                }else{

                }
            })
    }, 600000);

    

    return(
        <>
            <Row style={{paddingTop:'10vh'}}>
                <Col style = {{ textAlign :"center"}}>
                    <img src= {svg_1} alt="" style ={{height : "20vh"}}/>
                    <span class ="tempsize" style = {{ textAlign :"center"}}>{weather[3]}°</span>
                </Col>
            </Row>
            
            <Row>
                <Col style = {{ textAlign :"center"}}>
                    <img src="img/humidity.png" alt="" style ={{ }}/>
                    <span class ="humisize" style = {{ textAlign :"center"}}>습도 {weather[1]}%</span>
                </Col>
            </Row>   
        </>
    )
}

export default Weathercard
