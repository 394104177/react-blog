import Head from 'next/head'
import React from 'react'
import Header from "../components/Header"
import { Row, Col, Icon, Breadcrumb, Affix } from 'antd'
import Footer from "../components/Footer"
import Author from "../components/Author"
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import axios from "axios"
import MarkNav from "../components/MarkNav"
// import MarkNav from "markdown-navbar"
function Detail(props) {
    const navbarContent = new MarkNav()
    const renderer = new marked.Renderer();
    renderer.heading = function (text, level, raw) {
        const anchor = navbarContent.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };

    marked.setOptions({
        renderer: renderer,//这个是必须填写的，你可以通过自定义的Renderer渲染出自定义的格式
        gfm: true,//启动类似Github样式的Markdown,填写true或者false
        pedantic: false,//只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
        sanitize: false,//原始输出，忽略HTML标签，这个作为一个开发人员，一定要写false
        tables: true,// 支持Github形式的表格，必须打开gfm选项
        breaks: false,//支持Github换行符，必须打开gfm选项，填写true或者false
        smartLists: true,//优化列表输出，这个填写true之后，样式会好看很多，所以建议设置成true
        smartypants: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });

    let html = marked(props.data.articleContent)


    return (
        <>
            <div >
                <Head>
                    <title>Details</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
            </div>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                    <div className="bread-div">
                        <Breadcrumb>
                            <Breadcrumb.Item> <a href="/">首页</a></Breadcrumb.Item>
                            <Breadcrumb.Item> <a href="/lists">视频列表</a></Breadcrumb.Item>
                            <Breadcrumb.Item>文章详情</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div>
                        <div className="detailed-title">
                            chooopa的个人博客
                        </div>
                    </div>
                    <div className="list-icon center">
                        <span>
                            <Icon type="calender" />2021-1-14
                        </span>
                        <span>
                            <Icon type="folder" />视频教程
                        </span>
                        <span>
                            <Icon type="fire" />1000人
                        </span>
                    </div>
                    <div className="detailed-content" dangerouslySetInnerHTML={{ __html: html }}>

                    </div>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author />
                    <div className="detailed-nav comm-box">
                        <div className="nav-title">文章目录</div>
                        <Affix offsetTop={5}>
                            {/* <MarkNav className="article-menu" source={props.data.articleContent} ordered={false} /> */}
                            <div className="toc-list">
                                {navbarContent && navbarContent.render()}
                            </div>
                        </Affix>

                    </div>
                </Col>

            </Row>
            <Footer />
        </>
    )
}

Detail.getInitialProps = async (context) => {
    const promise = new Promise((resolve) => {
        console.log('context', context)
        const env = process.env.NODE_ENV
        const baseUrl = env==="development"?"http://127.0.0.1:7001/":"http://api.techgrow.top/"
        axios.get(baseUrl+"frontEnd/getArticleById/" + context.query.id).then((res) => {
            resolve(res.data)
        })
    })
    let res = await promise

    return { data: res }
}

export default Detail