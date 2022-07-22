import React, { useState, useEffect,useRef } from "react";
import {ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton, Button, Input, makeStyles } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Todo = (props) => {
  const [state, setState] = useState({ item: props.item, readOnly: true });
  const deleteItem = props.deleteItem;
  const update = props.update;
  

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const deleteEventHandler = () => {
    deleteItem(state.item);
  };
  
  const offReadOnlyMode = () => {
    // console.log("Event!", state.readOnly);
    setState({ item: props.item, readOnly: false })
  }

  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      setState({ item: props.item, readOnly: true });
      update(state.item);
    }
  };

  const editEventHandler = (e) => {
    const thisItem = state.item;
    thisItem.title = e.target.value;
    setState({ item: thisItem });
  };

  const checkboxEventHandler = (e) => {
    const thisItem = state.item;
    thisItem.done = !thisItem.done;
    setState({ item: thisItem });
    update(state.item);
  };

  const item = state.item;

  
  return (
    <ListItem>
      {/* <Checkbox checked={item.done} onChange={checkboxEventHandler} /> */}
      <Checkbox
        checked={item.done}
        onChange={checkboxEventHandler}
        {...label}
        default color = "success"
        defaultChecked
        sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } } }
        // icon={<BookmarkBorderIcon />}
        // checkedIcon={<BookmarkIcon />}
        icon={<RadioButtonUncheckedIcon style={{ color: "#38D9A9" }} />}
        checkedIcon={<CheckCircleOutlineIcon style={{ color: "#38D9A9" }} />}
        
        size = "medium"
      />
      <ListItemText>
        <InputBase
          style={{  }}
          inputProps={{
            "aria-label": "naked",
            readOnly: state.readOnly,
            style: {fontSize: 25, paddingLeft: 10}
          }}
          
          type="text"
          id={item.id}
          name={item.id}
          value={item.title}
          fullWidth={true}
          onClick={offReadOnlyMode}
          onChange={editEventHandler}
          onKeyPress={enterKeyEventHandler}
          
        />
      </ListItemText>

      <ListItemSecondaryAction>
       <Button variant="outlined" startIcon={<DeleteIcon />} onClick={deleteEventHandler} style={{ margin: 16, color: "#ff6b6b"}} color="error">
        Delete
      </Button> 
      {/* <Chip
        label="Custom delete icon"
        onClick={deleteEventHandler}
        
        deleteIcon={<DeleteIcon />}
        variant="outlined"
        color="success"
      /> */}
      
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Todo;