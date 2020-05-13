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
        this.state = {
            data: {},
            categories: [],
            score: 0
        }
    }

    //get a new random question from the API and add it to the data object in state
    getQuestion = (categoryId, offsetMax = 0) => {
        if (categoryId) {
            return (
                this.client.getQuestion(categoryId, offsetMax)
                    .then(result => {
                        this.setState({
                            data: result.data[0]
                        })
                    })
            )
        }

        return this.client.getQuestion().then(result => {
            this.setState({
                data: result.data[0]
            })
        })
    }

    getCategories = () => {
        return this.client.getCategories(3)
            .then(result => {
                this.setState({
                    categories: result.data
                });
            });
    }

    //when the component mounts, get a the first question
    componentDidMount() {
        this.getCategories()
    }

    checkAnswer = (answer) => {
        if (answer.toUpperCase() === this.state.data.answer.toUpperCase()) {
            this.setState((state, props) => ({
                score: state.score + state.data.value,
                data: {}
            }));
        }
        else {
            this.setState((state, props) => ({
                score: state.score - state.data.value,
                data: {}
            }));

        }

        this.getCategories();
    }

    //display the results on the screen
    render() {
        if (this.state.data.question) {
            return (
                <div>
                    <GameBoard
                        data={this.state.data}
                        score={this.state.score}
                        checkAnswer={this.checkAnswer}
                    />

                </div>
            );
        }

        return (
            <div className="Jeopardy">
                <CategoryList
                    categories={this.state.categories}
                    getQuestion={this.getQuestion}
                />
                <GameBoard score={this.state.score} />
            </div>
        )
    }
}
export default Jeopardy;