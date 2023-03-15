import { action, makeObservable, observable, runInAction } from 'mobx';
import service from './userStore.service';

class UserStore {

    isAuth: boolean = false;

    isLoading: boolean = false;

    constructor() {
        makeObservable(this, {
            isAuth: observable,
            getAdminContent: action.bound,
        });
    }

    async getAdminContent(login: string, password: string): Promise<void> {
        const user = {
            username: login,
            password: password,
        }
        try {
            const response = await service.loadUserContent(user);
            runInAction(() => {
                this.isAuth = true;
            });
        } catch (e) {
            console.log(e)
        }
    }
}
export default new UserStore();
