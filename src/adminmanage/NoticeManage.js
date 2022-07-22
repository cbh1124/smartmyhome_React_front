import React, {useState, useEffect, useRef} from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from '../Head';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { call, noticeregist,noticedelete } from "../service/ApiService";
import {Route, Link} from 'react-router-dom'
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

function NoticeManage(){
    const [data, setData] = useState([]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    useEffect(()=>{
        call("/notice", "GET", null).then((response)=>
            {
            setData(response.data)
            } 
        )
        call("/auth/adminsearch", "POST", null).then((response) =>
            {   
                if(response.check === false){
                    window.location.href = "/";
                }
            }
        );
    }, []);
    
    const handleEditClose = () =>{
        setOpen(false);
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = new FormData(event.target);
        const ntitle = data.get("ntitle");
        noticeregist({ntitle:ntitle })
        handleEditClose();
        setTimeout(function() {
            call("/notice", "GET", null).then((response)=>
                {
                    setData(response.data)
                } 
            )
        }, 100);
    }

    // 삭제시 인덱스를 통해서 해당 데이터 삭제하기 
    const handledelete = (e) =>{
        const idx = e.target.value;
            noticedelete( {nnum:data[idx].nnum, ntitle:data[idx].ntitle} )
            handleEditClose()
            setTimeout(function() {
                call("/notice", "GET", null).then((response)=>
                    {
                        setData(response.data)
                    } 
                )
            }, 100);
    }

    let tablecell;
        
    if(data){
        tablecell = data.map((item, idx)=>

        <TableRow key ={item.nnum+0}>
            <TableCell align="" key ={item.nnum+1} >
            {idx+1}
            </TableCell>
            <TableCell align="" key ={item.nnum+2}  value ={item.ntitle}>
            {item.ntitle}
            </TableCell>
            {/* <TableCell align="" key ={item.id+3}>
            {item.ncontent}
            </TableCell> */}
            <TableCell align="" key ={item.nnum+4}>
                {item.created_date.replace("T"," ").substr(0,16)}
            </TableCell>
            <TableCell align="" key ={item.nnum+13}>
                <Button size="small"  key={item.rnum+idx+13} onClick={ handledelete } value={idx} variant="outlined" color="error">삭제</Button>
            </TableCell>
        </TableRow>
        
        )
    }else{
        tablecell = data.map((item, idx)=>
        <TableRow>
            <TableCell align="" >
            (null)
            </TableCell>
            <TableCell align="" >
            (null)
            </TableCell>
            <TableCell align="" >
            (null)
            </TableCell>
            <TableCell align="" >
            (null)
            </TableCell>
            <TableCell align="" >
            (null)
            </TableCell>
        </TableRow>
        )
    }
    return(
    <>
      <Container>
      <Head/>
      <div class ="p-1" >
        
      </div>
        <div class=" d-flex justify-content-between">
            <Button  align="center"  variant="outlined" onClick={handleOpen}>공지사항 생성</Button>
            <Link class="nav-link active " to="/usermanage">
                <Button align="center" padding="" variant="outlined" color="success">유저정보페이지</Button>
            </Link>
        </div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} onSubmit={handleSubmit} component="form">
                <TextField id="ntitle" name="ntitle"  label="공지사항 내용" variant="standard" />
                {/* <TextField label="공지사항 내용" variant="standard" />  */}
                <div class ="p-2"> </div>
                <Button size="small" type="submit" variant="outlined" >등록</Button>   
            </Box>  
        </Modal>
      <Card>      
          <div class="pt-3"></div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="">번호</StyledTableCell>
                            <StyledTableCell align="">공지사항</StyledTableCell>
                            {/* <StyledTableCell align="">공지사항내용</StyledTableCell> */}
                            <StyledTableCell align="">생성일자</StyledTableCell>
                            <StyledTableCell align="">삭제</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tablecell}
                    </TableBody>
                </Table>
            </TableContainer>
      </Card>
      </Container>
    </>

    )


}

export default NoticeManage;




const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};