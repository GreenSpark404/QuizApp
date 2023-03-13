import { action, makeObservable, observable } from 'mobx';
import service from './userStore.service';

class UserStore {

    admin = {};

    isLoading: boolean = false;

    constructor() {
        makeObservable(this, {
            admin: observable,
            getAdminContent: action.bound,
        });
    }

    async getAdminContent(login: string, password: string): Promise<void> {

        const formData = new FormData();
        formData.append('username', login);
        formData.append('password', password);
        const user = {
            username: login,
            password: password,
        }
        try {
            const userContent = service.loadUserContent(user);
        } catch (e) {
            console.log(e)
        }
    }
}
export default new UserStore();
