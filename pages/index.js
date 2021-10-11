import Head from 'next/head'
import Link from "next/link"
import React, { useState } from 'react'
import Header from "../components/Header"
import { List, Row, Col, Icon } from 'antd'
import Author from "../components/Author"
import Footer from "../components/Footer"
import axios from "axios"
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

function Home(props) {
    console.dir(process)
    const [myList, setMylist] = useState(props.data)
    const renderer = new marked.Renderer();
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        sanitize: false,
        xhtml: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }

    });

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
                    <List header={<div>最新日志</div>} itemLayout="vertical" dataSource={myList} renderItem={item => (<List.Item>
                        <div className="list-title">
                            <Link href={{ pathname: '/details', query: { id: item._id } }}>{item.title}</Link>
                        </div>
                        <div className="list-icon">
                            <span><Icon type="calender" /> {item.addTime.match(/[0-9-]*(?=T)/g)[0]}</span>
                            <span><Icon type="folder" /> {item.typeId.typeName} </span>
                            <span><Icon type="fire" /> {item.viewCount}人观看 </span>
                        </div>
                        <div className="list-context"
                            dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                        ></div>

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

Home.getInitialProps = async () => {
    const promise = new Promise((resolve) => {
        const env = process.env.NODE_ENV
        const baseUrl = env==="development"?"http://127.0.0.1:7001/":"http://api.techgrow.top/"

        axios.get(baseUrl+"frontEnd/getArticleList").then((res) => {
            resolve(res.data)
        })
    })
    let res = await promise

    return { data: res }
}

export default Home