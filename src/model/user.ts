import {observable,action} from 'mobx'

export interface IUser {
    userId:string
    userName:string
}

export default class User {

    @observable userId:string
    @observable userName:string

    constructor(){
        this.userId="0000"
        this.userName="evolify"
        this.login()
    }

    @action login(){
        setTimeout(()=>{
            this.userName="Evolify"
        },1500)
    }
}