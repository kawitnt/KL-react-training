import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Tictac from './Tictac/Tictac';
import DragandDropFile from './DragandDropFile/DragandDropFile';
import Chart from './Chart/Chart';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Home from './Home/Home';
import DataTable from './DataTable/DataTable';
import CreateTable from './CreateTable/CreateTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class App extends React.Component {

    render() {
        return (
            <Router>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand as={NavLink} to="/">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/Tictac">Tictactoe</Nav.Link>
                            <Nav.Link as={NavLink} to="/DataTable">DataTable</Nav.Link>
                            <Nav.Link as={NavLink} to="/DragandDropFile">DragandDropFile</Nav.Link>
                            <Nav.Link as={NavLink} to="/Chart">Chart</Nav.Link>
                            <Nav.Link as={NavLink} to='/CreateTable'>CreateTable</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className='Content'>
                    <Route exact path="/" component={Home} />
                    <Route path="/Tictac" component={Tictac} />
                    <Route path="/DataTable" component={DataTable} />
                    <Route path="/DragandDropFile" component={DragandDropFile} />
                    <Route path="/Chart" component={Chart} />
                    <Route path="/CreateTable" component={CreateTable} />
                </div>
            </Router>
        );
    }
}

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Account:'',
            Password:'',
            checkstate:null
        }
    }

    handleAccount(e) {
        //console.log(e.target.value);
        this.setState({Account:e.target.value});
        setTimeout(()=>{console.log(this.state.Account)},2);
    }

    handlePassword(e) {
        this.setState({Password:e.target.value});
        setTimeout(()=>{console.log(this.state.Password)},2);
    }

    Login() {
        console.log(this.state.Password)
        axios.post('http://localhost:8080/Login',{
            Account:this.state.Account,
            Password:this.state.Password
        })
        .then((res)=>{
            //alert('Success')
            ReactDOM.render(<App />, document.getElementById('root'));
        })
        .catch((e)=>{console.log(e)});
    }

    render() {
        return (
            <>
                <div id='Login-div'>
                    <Form>
                        <Form.Group>
                            <Form.Label>Login</Form.Label>
                            <Form.Control placeholder="Account" name='Account' id='Account' onChange={this.handleAccount.bind(this)}/>
                            <Form.Control placeholder="Password" name='Password' id='Password' onChange={this.handlePassword.bind(this)}/>
                            <Form.Text className="text-muted">
                                forgot password?
                            </Form.Text>
                            <Button onClick={this.Login.bind(this)}>Login</Button>
                            {this.state.checkstate && <div>eieiza</div>}
                        </Form.Group>
                    </Form>
                </div>
            </>
        );
    }
}

axios.post('http://localhost:8080/checkSession')
.then((res)=>{
    console.log(res)
    if (res.data==='Success'){
        ReactDOM.render(<App/>, document.getElementById('root'));
    }
    else {
        ReactDOM.render(<Login />, document.getElementById('root'));
        //ReactDOM.render(<App/>, document.getElementById('root'));
    }
})
.catch(()=>{

})