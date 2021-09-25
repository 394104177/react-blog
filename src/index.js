import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {reducer} from "./redux"


let res = ReactDOM.render(

    <App />,
 
  document.getElementById('root'),function(){console.log("rootFiber",this)}
);

console.log(res)
console.log(reducer)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

