import { makeObservable, observable } from 'mobx';

class AuthStore {

    isAuth: boolean = false;

    isLoading: boolean = false;

    constructor() {
        makeObservable(this, {
            isAuth: observable,
        });
    }
}
export default new AuthStore();
