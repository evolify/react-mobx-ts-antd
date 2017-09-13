import UserStore from './user'
class Store {

    userStore:UserStore
    name = 'abc'

    constructor(){
        this.userStore=new UserStore()
    }
}
export default new Store()