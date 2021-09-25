import React from 'react';
import Welcome from "../../components/Welcome"
import { Link, Switch } from "react-router-dom"
import { Layout, Menu, Breadcrumb } from 'antd';
import { PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined } from "@ant-design/icons"
import ArticleList from "../Articles/ArticlesList"
import AddArticle from "../Articles/AddArticle"

import { Route } from 'react-router-dom'
import "./index.css"
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class SiderDemo extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <PieChartOutlined />
                            <span><Link to="/articles">工作台</Link></span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <DesktopOutlined />
                            <span><Link to="/articles/add">添加文章</Link></span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={
                                <>
                                    <UserOutlined />
                                    <span>

                                       文章管理
                                    </span>
                                </>
                            }
                        >
                            <Menu.Item key="3"><Link to="/articles/add">添加文章</Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/articles/list">文章列表</Link></Menu.Item>

                        </SubMenu>

                        <Menu.Item key="9">
                            <FileOutlined />
                            <span>留言管理</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: 'rgba(0,0,0,0)', padding: 0 }} />
                    <Content style={{ background: 'rgba(255,255,255)',margin: '0 16px',padding:"0 10px" }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <Switch>
                            <Route path="/" exact component={Welcome} />
                            <Route path="/articles/list" exact component={ArticleList} />
                            <Route path="/articles/update/:id" exact component={AddArticle} />
                            <Route path="/articles/add" exact component={AddArticle} />
                          
                        </Switch>

                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default SiderDemo