import React, { useState, useEffect, useRef, useCallback } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import Head from '../Head';
import Kakaobus from './Kakaobus';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

function Bus(){
    const [store, setStore] = useState("0")
    const [list, setList] = useState([])
    const [example, setExample] = useState([])
    const nextExam = useRef([]);
    const nextId = useRef({getRowId:0})


    // 타임 
    const[min, setMin] = useState(3);
    const[sec, setSec] = useState(0);
    const time = useRef(180);
    const timerId = useRef(null);

    useEffect(()=>{
        fetch("http://172.30.1.46:8095/api/buslocation")
            .then(res => res.json())
            .then(data => {  
                setList(data.datalist);
        })
        fetch("http://172.30.1.46:8095/api/busstation")
            .then(res => res.json())
            .then(data => {
                nextExam.current = data.data
                setExample(data.data)
        })
    }, []);

    useEffect(()=>{
        timerId.current = setInterval(() => {
            setMin(parseInt(time.current/60));
            setSec(time.current % 60);
            time.current -= 1;
        }, 1000);

        return () => clearInterval(timerId.current);
    }, []);

    useEffect(()=>{
        // 만약 타임 아웃이 발생할 경우 
        if(time.current <= 0){
            console.log("타임 아웃")
            clearInterval(timerId.current);
            // dispatch event
        }
    }, [sec]);


// 각 정류소 별 리스트 가져오기 
    var tablecell; // 도착예정버스 남은 정류장 수
    
    if(list[store]){
        list[store].map((item, idx) => 
            time.current = item.arrtime
        )
    }

    if(list[store]){
        tablecell = list[store].map((item, idx) =>
            <TableRow>
                <TableCell align="right" key = {idx}>
                    {item.nodenm}
                </TableCell>
                <TableCell align="right" key = {idx}>
                    {item.routeno}번
                </TableCell>
                <TableCell align="right" key = {idx}>
                    {item.arrprevstationcnt}개
                </TableCell>
                <TableCell align="right" key = {idx}>
                    {/* {time.current = item.arrtime}초 */}
                    {/* {time.current}초 */}
                    {(item.arrtime/60).toFixed()}분{item.arrtime%60}초
                    {/* {min}분{sec}초 */}
                </TableCell>
            </TableRow>
        )
    }else{
        tablecell = (
            <TableRow>
                <TableCell align="right" >
                    null
                </TableCell>
                <TableCell align="right" >
                    null
                </TableCell>
                <TableCell align="right" >
                    null
                </TableCell>
                <TableCell align="right" >
                    null
                </TableCell>
            </TableRow>
        )  
    }
    
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

    return(
        <>
            <Head/>
            <Container >
                <div class ="row" style={{height :"85.4vh"}}>
                    <div class ="col">
                        <Card style={{ height:'76vh'}}>
                            <Kakaobus setStore = {setStore} ref = {nextId}/>
                            {/* <Kakaobus ref = {nextId.nextId.current} /> */}
                            {/* <Kakaobus /> */}
                        </Card>
                    </div>
                    <div class ="col" >
                        <Card style={{ height:'76vh'}}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="right">정류장이름</StyledTableCell>
                                            <StyledTableCell align="right">버스번호</StyledTableCell>
                                            <StyledTableCell align="right">남은 정류장 수</StyledTableCell>
                                            <StyledTableCell align="right">시간</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                
                                    <TableBody>
                                        {tablecell}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Bus;