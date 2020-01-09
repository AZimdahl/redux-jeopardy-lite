import React from 'react';

function JeopardyDisplay(props) {
    let display = ""
    display = props.categoryDisplay;
    let clicked = true;

    if (clicked) {
        display = (<div>
            {props.question}
            <hr />
            <p>Score: {props.score}</p>
            <form onSubmit={props.handleSubmit}>
                <select>
                    <option>What is/are</option>
                    <option>Who is/are</option>
                    <option>When was</option>
                    <option>Where is</option>
                </select>
                <input name="answer" type="text" />
                <button>Submit</button>
            </form>
        </div>)
    }
    return (
        <div>
            {display}
        </div>
    )
}

export default JeopardyDisplay;