import React, { useState, useEffect, useRef ,useCallback} from 'react';
import marked from 'marked'
import './AddArticle.css'
import { Row, Col, Input, Select, Button, DatePicker, message, Popconfirm } from 'antd'
import axios from 'axios'
import moment from '_moment@2.29.1@moment';
import { Prompt, Redirect } from 'react-router';

const { Option } = Select;
const { TextArea } = Input
const ArticleAdd = (props) => {
    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState() //选择的文章类别
    const datePickerRef = window.ref = useRef()
    const [nextLocation, setNextLocation] = useState("")

    const resetState = function () {

        setArticleId(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
        setArticleTitle('')   //文章标题
        setArticleContent('')  //markdown的编辑内容
        setMarkdownContent('预览内容') //html内容
        setIntroducemd()            //简介的markdown内容
        setIntroducehtml('等待编辑') //简介的html内容
        setShowDate()   //发布日期
        setUpdateDate() //修改日志的日期
        setTypeInfo([]) // 文章类别信息
        setSelectType() //选择的文章类别

    }
    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }
    const selectTypeHandler = (value, option) => {

        setSelectType(value)
    }
    const getTypeInfo = 
       useCallback(async () => {

            const res = await axios({
                method: 'get',
                url: "http://localhost:7001/backEnd/getTypeInfo",
                header: { 'Access-Control-Allow-Origin': '*' },
                withCredentials: true
            })
            if (res.data.data === "没有登录") {
    
                return () => {
                    localStorage.removeItem('openId')
                    props.history.push('/')
                }
    
    
            } else {
                setTypeInfo(res.data.data)
            }
        },[props.history])
       
     

    const saveArticle = () => {
        if (!selectedType) {
            message.error('必须选择文章类别')
            return false
        } else if (!articleTitle) {
            message.error('文章名称不能为空')
            return false
        } else if (!articleContent) {
            message.error('文章内容不能为空')
            return false
        } else if (!introducemd) {
            message.error('简介不能为空')
            return false
        } else if (!showDate) {
            message.error('发布日期不能为空')
            return false
        }
        message.success('检验通过')
        let dataProps = {}   //传递到接口的参数
        dataProps.typeId = selectedType
        dataProps.title = articleTitle
        dataProps.articleContent = articleContent
        dataProps.introduce = introducemd
        let datetext = showDate.replace('-', '/') //把字符串转换成时间戳
        dataProps.addTime = (new Date(datetext).getTime())
        //首次添加文章
        if (articleId === 0) {
            console.log('articleId=:' + articleId)
            dataProps.viewCount = Math.ceil(Math.random() * 100) + 1000
            axios({
                method: 'post',
                url: "http://localhost:7001/backEnd/addArticles",
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    setArticleId(res.data["_id"])
                    if (res.data.isScuccess) {
                        message.success('文章保存成功')
                    } else {
                        message.error('文章保存失败');
                    }

                }
            )
            //修改文章
        } else {
            console.log('articleId=:' + articleId)
            dataProps.viewCount = Math.ceil(Math.random() * 100) + 1000
            dataProps._id = articleId

            axios({
                method: 'post',
                url: "http://localhost:7001/backEnd/updateArticle",
                data: dataProps,
                withCredentials: true
            }).then(
                res => {

                    if (res.data.isScuccess) {
                        message.success('文章保存成功')
                    } else {
                        message.error('文章保存失败');
                    }

                }
            )
        }
    }
    const getArticleById = (id) => {
        axios("http://localhost:7001/backEnd/getArticleById/" + id, {
            withCredentials: true,
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            res => {
                console.log(res.data)
                setArticleTitle(res.data.data.title)
                setArticleContent(res.data.data.articleContent)
                let html = marked(res.data.data.articleContent)
                setMarkdownContent(html)
                setIntroducemd(res.data.data.introduce)
                let tmpInt = marked(res.data.data.introduce)
                setIntroducehtml(tmpInt)

                setShowDate(String.prototype.match.call(res.data.data.addTime, /[0-9-]+(?=T)/g)[0])
                setArticleId(id)
                setSelectType(res.data.data.typeId)
            }
        )
    }
    const clickBox = useRef()
    let globalBlock   = useRef()
    let unblock   = useRef()
    const blockFuc =useCallback((location, action) => {

        setNextLocation(location.pathname);
        console.log(articleTitle);
        console.log(articleContent);
        console.log(introducemd);
     
        (articleTitle||articleContent||introducemd)&&clickBox.current.click()
   

        return (articleTitle||articleContent||introducemd)
    },[articleContent, articleTitle, introducemd])
    useEffect(function () {
    
   
        if( props.match.params.id&&typeInfo.length ===0){
            getTypeInfo()
            getArticleById( props.match.params.id)
        }else{
            
        }
       
     
    
        globalBlock.current = ()=>{
            console.log("block")
            unblock.current= props.history.block(blockFuc)
        }
        globalBlock.current()

        return () => {
            unblock.current()
            unblock.current = null     
          
            console.log("unmounted")

        }
    }, [articleContent, articleTitle, blockFuc, getTypeInfo, introducemd, props.history, props.match.params.id, typeInfo.length])
    marked.setOptions({
        renderer: marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });

    return (
        <div>
            <div style={{ position: "fixed", top: 0 }}>
                <Popconfirm placement="top"
                    title="当前文档正在编辑，确认离开？"
                    onConfirm={() => { message.info('开始跳转.');unblock.current();props.history.push(nextLocation)    }}
                    onCancel ={() => { message.info('取消跳转.'); return true }} >             
                               <Button ref={clickBox} ></Button>
                </Popconfirm>

            </div>

            <Row gutter={5}>
                {/* 文章显示列 */}
                <Col span={18}>
                    <Row gutter={10} >
                        <Col span={20}>
                            <Input
                                placeholder="博客标题"
                                size="large"
                                onChange={e => {

                                    setArticleTitle(e.target.value)
                                }}
                                value={articleTitle}
                            />
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select defaultValue="Sign Up" size="large">
                                <Option value="Sign Up">视频教程</Option>
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10} >
                        <Col span={12}>
                            <TextArea
                                value={articleContent}
                                className="markdown-content"
                                rows={35}
                                onChange={changeContent}
                                onPressEnter={changeContent}
                                placeholder="文章内容"
                            />

                        </Col>
                        <Col span={12}>
                            <div
                                className="show-html"
                                dangerouslySetInnerHTML={{ __html: markdownContent }} >
                            </div>
                        </Col>
                    </Row>
                </Col>
                {/* 文章暂存列 */}
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={saveArticle} >发布文章</Button>
                            <br />
                        </Col>
                        <Col span={24}>
                            <br />
                            <TextArea
                                rows={4}
                                value={introducemd}
                                onChange={changeIntroduce}
                                onPressEnter={changeIntroduce}
                                placeholder="文章简介"
                            />
                            <div
                                className="introduce-html"
                                dangerouslySetInnerHTML={{ __html: '文章简介：' + introducehtml }} >
                            </div>
                        </Col>

                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    allowClear={false}
                                    value={moment(showDate)}
                                    ref={datePickerRef}
                                    placeholder="发布日期"
                                    size="large"
                                    onChange={(date, dateString) => {
                                        console.log(this, date, dateString)
                                        setShowDate(dateString)
                                    }}

                                />
                            </div>
                        </Col>
                        <Col span={4}>

                            <Select defaultValue={"请选择分区"} value={selectedType} size="large" onChange={selectTypeHandler} className="date-select">
                                {
                                    typeInfo.map((item, index) => {

                                        return (<Option key={index} value={item._id} title={item._id}>{item.typeName}</Option>)
                                    })
                                }


                            </Select>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div >
    );
}

export default ArticleAdd;
