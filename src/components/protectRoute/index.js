import React from 'react';
import {Route} from "react-router-dom"
import loginInfo from "../../loginInfo"
import LoginLoading from "../loginLoading"
const index = ({component:Component,render,children,...rest}) => {
    return (
        <div>
            <Route {...rest} render={context=>{
                if(loginInfo.isLogin){
                    return <Component/>    
                }else{
                   return <LoginLoading/>
                 
                }
            }}></Route>
        </div>
    );
}

export default index;
