import * as React from 'react'
import {inject} from 'mobx-react'
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { EvUI, ActionTag, Dialog } from 'ev-ui'
import { Layout, Menu, Icon } from 'antd'
import styled from 'styled-components'

import User from '../model/user'

import IndexView from './index/Index'
import UserView from './user/User'
import GoodsView from './goods/Goods'
import CategoryView from './category/Category'
import OrderView from './order/Order'

import SearchBox from './public/SearchBox'
import Login from './public/Login'
const { Header, Footer, Sider, Content } = Layout
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

const Root = styled(EvUI) `
    .ant-layout{
        .ant-layout-sider{
            background:#fff;
            color:#000;
            box-shadow:1px 0 20px -5px gray;
            .ant-menu,.ant-layout-sider-trigger{
                background:transparent;
                color:#000;
            }
            .ant-menu{
                .ant-menu-item{
                    font-size:16px;
                    height:50px;
                    line-height:50px;
                    &.ant-menu-item-selected{
                        background:#009988;
                        a{
                            color:#fff;
                        }
                    }
                }
            }
            .logo{
                height: 168px;
                border-radius: 6px;
                margin: 16px;
                transition:all .5s;
                overflow:hidden;
                text-align:center;
                img{
                    border-radius:50%;
                    max-width:100px;
                    max-height:100px;
                    width:100%;
                    height:100%;
                    margin-top:50%;
                    transform:translateY(-50%);
                }
            }
            &.ant-layout-sider-collapsed{
                .ant-menu.ant-menu-sub{
                    background:#333;
                }
                .logo{
                    height:32px;
                }
            }
            .ant-layout-sider-collapsed .anticon {
                font-size: 16px;
                margin-left: 8px;
            }
            
            .ant-layout-sider-collapsed .nav-text {
                display: none;
            }
            
            .ant-layout-sider-collapsed .ant-menu-submenu-vertical > .ant-menu-submenu-title:after {
                display: none;
            }
        }
        
        &>.ant-layout{
            overflow:auto;
            background:transparent;
            .ant-layout-header{
                display:flex;
                align-items:center;
                background-color:#fff;
                box-shadow:0 1px 10px -4px gray;
                line-height:normal;
                .placeholder{
                    flex-grow:1;
                }
                .user-info{
                    .user,.group{
                        padding:0 5px;
                    }
                }
            }
            .main-content{
                margin:10px;
                background: transparent;
                display:flex;
                flex-direction:column;
            }
        }
    }
`
    
interface AppProps {
    name: string
    user ?:User
}

type IRoute = {
    path: string,
    exact?: boolean,
    name: string,
    icon?: string,
    comp?: any,
    subRoutes?: Array<IRoute>
}

const routes:Array<IRoute> = [
    {
        path: '/',
        exact: true,
        name: '主页',
        icon: 'home',
        comp: () => <IndexView />
    },
    {
        path: '/order',
        name: '订单管理',
        icon: 'exception',
        comp: () => <OrderView />
    },
    {
        path: '/goods',
        name: '商品管理',
        icon: 'database',
        comp: () => <GoodsView />
    },
    {
        path: '/category',
        name: '分类管理',
        icon: 'appstore-o',
        comp: () => <CategoryView />
    },
    {
        path: '/user',
        name: '个人中心',
        icon: 'user',
        comp: () => <UserView />
    }
];

@inject(store=>({
    user:store.user
}))
class App extends React.Component<AppProps, {}> {

    state = {
        collapsed: false,
        mode: 'inline',
        winHeight: 0,
        selectedMenuKey: 0
    }
    onCollapse(collapsed: boolean) {
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    }
    onLogout(){
        Dialog.show(Login)
    }
    componentDidMount() {
        this.activeMenu()
        this.resizeWindow()
        window.addEventListener('resize', this.resizeWindow.bind(this))
    }
    resizeWindow() {
        this.setState({
            winHeight: document.body.clientHeight
        })
    }
    activeMenu() {
        routes.forEach((r, i) => {
            if (new RegExp(r.path).test(window.location.hash)) {
                if (i > 0) {
                    this.setState({
                        selectedMenuKey: i
                    })
                }
            }
        })
    }


    render() {
        return (
            <Router>
                <Root>
                    <Layout style={{height:this.state.winHeight}}>
                        <Sider style={{minHeight:this.state.winHeight}} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse.bind(this)}>
                            <div className="logo" >
                                <img src={require('../res/img/ev.jpg')} alt="" />
                            </div>
                            <Menu theme="light" mode={this.state.collapsed ?'vertical' :'inline'} defaultSelectedKeys={[this.state.selectedMenuKey + '']}>
                                {
                                    routes.map((route, index) => {
                                        if (route.subRoutes) {
                                            return (
                                                <SubMenu key={index} title={<span><Icon type={route.icon || ''} /><span className="nav-text">{route.name}</span></span>}>
                                                    {
                                                        route.subRoutes.map((subRoute, subIndex) => (
                                                            <MenuItem key={index + '-' + subIndex}>
                                                                <Link to={route.path + subRoute.path}>{subRoute.name}</Link>
                                                            </MenuItem>
                                                        ))
                                                    }
                                                </SubMenu>
                                            )
                                        } else {
                                            return (
                                                <MenuItem key={index}>
                                                    <Link to={route.path}>
                                                        <Icon type={route.icon || ''} />
                                                        <span className="nav-text">{route.name}</span>
                                                    </Link>
                                                </MenuItem>
                                            )
                                        }
                                    })
                                }
                            </Menu>
                        </Sider>
                        <Layout>
                            <Header className='header'>
                                <SearchBox />
                                <div className="placeholder"></div>
                                <div className="user-info">
                                    <span className="user">{this.props.user ?this.props.user.userName:''}</span>
                                </div>
                                <ActionTag iconField={<Icon type='logout' />} textField='退出' onClick={this.onLogout.bind(this)} />
                            </Header>
                            <Content className="main-content">
                                {
                                    routes.map((route:IRoute, index) => {
                                        if (route.subRoutes) {
                                            return (
                                                <Switch key={index}>
                                                    {
                                                        route.subRoutes.map((subRoute, subIndex) => (
                                                            <Route key={index + '-' + subIndex} exact={subRoute.exact} path={route.path + subRoute.path} component={subRoute.comp} />
                                                        ))
                                                    }
                                                </Switch>
                                            )
                                        } else {
                                            return (
                                                <Route key={index} exact={route.exact} path={route.path} component={route.comp} />
                                            )
                                        }
                                    })
                                }
                            </Content>
                            <Footer style={{ textAlign: 'center', padding: "0 0 10px" }}>
                                Dyoon PLM Client ©2017 Created by dyoon
                            </Footer>
                        </Layout>
                    </Layout>
                </Root>
            </Router>
        )
    }
}

export default App;
