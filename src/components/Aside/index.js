import React, { Component } from 'react'
import {Link} from "react-router-dom"
import "./index.css"
export default class index extends Component {
    render() {
        return (
           <ul className="menu">
               <li><Link to="/articles">文章列表</Link></li>
               <li><Link to="/articles/add">添加文章</Link></li>
               <li><Link to="/courses">课程列表</Link></li>
               <li><Link to="/courses/add">添加课程</Link></li>
           </ul>
        )
    }
}
