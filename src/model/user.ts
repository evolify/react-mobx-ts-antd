import {observable,action} from 'mobx'
export default class UserStore {

    @observable userId:string
    @observable userName:string

    constructor(){
        this.userId="0000"
    }

    @action login(){

    }
}