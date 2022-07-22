/*global kakao*/
import React,{useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Card } from 'react-bootstrap';
import { signout, call } from "../service/ApiService";

const Kakaobus = forwardRef((props, ref) => {
    
    const[exam, setExam] = useState([]);
    const[index, setIndex] = useState("")
    const nextId2 = useRef("");
    const nextExam = useRef([]);

    useEffect(() => {
      fetch("http://172.30.1.46:8095/api/busstation")
        .then(res => res.json())
        .then(data => {
          nextExam.current = data.data;
          let marker;
          let arr = new Array();
          var mapContainer = document.getElementById('myMap'), // 지도를 표시할 div 
              mapOption = {
                  center: new kakao.maps.LatLng(37.2952066, 126.8615622), // 지도의 중심좌표
                  level: 5, // 지도의 확대 레벨
                  mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
              }; 
          
          // 지도를 생성한다 
          var map = new kakao.maps.Map(mapContainer, mapOption); 
      
          // 지도에 교통정보를 표시하도록 지도타입을 추가합니다
          map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);  
          
          // 마커 이미지의 주소
          var markerImageUrl = 'https://t1.daumcdn.net/localimg/localimages/07/2012/img/marker_p.png', 
              markerImageSize = new kakao.maps.Size(40, 42), // 마커 이미지의 크기
              markerImageOptions = { 
                  offset : new kakao.maps.Point(12, 15)// 마커 좌표에 일치시킬 이미지 안의 좌표
          };
      
          // 마커 이미지를 생성한다
          var markerImage = new kakao.maps.MarkerImage(markerImageUrl, markerImageSize, markerImageOptions);
      
          data.data.map((item, idx)=>{  
            // 지도에 마커를 생성하고 표시한다
              marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(item.gpslati, item.gpslong), // 마커의 좌표
                image : markerImage, // 마커의 이미지
                map: map // 마커를 표시할 지도 객체
              });
              arr[idx] = marker;
              
              // 마커에 클릭 이벤트를 등록한다 (우클릭 : rightclick)
              kakao.maps.event.addListener(arr[idx], 'click', function() {
                alert(item.nodenm)
                props.setStore(idx)
                nextId2.current = idx;
              });
                   
          })
            
          // 지도에 마커를 생성하고 표시한다
          marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(37.2952066, 126.8615622), // 마커의 좌표
              image : markerImage, // 마커의 이미지
              map: map // 마커를 표시할 지도 객체
          });
      
          // 마커에 클릭 이벤트를 등록한다 (우클릭 : rightclick)
          kakao.maps.event.addListener(marker, 'click', function() {
            alert('우리집');
          });
      
      
        })
        
    }, []);
    
    useImperativeHandle(ref, () => ({
      getRowId: nextId2.current // 데이터 보내기
      
    }));

    return(
        <>
            <div className="" id="myMap" style={{height : '77vh'}}>
              
            </div>
        </>
    )
})

export default Kakaobus;