import React from 'react';
import Smile from './Smile/Smile';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text : props.text+', i love you <3'
        }
    }

    render() {
        return(
            <>
                <div>{this.state.text}</div>
                <Smile />
            </>
        );
    }
}

export default App;
