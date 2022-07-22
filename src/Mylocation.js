/*global kakao*/
import React,{useState, useEffect,useRef}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Card } from 'react-bootstrap';
import './Mylocation.css'

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

function Mylocation() {
    useEffect(() => {
        const markers = []
        const infowindows = []
        var container = document.getElementById('myMap'); //지도를 담을 영역의 DOM 레퍼런스

        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(37.2952066, 126.8615622), //지도의 중심좌표.
            level: 5//지도의 레벨(확대, 축소 정도)
        };
        var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        // 지도에 교통정보를 표시하도록 지도타입을 추가합니다
        map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);  
        // 마커가 표시될 위치입니다 

        var markerPosition  = new kakao.maps.LatLng(37.2952066, 126.8615622); 

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
        // marker.setMap(null);  

    }, []);

    // useInterval(()=>{
    //     const markers = []
    //     const infowindows = []
    //     var container = document.getElementById('myMap'); //지도를 담을 영역의 DOM 레퍼런스

    //     var options = { //지도를 생성할 때 필요한 기본 옵션
    //         center: new kakao.maps.LatLng(37.2952066, 126.8615622), //지도의 중심좌표.
    //         level: 5//지도의 레벨(확대, 축소 정도)
    //     };
    //     var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    //     // 지도에 교통정보를 표시하도록 지도타입을 추가합니다
    //     map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);  
    //     // 마커가 표시될 위치입니다 

    //     var markerPosition  = new kakao.maps.LatLng(37.2952066, 126.8615622); 

    //     // 마커를 생성합니다
    //     var marker = new kakao.maps.Marker({
    //         position: markerPosition
    //     });
    //     // 마커가 지도 위에 표시되도록 설정합니다
    //     marker.setMap(map);

    //     // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
    //     // marker.setMap(null);
            
    // }, 2000);

        return (
            <Container>
                
                <p className="mt-3 mb-0 logo1">Location</p>
                <p className="mt-0 logo2">IOT System</p>
                <Card className="mymap mb-3" id="myMap" >

                </Card>
                
            </Container>
        )
    
}

export default Mylocation;