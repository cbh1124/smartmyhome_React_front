import React,{useState, useEffect, useRef} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Navigator from './Navigator';
import Content from './Content';
import Header from './Header';
import Head from '../Head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import DeleteRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { call } from "../service/ApiService";
import RegistModal from "./RegistModal"
// import '../App.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { sensoredit, sensordelete } from "../service/ApiService";
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Card2 from '@mui/material/Card';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 0,
  pt: 2,
  px: 4,
  pb: 3,
  
};


let theme = createTheme({
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0,0,0,0.0)",
        },
      },
    },
  },
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#081627',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(255,255,255,0.15)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#4fc3f7',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

const drawerWidth = 256;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const MemoizedMyComponent = React.memo(Paperbase);

export default function Paperbase() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [test, setTest] = useState("");

  // 모달 내부 text onchange 전용 임시 저장소 
  const input1 = useRef();
  const input2 = useRef();
  const input3 = useRef();
  const input4 = useRef();

  // 모달 활성화 체크 
  const [editOpen, setEditOpen] = useState(false);
 
  // 수정한 값 들을 보내 전송 후 다시 값을 가져와서 렌더링시키기(state의 감지 변화를 통해서 강제 렌더링)
  const handleSubmit = (event) =>{
    
    event.preventDefault();
    const data = new FormData(event.target);
    const rnum = data.get("rnum");
    const rname = data.get("rname");
    const rsaddress = data.get("rsaddress")
    const rsname = data.get("rsname")
    sensoredit({ rnum:rnum, rname: rname, rsaddress: rsaddress, rsname:rsname })
    handleEditClose()

    setData([]);
    setTimeout(function() {
      call("/user/sensorlist", "GET", null).then((response) =>
        {
          setData(response.data)
        } 
      );
    }, 100);
  }


  // 삭제시 인덱스를 통해서 해당 데이터 삭제하기 
  const handledelete = (e) =>{
    const idx = e.target.value;
    sensordelete({ rnum:data[idx].rnum, rname: data[idx].rname, rsaddress: data[idx].rsaddress, rsname:data[idx].rsname })
    handleEditClose()
    setTimeout(function() {
      call("/user/sensorlist", "GET", null).then((response) =>
        {
          setData(response.data)
        } 
      );
    }, 100);
  }

  // 수정시 인덱스를 통해서 해당 데이터 가져오는 상태관리함수
  function editValue(idx){
    setTest(data[idx]) 
  }

  // edit 중 input value에 값을 넣을시 리액트는 해당값이 고정되어 사용자가 input에 값을 넣어도 적용이 안됨 
  function ControlledInput1({onUpdate, item, idx, test}){
    const [value, setState] = useState(test.rnum);
    const handleChange = (e) => {
      setState(e.target.value);
      onUpdate(e.target.value);
    }
    return <TextField onChange={handleChange} key={item.rnum+idx+7} id="rnum" name="rnum" label="번호" variant="standard" value={test.rnum}  />
  }

  function ControlledInput2({onUpdate, item, idx, test}){
    const [value, setState] = useState(test.rname);
    const handleChange = (e) => {
      setState(e.target.value);
      onUpdate(e.target.value);
    }
    return <TextField onChange={handleChange} key={item.rnum+idx+8} id="rname" name="rname" label="방 이름" variant="standard" value={value}  />
  }

  function ControlledInput3({onUpdate, item, idx, test}){
    const [value, setState] = useState(test.rsaddress);
    const handleChange = (e) => {
      setState(e.target.value);
      onUpdate(e.target.value);
    } 
    return <TextField onChange={handleChange} key={item.rnum+idx+9} id="rsaddress"  name="rsaddress"label="IPAddress" variant="standard" value={value}/>
  }

  function ControlledInput4({onUpdate, item, idx, test}){
    const [value, setState] = useState(test.rsname);
    const handleChange = (e) => {
      setState(e.target.value);
      onUpdate(e.target.value);
    }
    return <TextField onChange={handleChange} key={item.rnum+idx+10} id="rsname"  name="rsname"label="센서 이름" variant="standard" value={value} /> 
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function handleEditOpen(e){
    setEditOpen(true);
  }
  
  const handleEditClose = () =>{
    setEditOpen(false);
  }

  const setValue = (e)=>{
    call("/user/sensorlist", "GET", null).then((response) =>
      setData(response.data)
    );
  }

  useEffect(()=>{
    call("/user/sensorlist", "GET", null).then((response) =>
      setData(response.data)
    );
  }, [])

  let tablecell;

  if(data){
    tablecell = data.map((item, idx)=>
    <TableRow key ={item.rnum+idx+0} align="left" >
      <TableCell  key={item.rnum+idx+1} align="left" >
        {item.rnum}
      </TableCell>
      <TableCell  key={item.rnum+idx+2} align="left" >
        {item.rname}
      </TableCell>
      <TableCell  key={item.rnum+idx+3} align="left" >
        {item.rsaddress}
      </TableCell>
      <TableCell key={item.rnum+idx+4} align="left" >
        {item.rsname}
      </TableCell>
      <TableCell key={item.rnum+idx+5} align="left" >
        <Button size="small" key={item.rnum+idx+6 } onClick={(e)=>{handleEditOpen(e); editValue(idx)} } variant="outlined" color="success">수정</Button>
        <Modal
          BackdropProps={{ style: { backgroundColor: "transparent" } }}
          open={editOpen}
          onClose={handleEditClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Card2 onSubmit={handleSubmit} key={item.rnum+idx+7} component="form" sx={{...style, width: 300 }}>
            <Container>
              
              <ControlledInput1 onUpdate={val =>{ input1.current = val; }} item = {item} idx = {idx} test = {test} />
              <ControlledInput2 onUpdate={val =>{ input2.current = val; }} item = {item} idx = {idx} test = {test} />
              <ControlledInput3 onUpdate={val =>{ input3.current = val; }} item = {item} idx = {idx} test = {test} />
              <ControlledInput4 onUpdate={val =>{ input4.current = val; }} item = {item} idx = {idx} test = {test} />
              <div class ="p-2"></div>
              <Button size="small" key={item.rnum+idx+11} type="submit" variant="outlined"  >등록</Button>  
            </Container>
          </Card2>
        </Modal> 
      </TableCell>
      <TableCell key={item.rnum+idx+12} align="left" >
        <Button size="small"  key={item.rnum+idx+13} onClick={ handledelete } value={idx} variant="outlined" color="error">삭제</Button>
      </TableCell>
    </TableRow>
    )
  }else{
    tablecell = data.map((item, idx)=>
      <TableRow>
        <TableCell align="" >
          (몰루)
        </TableCell>
        <TableCell align="" >
          (몰루)
        </TableCell>
        <TableCell align="" >
        (icon modal edit)
        <ModeEditIcon/>
        </TableCell>
        <TableCell align="" >
        (icon modal delete)
        <DeleteRoundedIcon />
        </TableCell>
      </TableRow>
    )
  }

  return (
    <>
      <Container>
      <Head/>
      <Card>
        <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#FFFFFF' }}>
        <RegistModal setValue={setValue} data2={data} />
        <div class="pt-3"></div>
          <TableContainer component={Paper}>
              <Table>
                  <TableHead>
                      <TableRow>
                          <StyledTableCell align="">번호</StyledTableCell>
                          <StyledTableCell align="">방</StyledTableCell>
                          <StyledTableCell align="">ip</StyledTableCell>
                          <StyledTableCell align="">센서이름</StyledTableCell>
                          <StyledTableCell align="">센서수정</StyledTableCell>
                          <StyledTableCell align="">센서삭제</StyledTableCell>
                      </TableRow>
                  </TableHead>
              
                  <TableBody>
                      {tablecell}
                  </TableBody>
              </Table>
          </TableContainer>
        </Box>
      </Card>
      </Container>
      
    </>
  );
}
