import React from 'react';

function Welcome(props) {
    return (
        <div>
            <h1>Hello, {props.match.params.name || props.name}!</h1>
        </div>
    )
}

export default Welcome;