import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { signout, call, sensorregist } from "../service/ApiService";
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function RegistModal(props) {
    const [state, setState] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [sensor, setSensor] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
      setSensor(event.target.value);
    };

    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = new FormData(event.target);
        const rname = data.get("rname");
        const rsaddress = data.get("rsaddress")
        const rsname = data.get("rsname")
        console.log(rname);
        sensorregist({ rname: rname, rsaddress: rsaddress, rsname:rsname })
        handleClose()
        call("/user/sensorlist", "GET", null).then((response) =>
          props.setValue(response.data)
        );
        
    }

  return (
    <div>
      <Button  variant="outlined" onClick={handleOpen}>센서 추가</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Card onSubmit={handleSubmit} component="form" sx={{...style, width: 300 }}>
          {/* <h2 id="parent-modal-title">센서 등록</h2> */}
          <TextField id="rname" name="rname" label="방 이름" variant="standard" />
          <TextField id="rsaddress"  name="rsaddress"label="IPAddress" variant="standard" /> 
          <TextField id="rsname"  name="rsname"label="센서 이름" variant="standard" />
          <Box sx={{ minWidth: 120 }}>
            {/* <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">센서이름</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sensor}
                label="센서이름"
                onChange={handleChange}
              >
                <MenuItem value={"CCTV"}>CCTV</MenuItem>
                <MenuItem value={"TempHumi"}>TempHumi</MenuItem>
                <MenuItem value={"Plant"}>Plant</MenuItem>
              </Select>
            </FormControl> */}
          </Box>
          <div class ="p-2">

          </div>
          <Button size="small" type="submit" variant="outlined" >등록</Button>   
        </Card>
      </Modal>
    </div>
  );
}
