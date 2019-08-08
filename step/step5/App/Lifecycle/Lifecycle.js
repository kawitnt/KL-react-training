import React from 'react';

class Lifecycle extends React.Component {

    componentWillMount(){
        //document.getElementById('Life').innerHTML = '<div>WillMount naja</div>';
        alert('WillMount naja');
    }

    componentDidMount(){
        document.getElementById('Life').innerText = 'DidMount naja';
    }

    componentWillUnmount(){
        alert('Unmount naja');
    }


    render() {
        return(
            <>
                <div id='Life'> </div>
            </>
        );
    }
}

export default Lifecycle;