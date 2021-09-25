import React from 'react';
import "./index.css"
const Header = () => {
    return (
        <div className="header-container"> 
            <div className="left">学生管理系统</div> 
            <div className="right">
                <span>账号</span>
                <button>退出</button>
            </div> 
        </div>
    );
}

export default Header;
