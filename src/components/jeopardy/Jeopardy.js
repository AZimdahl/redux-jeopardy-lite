import React, { Component } from 'react';
import JeopardyDisplay from './JeopardyDisplay'

//import our service
import JeopardyService from "../../jeopardyService";

class Jeopardy extends Component {
  //set our initial state and set up our service as this.client on this component
  constructor(props) {
    super(props);
    this.client = new JeopardyService();
    this.state = {
      data: {},
      score: 0
    }
  }

  //get a new random question from the API and add it to the data object in state
  getNewQuestion() {
    console.clear()

    return this.client.getQuestion(1).then(result => {
      this.setState({
        data: result.data
      })

    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let newScore = this.state.score;
    let playerAnswer = event.target.answer.value;

    if (playerAnswer.toLocaleUpperCase() === this.state.data[0].answer.toLocaleUpperCase()) {
      newScore += this.state.data[0].value
    }
    else {
      newScore -= this.state.data[0].value
    }

    this.setState({
      score: newScore
    })

    event.target.answer.value = ""
    this.getNewQuestion()
  }

  displayCategory() {
    let categoryTitle = "";
    let renderArray = []

    for (let i in this.state.data) {
      if (this.state.data[i].value !== null) {
        if (this.state.data[i].category != null) {
          categoryTitle = this.state.data[i].category.title
          categoryTitle = categoryTitle.toLocaleUpperCase();
          console.log(this.state.data[i].answer)
        }
        renderArray.push(
          <div key={i}>
            <h1>CATEGORY: '{categoryTitle}'</h1>
            <h2>Question: {this.state.data[0].question}</h2>
            <p>Point Value: {this.state.data[0].value}</p>
          </div>
        )
      }
      else {
        this.getNewQuestion()
      }
    }
    return (renderArray)
  }

  // displayQuestion() {
  //   let categoryTitle = "";
  //   if (this.state.data[0] != undefined) {
  //     categoryTitle = this.state.data[0].category.title
  //     categoryTitle = categoryTitle.toLocaleUpperCase();
  //   }

  //   console.log (this.state.data)
  //   // return (
  //   //   <div>
  //   //     <h1>CATEGORY: '{categoryTitle}'</h1>
  //   //     <h2>Question: {this.state.data[0].question}</h2>
  //   //     <p>Point Value: {this.state.data[0].value}</p>
  //   //   </div>
  //   // )
  // }

  //when the component mounts, get a the first question
  componentDidMount() {
    this.getNewQuestion();
  }

  //display the results on the screen
  render() {
    let categoryDisplay = this.displayCategory()
    let question = []

    return (
      <div>
        <JeopardyDisplay
          categoryDisplay={categoryDisplay}
          question={question}
          score={this.state.score}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default Jeopardy;