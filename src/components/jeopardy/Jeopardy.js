import React, { Component } from 'react';

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
    let regex = /[\W\d\s:]/g; //list of nonAlphanumeric characters

    return this.client.getQuestion().then(result => {
      let regTest = regex.test(result.data[0].answer) //checking answer for the regex
      if (!regTest) {
        this.setState({
          data: result.data[0]
        })
      }
      else {
        this.getNewQuestion();
      }
    })
  }

  handleSubmit= (event) => {
    event.preventDefault()
    let newScore = this.state.score;
    let playerAnswer = event.target.answer.value;

    if (playerAnswer.toLocaleUpperCase() === this.state.data.answer.toLocaleUpperCase()) {
      newScore += this.state.data.value
    }
    else {
      newScore -= this.state.data.value
    }

    this.setState({
      score: newScore
    })
    
    event.target.answer.value = ""
    this.getNewQuestion()
  }

  displayQuestion() {
    let categoryTitle = "";
   

    if (this.state.data.value !== null) {
        if (this.state.data.category != null) {
          categoryTitle = this.state.data.category.title
          categoryTitle = categoryTitle.toLocaleUpperCase();
          console.log(this.state.data.answer)
        }
        return (
          <div>
            <h1>CATEGORY: '{categoryTitle}'</h1>
            <h2>Question: {this.state.data.question}</h2>
            <p>Point Value: {this.state.data.value}</p>
          </div>
        )
    }
    else {
      this.getNewQuestion()
    }
  }

  //when the component mounts, get a the first question
  componentDidMount() {
    this.getNewQuestion();
  }

  //display the results on the screen
  render() {
    return (
      <div>
        {this.displayQuestion()}
        <hr />
        <p>Score: {this.state.score}</p>
        <form onSubmit={this.handleSubmit}>
          <input name="answer" type="text" />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Jeopardy;