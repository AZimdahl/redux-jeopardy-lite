export function getQuestion(payload){
    return {
        type : 'GET_QUESTION',
        payload
    }
}

export function getCategories(payload){
    return {
        type : 'GET_CATEGORIES',
        payload
    }
}

export function scoreAnswer(payload){
    return {
        type : 'SCORE_ANSWER',
        payload
    }
}
