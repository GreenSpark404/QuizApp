import { action, makeObservable, observable, runInAction } from 'mobx';
import service from './quizStore.service';
import { QuizItem } from './quizStore.model';

class QuizStore {

    quizList: Array<QuizItem> = [];

    idSession: string = '';

    isLoading: boolean = false;

    constructor() {
        makeObservable(this, {
            quizList: observable,
            idSession: observable,
            getQuizList: action.bound,
            startSession: action.bound,
        });
    }

    async getQuizList(): Promise<void> {
        try {
            const quizList = await service.loadQuizList();
            runInAction(() => {
                this.quizList = quizList;
            });
        } catch (e) {
            console.log(e)
        }
    }

    async startSession(quizId: string): Promise<void> {
        try {
            const idSession = await service.startSession(quizId);
            runInAction(() => {
                this.idSession = idSession;
            });
        } catch (e) {
            console.log(e)
        }
    }

    async regPlayer(sessionId: string, name: string): Promise<void> {
        const player = {
            name: name
        }
        try {
            const data = await service.regPlayer(sessionId, player);
            console.log(data);
            // runInAction(() => {
            //     this.idSession = idSession;
            // });
        } catch (e) {
            console.log(e)
        }
    }
}
export default new QuizStore();
