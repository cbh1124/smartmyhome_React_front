import React, { useState, useEffect, useRef, useCallback } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { createGlobalStyle } from 'styled-components';
import Clock from '../ReactClock';
import {Route, Link} from 'react-router-dom'
import { call } from "../service/ApiService";
import { Paper, List, Container2 } from "@mui/material";

import TodoHead from './TodoHead2';

import AddTodo from "./AddTodo.js";
import Todo from "./Todo.js";
import Head from '../Head';


const Todo2 = () => {

  const [state, setState] = useState({ items: []});

  // componentDidMount 대신 useEffect 사용
  useEffect(() => {
    call("/todo", "GET", null).then((response) =>
    
      setState({ items: response.data })
    );
    
    console.log(state);
  }, []);

  const add = (item) => {
    call("/todo", "POST", item).then((response) =>
      setState({ items: response.data })
    );
  };

  const deleteItem = (item) => {
    console.log(item);
    call("/todo", "DELETE", item).then((response) =>
      setState({ items: response.data })
    );
  };

  const update = (item) => {
    call("/todo", "PUT", item).then((response) =>
      setState({ items: response.data })
    );
  };

  var todoItems = state.items.length > 0 && (
      <List>
        {state.items.map((item, idx) => (
          <Todo
            item={item}
            key={item.id}
            deleteItem={deleteItem}
            update={update}
          />
        ))}
      </List>
  );
  

    return(
        <> 
        <Container>
            <Head/>
            
            <Card>
                  <TodoHead props ={state} />
                  <div>{todoItems}</div>
                  <AddTodo add={add} />
            </Card>
            
        </Container>
        </>
    );
   
}

export default Todo2;