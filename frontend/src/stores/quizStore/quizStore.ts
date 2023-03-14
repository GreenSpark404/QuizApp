import { action, makeObservable, observable, runInAction } from 'mobx';
import service from './quizStore.service';

class QuizStore {

    //isAuth: boolean = false;

    isLoading: boolean = false;

    constructor() {
        makeObservable(this, {
            //isAuth: observable,
            getQuizList: action.bound,
        });
    }

    async getQuizList(): Promise<void> {
        try {
            const quizList = await service.loadQuizList();
            console.log(quizList);
            runInAction(() => {

            });
        } catch (e) {
            console.log(e)
        }
    }
}
export default new QuizStore();
