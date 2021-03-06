import React from 'react';
import Smile from './Smile/Smile';
import SmileModal from './Smile/SmileModal';
import SmileTable from './Smile/SmileTable';
import { BrowserRouter as Router, Route, NavLink, Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

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
            <Router>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href='/Smile'>Speedrun Any%</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav>
                            <Nav.Link href="/Smile">Smile</Nav.Link>
                            <Nav.Link href="/SmileTable">SmileTable</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className='Content'>
                    <Route exact path="/" component={Smile} />
                    <Route exact path="/Smile" component={Smile} />
                    <Route exact path="/SmileTable" component={SmileTable} />
                    <div>{this.state.text}</div>
                    <SmileModal show={this.state.show} Hide={this.handleHide.bind(this)}/>
                </div>
            </Router>
                
        );
    }
}

export default App;
