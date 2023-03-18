import {action, makeObservable, observable, runInAction} from 'mobx';
import service from "./authStore.service";

class AuthStore {

    isAuth: boolean = false;

    isLoading: boolean = false;

    constructor() {
        makeObservable(this, {
            isAuth: observable,
            login: action.bound,
            logout: action.bound,
        });
    }

    async login(login: string, password: string): Promise<void> {
        const user = {
            username: login,
            password: password,
        }
        try {
            await service.login(user);
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
export default new AuthStore();
