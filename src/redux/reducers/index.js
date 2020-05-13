import { combineReducers } from "redux";
import jeopardy from "./jeopardy";

const allReducers = combineReducers(
    {
        jeopardy
    }
);

export default allReducers;