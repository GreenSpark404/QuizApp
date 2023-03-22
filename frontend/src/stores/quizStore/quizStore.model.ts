export type QuizItem = {
    id: string,
    name: string,
    description: string,
};

export type Question = {
    questionText: string,
    correctAnswer: string,
    answers: Array<string>,
};

export type QuizFullItem = {
    name: string,
    description: string,
    questionList: Array<Question>
};

export type StartedSession = {
    id: string,
    quizName: string,
}
