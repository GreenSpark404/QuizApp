import {action, makeObservable, observable, runInAction} from 'mobx';
import service from "./authStore.service";
import axios, { AxiosResponse } from 'axios';
import authStore from './authStore'

const responseInterceptorErrorCallback = async (error: any): Promise<any> => {

    const isUnauthorized: boolean = error.response.status === 401;

    if (isUnauthorized) {
        console.log('Interceptor logout');
        await authStore.logout()
        return Promise.reject(error);
    }
    return Promise.reject(error);
};

const responseInterceptorCallback = (response: AxiosResponse) => {
    return response;
};

class AuthStore {

    isAuth: boolean = false;

    isLoading: boolean = false;

    constructor() {
        makeObservable(this, {
            isAuth: observable,
            login: action.bound,
            logout: action.bound,
        });
        axios.interceptors.response.use(
            responseInterceptorCallback,
            responseInterceptorErrorCallback,
        );
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
        runInAction(() => {
            this.isAuth = false;
        });
    }
}
export default new AuthStore();
