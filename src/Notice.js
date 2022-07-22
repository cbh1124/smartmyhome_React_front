import React, { useState, useEffect, useRef } from 'react'
import './Notice.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { call } from "./service/ApiService";

const Notice = () => {
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

  const [idx, setIdx] = useState(0)
  const [notice, setNotice] = useState(
    [
      {
      no: 1,
      title: '안녕하세요 SmartHome에 오신걸 환영합니다.',
      content: '뭐시깽이 도마뱀 입고',
      date: '2021-12-13 14:20:31'
      },
      {
        no: 2,
        title: 'CCTV 기능 활성화 완료',
        content: 'SM GECKO 설 연휴 휴무 안내',
        date: '2021-12-13 14:20:31'
      },
      {
        no: 3,
        title: 'IoT Smart Home',
        content: '뭐시깽이 도마뱀 입고',
        date: '2021-12-13 14:20:31'
      }
    ]
  );  

  const idxRef = useRef(0)  
  
  useEffect(() => {
    call("/notice", "GET", null).then((response)=>{
      // eslint-disable-next-line no-lone-blocks
      {
        console.log(response)
        setNotice(response.data)
      }
    })

      idxRef.current = (idxRef.current + 1) % notice.length 
      setIdx(idxRef.current)
      console.log(idxRef.current)
    }, [notice.length])

  useInterval(()=>{
    idxRef.current = (idxRef.current + 1) % notice.length 
    setIdx(idxRef.current)
  }, 2000);
  
  console.log(notice)
  return (
    <ul className="notice mb-2 mt-0">
      <div className="notice_container" style={{ transform: `translateY(${-25.45 * idx}px)`, transition: `transform 1s;` }}>
        {notice.map((item, idx) => {
          return (
            <Row className="p-0">
                <Col xs = {1}>
                    <span className="notice_header justify-content-end">[공지사항]</span>
                </Col>
                <Col xs = {7}>
                    <div className="notice_title mt-1">{item['ntitle']}</div>
                </Col>
            </Row>
          )
        })}
      </div>
    </ul>
  )
}

export default Notice