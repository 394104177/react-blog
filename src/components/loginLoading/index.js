import React from 'react';
import {Redirect} from "react-router-dom"
 class loginLoading extends React.Component {
     state={
         seconds:5
        
     }
     timer=null
     componentWillUnmount(){
         clearInterval(this.timer)
     }

     componentDidMount(){
     this.timer =   setInterval(() => {
            this.setState({seconds:this.state.seconds-1})
        }, 1000);
     }
    render(){
       
       return  (<div>
           {this.state.seconds >= 0? <div>请先登录,5秒之后跳转{this.state.seconds}</div>:<Redirect to="/login"></Redirect>   }
           
        </div>)
    }
}

export default loginLoading;
