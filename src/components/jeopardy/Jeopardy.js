import React, { Component } from 'react';

//import our service
import JeopardyService from "../../jeopardyService";

class Jeopardy extends Component {
  //set our initial state and set up our service as this.client on this component
  constructor(props){
    super(props);
    this.client = new JeopardyService();
    this.state = {
      data: {},
      score: 0
    }
  }

  //get a new random question from the API and add it to the data object in state
  getNewQuestion() {
    return this.client.getQuestion().then(result => {
      this.setState({
        data: result.data[0]
      })
    })
  }

  displayQuestion() {
    if (this.state.data.value !== null) {
        return (
            <div>
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
      </div>
    );
  }
}

export default Jeopardy;