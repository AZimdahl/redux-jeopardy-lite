const jeopardy = (
    state = {
        data: {},
        categories: [],
        score: 0
    },
    action) => {
    switch (action.type) {
        case 'GET_QUESTION':
            return Object.assign({}, state, {
                data: action.payload
            });
        case 'GET_CATEGORIES':
            return Object.assign({}, state, {
                categories: action.payload
            });
        case 'SCORE_ANSWER':
            return Object.assign({}, state, {
                score: action.payload,
                data: {}
            });


        default:
            return state;
    }
}
export default jeopardy;