import React, { useState } from 'react';
import {Form, Button, Card, Container, Col, Row, CardGroup} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

import './login-view.scss';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');

    const validate = () => {
        let isReq = true;
        if(!username){
            setUsernameErr('Username required');
            isReq = false;
        } else if(username.length < 5){
            setUsernameErr('Username must be at least 5 characters long');
            isReq = false;
        }
      
        if(!password){
            setPasswordErr('Password Required');
            isReq = false;
        } else if(password.length < 6){
            setPasswordErr('Password must be at least 6 characters long');
            isReq = false;
        }

        return isReq;
    }

    //Requests server for authentication
    //then calls props.onLoggedIn(username)
    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();

        if(isReq) {
            axios.post('https://gentle-reef-88518.herokuapp.com/login', {
                Username: username,
                Password: password
            })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                alert("That did not work. Please try again.")
                console.log('no such user')
            });
        }
    };

    return (
        <Container className="login-form">
            <Form className="login-form bg-col lining">
                <Form.Group className="mb-4" controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                    {/* code added here to display validation error */}
                    {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>

                <Form.Group className="mb-5" controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    {/* code added here to display validation error */}
                    {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>
                <Button type="submit" onClick={handleSubmit}>
                    Log In
                </Button>
            </Form>
        </Container>
    )
}

LoginView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { setUser })(LoginView);