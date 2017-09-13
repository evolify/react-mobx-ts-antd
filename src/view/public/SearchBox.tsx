import React from 'react'
import styled from 'styled-components'
import {Icon} from 'antd'
const Root=styled.div`
    min-width:150px;
    height:30px;
    border-radius:15px;
    background:#eee;
    display:flex;
    align-items:center;
    justify-content:center;
    transition:.2s all;
    cursor:pointer;
    &.focus{
        background:#ddd;
        outline:none;
        .text-input{
            width:200px;
        }
        &>.label{
            opacity:.7;
        }
    }
    &>.label{
        padding:5px;
        transition:.2s all;
    }
    .text-input{
        line-height:25px;
        width:0;
        box-sizing:border-box;
        background:transparent;
        transition:all .2s;
        &,&:focus{
            outline:none;
            border:none;
        }
    }
`;
export default class SearchBox extends React.Component{
    
    state={
        focus:false
    }
    
    textInput:any

    componentDidMount(){
    }

    render(){
        return(
            <Root className={this.state.focus ?'focus' :''} onFocus={()=>this.textInput.focus()} tabIndex={100}>
                <span className='label'>
                    <Icon style={{marginRight:2}} type='search'/>
                    搜索
                </span>
                <input ref={input=>this.textInput=input} type="text" className="text-input"
                    onFocus={()=>this.setState({focus:true})}
                    onBlur={()=>this.setState({focus:false})} />
            </Root>
        )
    }
}