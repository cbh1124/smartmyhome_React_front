import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import TodoTemplate from './TodoTemplate';
import { createGlobalStyle } from 'styled-components';
import TodoHead from './TodoHead';
import TodoList from './TodoList';
import TodoCreate from './TodoCreate';
import Clock from '../ReactClock';
import {Route, Link} from 'react-router-dom'
import {TodoProvider} from './TodoContext'
import Head from '../Head';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function Todo(){

    return(
        <> 
        <Container>
          <Head/>
            {/* <TodoTemplate> */}
            <Card>
                <TodoProvider>
                        <TodoHead />
                        <TodoList />
                        <TodoCreate />
                </TodoProvider>
            </Card>
            {/* </TodoTemplate> */}
        </Container>
        </>
    );
   
}

export default Todo;