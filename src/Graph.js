import React, { PureComponent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Card } from 'react-bootstrap';
import './Graph.css' 
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
} from 'recharts';


const data = [
    { 시간: '01', temperature: 32, humidity: 34 },
    { 시간: '02', temperature: 30, humidity: 56 },
    { 시간: '03', temperature: 27, humidity: 23 },
    { 시간: '04', temperature: 30, humidity: 67 },
    { 시간: '05', temperature: 32, humidity: 55},
  ];
  
  export default class Graph extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';
  
    render() {
      return (
        
        <ResponsiveContainer width="100%" height="100%">
            
            <LineChart 
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="시간" /><YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#8884d8"  />
            <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
        
      );
    }
  }