import { connect } from "react-redux";
import Jeopardy from "../../components/jeopardy/Jeopardy";
import { getQuestion, getCategories, scoreAnswer } from "../actions"

const mapStateToProps = state => {
    return {
        data: state.jeopardy.data,
        categories: state.jeopardy.categories,
        score: state.jeopardy.score
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getQuestion: (payload) => dispatch(getQuestion(payload)),
        getCategories: (payload) => dispatch(getCategories(payload)),
        scoreAnswer: (payload) => dispatch(scoreAnswer(payload))
    }
};

const JeopardyContainer = connect(mapStateToProps, mapDispatchToProps)(Jeopardy);
export default JeopardyContainer;