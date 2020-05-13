import React from "react"

import AnswerForm from "./AnswerForm"

function GameBoard(props) {
    const score = (
        <div className="score">
            Your winnings: ${props.score}
        </div>
    )


    if (props.data) {
        const category = (props.data.category && props.data.category.title)

        return (
            <div className="GameBoard">
                <h2>{category}</h2>
                <h3>${props.data.value}</h3>
                <div className="clue">
                    {props.data.question}
                </div>
                <AnswerForm checkAnswer={props.checkAnswer} />
                <div>{score}</div>
            </div>
        )
    }
    return (
        score
    )
}

export default GameBoard