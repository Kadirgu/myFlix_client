import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import RegisterView from '../registration-view/registration-view';
import { Form, FormGroup, Button, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';

import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        /* Send a request to the server for authentication */
        axios.post('https://git.heroku.com/gentle-reef-88518.git/login', {
            Username: username,
            Password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('no such user')
            });
    };

    return (


        <Row className="d-flex justify-content-evenly">
            <Col></Col>
            <Col xs={4} className="left_side">
                <Form className="d-flex flex-column justify-content-between align-items-center p-2 mt-4">
                    <Form.Group controlId="formUsername" className="mt-3">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mt-3">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleSubmit} className="mt-4">
                        Submit
                    </Button>
                </Form>
            </Col>

            <Col xs={6} className="right_side d-flex flex-column justify-content-center align-items-center p-2 mt-4">
                <p>Please enter your details to login into the application.</p>
                <p>If you don't have an account, please <a href="#" onClick={handleNewUser}>click here</a> to register.</p>
            </Col>
            <Col></Col>
        </Row>


    );
}

// LoginView.propTypes = {
//     user: PropTypes.exact({
//       username: PropTypes.string.isRequired,
//       password: PropTypes.string.isRequired,
//     }).isRequired,
//   };