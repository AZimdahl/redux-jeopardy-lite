import React, { Component } from 'react';

//import our service
import JeopardyService from "../../jeopardyService";

import GameBoard from "./GameBoard"
import CategoryList from "./CategoryList"

class Jeopardy extends Component {
    //set our initial state and set up our service as this.client on this component
    constructor(props) {
        super(props);
        this.client = new JeopardyService();
    }

    //get a new random question from the API and add it to the data object in state
    getQuestion = (categoryId, offsetMax = 0) => {
        if (categoryId) {
            return (
                this.client.getQuestion(categoryId, offsetMax)
                    .then(result => {
                        this.props.getQuestion(result.data[0])
                    })
            )
        }

        return this.client.getQuestion().then(result => {
            this.props.getQuestion(result.data[0])
        })
    }

    getCategories = () => {
        return this.client.getCategories(3)
            .then(result => {
                this.props.getCategories(result.data)
            });
    }

    //when the component mounts, get a the first question
    componentDidMount() {
        this.getCategories()
    }

    checkAnswer = (answer) => {
        if (answer.toUpperCase() === this.props.data.answer.toUpperCase()) {
            this.props.scoreAnswer(
                this.props.score + this.props.data.value,
            )

        }
        else {
            this.props.scoreAnswer(
                this.props.score - this.props.data.value,
            )
        }

        this.getCategories();
    }


    //display the results on the screen
    render() {
        if (this.props.data && this.props.data.question) {
            return (
                <div>
                    <GameBoard
                        data={this.props.data}
                        score={this.props.score}
                        checkAnswer={this.checkAnswer}
                    />

                </div>
            );
        }

        return (
            <div className="Jeopardy">
                <CategoryList
                    categories={this.props.categories}
                    getQuestion={this.getQuestion}
                />
                <GameBoard score={this.props.score} />
            </div>
        )
    }
}
export default Jeopardy;