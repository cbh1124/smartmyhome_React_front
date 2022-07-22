import React,{useState, useEffect ,useRef} from 'react';
import Head from '../Head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import './Weather.css';
import './Dustcard.css';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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

function Dustgif(){
    const[dust, setDust] = useState([]);
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        console.log(newValue);
    };

    let dustpm = (
        <span>NOT IMAGE</span>
    )

    useEffect(() =>{
        fetch("http://172.30.1.46:8095/api/dustforecast")
        .then(res => res.json())
        .then(data => {
            if(data.data.response.header.resultCode === '00'){
                const datas = data.data.response.body.items
                setDust([]);
                datas.map((item, idx) => {
                    if(idx === 0){
                        setDust(data => [...data, item.imageUrl7])
                    }else if(idx === 4){
                        setDust(data => [...data, item.imageUrl8])
                    }
                })
            }
        })
    }, []);

    useInterval(()=>{
        fetch("http://172.30.1.46:8095/api/dustforecast")
            .then(res=>res.json())
            .then(data => {
                if(data.data.response.header.resultCode === '00'){
                    const datas = data.data.response.body.items
                    setDust([]);
                    datas.map((item, idx) => {
                        if(idx === 0){
                            setDust(data => [...data, item.imageUrl7])
                        }else if(idx === 4){
                            setDust(data => [...data, item.imageUrl8])
                        }
                    })
                }
            })
    }, 600000);

    if(value === 0){
        dustpm = (
            <img src={dust[0]} alt="" style={{height:'65.6vh'}}/>
        )
    }else if(value === 1){
        dustpm = (
            <img src={dust[1]} alt="" style={{height:'65.6vh'}}/>
        )
    }

    return(
        <>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={value} 
                textColor="inherit"
                indicatorColor="inherit"
                onChange={handleChange} centered>
                    <Tab label="PM10" />
                    <Tab label="PM2.5" />
                </Tabs>
            </Box>
            
            {/* <img src={dust[0]} alt="" style={{height:'65.6vh'}}/>  */}
            <div style ={{textAlign:'center',paddingTop:'2vh'}}>{dustpm}</div>
        </>
    )
}

export default Dustgif
