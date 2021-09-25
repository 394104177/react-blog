import React, { useState } from 'react'
import "./index.css"
import loginInfo from "../../loginInfo"
// import * as service from "../../services/articles"
import 'antd/dist/antd.css';
import { Card, Input, Button, Spin, message } from 'antd';
import { LockTwoTone, UserOutlined } from "@ant-design/icons"
import axios from "axios"
export default function Login(props) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    return (
        <div className="login-div" >

            <Spin tip="正在登陆中" spinning={isLoading} wrapperClassName={"spinWrapper"} delay={100}>
                <Card title="博客后台管理" bordered={true} style={{ width: 400, margin: "auto", textAlign: "center" }} >
                    <Input
                        id="userName"
                        size="large"
                        placeholder="请输入账户名"
                        prefix={<UserOutlined type="user" style={{ color: '#1890ff' }} />}
                        value={userName}
                        onChange={(e) => { setUserName(e.target.value) }}
                    />
                    <br /><br />
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="请输入密码"
                        prefix={<LockTwoTone style={{ color: 'rgba(0,0,0,.25)' }} />}
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <br /><br />
                    <Button type="primary" size="large" block onClick={async () => {
                        // const res = await service.getAllStudents()
                        // console.log(res)
                        setIsLoading(true)

                        console.log(userName, password)
                        let dataProps = {
                            'userName': userName,
                            'passWord': password
                        }
                        if (!userName) {
                       
                            message.error('用户名不能为空')
                            setIsLoading(false)
                            return false
                        } else if (!password) {
                            message.error('密码不能为空')
                            setIsLoading(false)
                            return false
                        }
                        axios.post("http://localhost:7001/backEnd/checkLogin", dataProps,{
                            withCredentials: true
                        })
                            .then(res => {
                                setIsLoading(false)


                                if (res.data.data === '登录成功') {
                                    loginInfo.loginIn(res.data.openId)
                                    props.history.push('/')
                                } else {
                                    message.error('用户名密码错误')
                                }
                            })
                        if(isLoading){
                            setTimeout(() => {
                                setIsLoading(false)
                            }, 1000)
                        }
                      
                    }}> 登录 </Button>
                </Card>
            </Spin>
        </div>
        // <div className="login">
        //     <h1>登录授权页</h1>
        //     <Input type="text" />
        //     <Input type="password" />
        //     <Button onClick={async () => {
        //         const res = await service.getAllStudents()
        //         console.log(res)
        //         loginInfo.loginIn()
        //         this.props.history.push("/")
        //     }} >登录</Button>
        // </div>
    )

}
