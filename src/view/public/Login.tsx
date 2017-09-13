import React from 'react'
import {Input,Button} from 'antd'
import styled from 'styled-components'

const Root=styled.div`
    display:flex;
    flex-direction:column;
    .title{
        width:100%;
        text-align:center;
        font-size:16px;
        padding:5px;
    }
    .content{
        display:flex;
        flex-direction:column;
        align-items:center;
        padding:10px 20px;
        .item{
            display:flex;
            flex-direction:row;
            align-items:center;
            margin:10px;
            .label{
                width:75px;
            }
            .value{
                flex-grow:1;
                min-width:200px;
                .ant-input{
                    background-color:rgba(255,255,255,.3);
                }
            }
        }
    }
    .footer{
        display:flex;
        flex-direction:row;
        justify-content:center;
        .btn{
            margin:10px;
        }
    }
`

export default class Login extends React.Component<any,any>{


    onSubmit(){
        this.onCancel()
    }
    onCancel(){
        const {onClose}=this.props
        onClose()
    }

    render(){
        return(
            <Root>
                <span className="title">登录</span>
                <div className="content">
                    <div className="item">
                        <span className="label">用户名：</span>
                        <Input className="value"/>
                    </div>
                    <div className="item">
                        <span className="label">密码：</span>
                        <Input className="value"/>
                    </div>
                    <div className="item">
                        <span className="label">验证码：</span>
                        <Input className="value"/>
                    </div>
                </div>
                <div className="footer">
                    <Button className="btn" onClick={this.onSubmit.bind(this)}>确认</Button>
                    <Button className="btn" type='danger' onClick={this.onCancel.bind(this)}>取消</Button>
                </div>
            </Root>
        )
    }
}