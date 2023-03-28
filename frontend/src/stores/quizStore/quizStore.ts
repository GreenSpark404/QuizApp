import { action, makeObservable, observable, runInAction } from 'mobx';
import service from './quizStore.service';
import { QuizFullItem, QuizItem, StartedSession, sessionDTO } from './quizStore.model';

class QuizStore {

    quizList: Array<QuizItem> = [];

    idSession: string = '';

    startedSessions: Array<StartedSession> = [];

    isLoading: boolean = false;

    sessionDTO: sessionDTO = {
        id: '',
        questionsCount: 0,
        quizName: '',
        scoreboardMap: {},
        totalPlayers: 0,
    };

    constructor() {
        makeObservable(this, {
            quizList: observable,
            idSession: observable,
            startedSessions: observable,
            isLoading: observable,
            getQuizList: action.bound,
            getSessionList: action.bound,
            startSession: action.bound,
            destroySession: action.bound,
            deleteQuiz: action.bound,
            getCurrentSessionQuiz: action.bound,
            sessionDTO: observable,
        });
    }

    async getQuizList(): Promise<void> {
        this.isLoading = true;
        try {
            const quizList = await service.loadQuizList();
            runInAction(() => {
                this.quizList = quizList;
            });
        } catch (e) {
            console.log(e)
        } finally {
            this.isLoading = false;
        }
    }

    async getSessionList(): Promise<void> {
        this.isLoading = true;
        try {
            const sessionList = await service.loadSessionList();
            runInAction(() => {
                this.startedSessions = sessionList;
            });
        } catch (e) {
            console.log(e)
        } finally {
            this.isLoading = false;
        }
    }

    async destroySession(sessionId: string): Promise<void> {
        try {
            await service.destroySession(sessionId);
        } catch (e) {
            console.log(e)
        }
    }

    async startSession(quiz: QuizItem): Promise<void> {
        try {
            const idSession = await service.startSession(quiz.id);
            if (!!idSession) {
                runInAction(() => {
                    this.idSession = idSession;
                });
            }
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

    async addQuiz(quiz: QuizFullItem): Promise<void> {
        try {
            service.addQuiz(quiz);
        } catch (e) {
            console.log(e)
        }
    }

    async deleteQuiz(quizId: string): Promise<void> {
        try {
            await service.deleteQuiz(quizId);
            this.getQuizList();
        } catch (e) {
            console.log(e)
        }
    }

    async getCurrentSessionQuiz(sessionId: string): Promise<void> {
        try {
            const sessionDTO = await service.getCurrentSessionQuiz(sessionId);
            runInAction(() => {
                this.sessionDTO = sessionDTO;
            })
        } catch (e) {
            console.log(e)
        }
    }

}
export default new QuizStore();
