import React from 'react';
import Smile from './Smile/Smile';
import SmileModal from './Smile/SmileModal';
import SmileTable from './Smile/SmileTable';
import { BrowserRouter as Router, Route, NavLink, Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Lifecycle from './Lifecycle/Lifecycle';

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
                    <Navbar.Brand as={Link} to='/'>Speedrun Any%</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav>
                            <Nav.Link as={Link} to="/Smile">Smile</Nav.Link>
                            <Nav.Link as={Link} to="/SmileTable">SmileTable</Nav.Link>
                            <Nav.Link as={Link} to='/Lifecycle'>Lifecycle</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className='Content'>
                    <Route exact path="/" component={()=>{return <Smile handleClick={this.handleClick.bind(this)} />}} />
                    <Route exact path="/Smile" component={()=>{return <Smile handleClick={this.handleClick.bind(this)} />}} />
                    <Route exact path="/SmileTable" component={SmileTable} />
                    <Route exact path="/Lifecycle" component={Lifecycle} />
                    <SmileModal show={this.state.show} Hide={this.handleHide.bind(this)}/>
                </div>
            </Router>
                
        );
    }
}

export default App;
