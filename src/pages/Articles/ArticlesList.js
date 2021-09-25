
import React, { useState, useEffect } from 'react';
import "./ArticleList.css"
import { List, Row, Col, Modal, message, Button, Switch } from 'antd';
import axios from 'axios'
const { confirm } = Modal;
function ArticleList(props) {

    const [list, setList] = useState([])

    const getList = () => {
        axios({
            method: 'get',
            url: "http://localhost:7001/backEnd/getArticleList",
            withCredentials: true,
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            res => {
        
                setList(res.data.list)

            }
        )
    }

    const delArticle = (id) => {
        confirm({
            title: '确定要删除这篇博客文章吗?',
            content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
            onOk() {
                axios("http://localhost:7001/backEnd/delArticle/"+id, { withCredentials: true }).then(
                    res => {
                        message.success('文章删除成功')
                        getList()
                    }
                )
            },
            onCancel() {
                message.success('删除动作已撤销')
            },
        });

    }
    const updateArticle = (id,checked)=>{
        console.log(checked)
        props.history.push('/articles/update/'+id)
    
    }
    useEffect(function () {
        console.log("list")
        getList()
    }, [])
    return (
        <div className="listContainer">
            <List className="listItemContainer"
           
                header={
           
                    <Row  >
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={3}>
                            <b>类别</b>
                        </Col>
                        <Col span={3}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={3}>
                            <b>集数</b>
                        </Col>
                        <Col span={3}>
                            <b>浏览量</b>
                        </Col>

                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>
               
                }
                bordered
                split
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={3}>
                                {item.typeId.typeName}
                            </Col>
                            <Col span={3}>
                                {item.addTime.match(/[0-9-]*(?=T)/g)}
                            </Col>
                            <Col span={3}>
                                共<span>{item.partCount}</span>集
                            </Col>
                            <Col span={3}>
                                {item.viewCount}
                            </Col>

                            <Col span={4}>
                                <Button type="primary" onClick={()=>{updateArticle(item._id)}}>修改</Button>&nbsp;

                                <Button onClick={()=>{delArticle(item._id)}}>删除 </Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
            />

        </div>
    )

}


export default ArticleList;
