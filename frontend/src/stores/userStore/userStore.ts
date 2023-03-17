import { action, makeObservable, observable, runInAction } from 'mobx';
import service from './userStore.service';

class UserStore {

    isAuth: boolean = false;

    isLoading: boolean = false;

    constructor() {
        makeObservable(this, {
            isAuth: observable,
            getAdminContent: action.bound,
            logout: action.bound,
        });
    }

    async getAdminContent(login: string, password: string): Promise<void> {
        const user = {
            username: login,
            password: password,
        }
        try {
            await service.loadUserContent(user);
            runInAction(() => {
                this.isAuth = true;
            });
        } catch (e) {
            console.log(e)
        }
    }

    async logout(): Promise<void> {
        document.cookie = "JWT_AUTH_TOKEN"+'=; Max-Age=-99999999;';
        this.isAuth = false;
    }
}
export default new UserStore();
