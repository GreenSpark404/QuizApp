export type QuizItem = {
    id: string,
    name: string,
    description: string,
};

export type sessionState = {
    answersCount: number,
    correctAnswersCount: number,
    question: Question,
    questionNumber: number,
}

export type sessionDTO = {
    id: string,
    questionsCount: number,
    quizName: string,
    scoreboardMap: object,
    totalPlayers: number,
    state?: sessionState
}

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
