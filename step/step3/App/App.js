import React from 'react';
import Smile from './Smile/Smile';
import SmileModal from './Smile/SmileModal';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text : props.text+', i love you <3',
            show : false
        }
    }

    handleClick() {
        this.setState({show:true});
    }

    handleHide() {
        this.setState({show:false});
    }

    render() {
        return(
            <>
                <div>{this.state.text}</div>
                <Smile handleClick={this.handleClick.bind(this)}/>
                <SmileModal show={this.state.show} Hide={this.handleHide.bind(this)}/>
            </>
        );
    }
}

export default App;
