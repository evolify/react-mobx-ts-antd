import User,{IUser} from './user'

interface IStore {
    user : IUser
}

class Store {

    userStore:IUser
    name = 'abc'

    constructor(){
        this.userStore=new User()
    }
}
export default new Store()
export {IStore,IUser}