import React from 'react';
import Button from 'react-bootstrap/Button';

class Smile extends React.Component {


    render() {
        return(
            <>
                <Button onClick={this.props.handleClick}>Smiley face</Button>
            </>
        );
    }
}

export default Smile;