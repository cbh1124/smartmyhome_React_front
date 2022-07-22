import React, { useState } from "react";
import { TextField, Paper, Button, Grid } from "@mui/material";

const AddTodo = ( props ) => {

  const [state, setState] = useState({ item : { title: "" }});
  const add = props.add;

  const onInputChange = (e) => {
    const thisItem = state.item;
    thisItem.title = e.target.value;
    setState({ item: thisItem });
    console.log(thisItem);
  };

  const onButtonClick = () => {
    add(state.item);
    setState({ item: { title: "" } });
  };

  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      onButtonClick();
    }
  };

    return (
      <Paper style={{ margin: 32, padding: 16  }}>
        <Grid container>
          <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
            <TextField placeholder="Add Todo here" fullWidth /*fullWidth하면 Add Todo here이 꽉차게 늘어남*/
                        onChange={onInputChange} value ={state.item.title}
                        onKeyPress={enterKeyEventHandler}  />
          </Grid>
          <Grid xs={1} md={1} item>
            <Button
              fullWidth
              color="success"
              variant="outlined"
              onClick={onButtonClick}
              style={{ color: "#38D9A9" }}
            >
              +
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
}

export default AddTodo;