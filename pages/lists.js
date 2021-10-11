import Head from 'next/head'
import Link from "next/link"
import React, { useState ,useEffect} from 'react'
import Header from "../components/Header"
import { List, Row, Col, Icon, Breadcrumb } from 'antd'
import Author from "../components/Author"
import Footer from "../components/Footer"
import axios from "axios"
 function Lists(props) {
    const [myList, setMylist] = useState(props.data.data)
    useEffect(()=>{
        setMylist(props.data.data)
       })
    return (
        <>
            <div >
                <Head>
                    <title>chooopa的个人博客</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
            </div>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                    <div className="bread-div">
                        <Breadcrumb>
                            <Breadcrumb.Item> <a href="/">首页</a></Breadcrumb.Item>    
                            <Breadcrumb.Item>视频教程</Breadcrumb.Item>    
                        </Breadcrumb>
                    </div>
                
                    <List header={<div>最新日志</div>} itemLayout="vertical" dataSource={myList} renderItem={item => (<List.Item>
                        <div className="list-title" >
                        <Link href={{pathname:'/details',query:{id:item._id}}} >
                            <a >{item.title}</a>
                           

                            </Link>  

                        </div>
                        <div className="list-icon">
                            <span><Icon type="calender" /> {item.addTime.match(/[0-9-]*(?=T)/g)[0]} </span>
                            <span><Icon type="folder" /> {item.typeId.typeName} </span>
                            <span><Icon type="fire" /> {item.viewCount} </span>
                        </div>
                        <div className="list-context">{item.introduce}</div>
                    </List.Item>)} />
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author />
                </Col>
            </Row>
            <Footer />
        </>
    )
}

Lists.getInitialProps = async (context) => {
    const promise = new Promise((resolve) => {
        console.log('context', context)
        const env = process.env.NODE_ENV
        const baseUrl = env==="development"?"http://127.0.0.1:7001/":"http://api.techgrow.top/"

        axios.get(baseUrl+"frontEnd/getListById/" + context.query.id).then((res) => {
            resolve(res.data)
        })
    })
    let res = await promise

    return { data: res }
}
export default Lists