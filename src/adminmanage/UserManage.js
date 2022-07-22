import React,{useState, useEffect, useRef} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { call, useredit, userdelete } from "../service/ApiService";
import Head from '../Head';
import Card from '@mui/material/Card';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';
import {Route, Link} from 'react-router-dom'

function UserManage(){
  const [data, setData] = useState([]);

  const [one, setOne] = useState('');
  const [two, setTwo] = useState('');
  const [three, setThress] = useState('');
  const [four, setFour] = useState('');

  useEffect(()=>{
    call("/auth/usermanage", "GET", null).then((response)=>
      {
        setData(response.data)
        console.log(response)
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

  ///// 값 변화 감지 체크 
  const handleChange = (event) => {
    const str = event.target.value;
    const arr = str.split(" ")
    const id = arr[0];
    const role = arr[1];
    useredit({id:id, role:role})
    setTimeout(function() {
      call("/auth/usermanage", "GET", null).then((response)=>
        {
          setData(response.data)
        } 
      )
    }, 100);
  };
  /////

  const handleSubmit = (e) =>{
    e.preventDefault();
    const data = new FormData(e.target);
    const email = new data.get("email")
    console.log(email)
  }

  const handleDelete = (e) =>{
    e.preventDefault();
    const id = e.target.value;
    userdelete({id:id, username:""})
    setTimeout(function() {
      call("/auth/usermanage", "GET", null).then((response)=>
        {
          setData(response.data)
        } 
      )
    }, 100);
  }


  let tablecell;

  if(data){
    tablecell = data.map((item, idx)=>
      <TableRow key ={item.id+0}>
        <TableCell align="" key ={item.id+1} >
          {idx+1}
        </TableCell>
        <TableCell align="" key ={item.id+2}  value ={item.email}>
          {item.email}
        </TableCell>
        <TableCell align="" key ={item.id+3}>
          {item.username}
        </TableCell>
        <TableCell align="" key ={item.id+4}>
          {/* {item.role} */}
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small" key ={item.id+5} >
            <InputLabel id="demo-simple-select-label" key ={item.id+6}>{item.role}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="grouped-select"
              label="Grouping"
              onChange={handleChange}
              key ={item.id+7}
              value=""
            >
              <MenuItem key ={item.id+8} value={item.id+" "+"USER"}>USER</MenuItem>
              <MenuItem key ={item.id+9} value={item.id+" "+"ADMIN"}>ADMIN</MenuItem>
              <MenuItem key ={item.id+10} value={item.id+" "+"NOTUSER"}>NOTUSER</MenuItem>
            </Select>
          </FormControl>
      
        </TableCell>
        {/* <TableCell align=""  key ={item.id+11}>
          <Button  key ={item.id+12} size="small" type="submit"  variant="outlined" color="success" >수정</Button>
        </TableCell> */}
        <TableCell align="" key ={item.id+13}>
          <Button key ={item.id+14} size="small"  variant="outlined" color="error" onClick={handleDelete} value={item.id}>삭제</Button>
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
      <div class=" d-flex justify-content-end">
        <Link class="nav-link active " to="/noticemanage">
                <Button align="center" padding="" variant="outlined" color="success">공지사항페이지</Button>
        </Link>
      </div>
      {/* <Link class="nav-link active " to="/noticemanage">
                <img className="img1 bshadow pb-1" src="img/light.svg" alt="" />
      </Link> */}
      <Card>      
          <div class="pt-3"></div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="">번호</StyledTableCell>
                            <StyledTableCell align="">이메일</StyledTableCell>
                            <StyledTableCell align="">유저이름</StyledTableCell>
                            <StyledTableCell align="">권한</StyledTableCell>
                            {/* <StyledTableCell align="">수정</StyledTableCell> */}
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

export default UserManage;



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];