import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { IStore } from '../../model'
import styled from 'styled-components'
import { Button, message } from 'antd'
const Root = styled.div`
    flex-grow:1;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    .btn-group{
        display:flex;
        align-items:center;
        justify-content:center;
        .btn{
            margin:10px;
        }
    }
`

@inject((store: IStore) => ({
    ...store.user
}))
@observer
export default class Index extends React.Component<any, any>{

    render() {
        const user = this.props
        console.log(user.userId)
        return (
            <Root>
                <div className="btn-group">
                    <Button className='btn' type='ghost' onClick={() => message.success('ccccccccccccccccccccccccccccccc')}>Hello</Button>
                    <Button className='btn' type='primary' onClick={() => message.success('ccccccccccccccccccccccccccccccc')}>Hello</Button>
                </div>
                <div className="btn-group">
                    <Button className='btn' type='dashed' onClick={() => message.success('ccccccccccccccccccccccccccccccc')}>Hello</Button>
                    <Button className='btn' type='danger' onClick={() => message.success('ccccccccccccccccccccccccccccccc')}>Hello</Button>
                </div>
            </Root>
        )
    }
}