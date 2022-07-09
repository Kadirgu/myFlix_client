import React, { useState } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import { useState } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./login-view.scss";

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // Declare hook for each input
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    // Validate user inputs
    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (username.length < 2) {
            setUsernameErr('Username must be at least 5 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 6) {
            setPasswordErr('Password must be at least 6 characters long');
            isReq = false;
        }
        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
        /* Send a request to the server for authentication */
        axios
            .post("http://gentle-reef-88518.herokuapp.com/login", {
                Username: username,
                Password: password,
            })
            .then((response) => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch((e) => {
                alert('This user does not exist');
                console.log("no such user");
            });
        }
    };

    return (
        <Row className='d-flex justify-content-evenly'>
            <Col></Col>
            <Col xs={4} className='left_side'>
                <Form className='d-flex flex-column justify-content-between align-items-center p-2 mt-4'>
                    <Form.Group controlId='formUsername' className='mt-3'>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type='text'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='formPassword' className='mt-3'>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button
                        variant='primary'
                        type='submit'
                        onClick={handleSubmit}
                        className='mt-4'
                    >
                        Submit
                    </Button>
                </Form>
            </Col>

            <Col
                xs={6}
                className='right_side d-flex flex-column justify-content-center align-items-center p-2 mt-4'
            >
                <p>Please enter your details to login into the application.</p>
                <p>
                    If you don't have an account, please{" "}
                    <Link to={"/register"}> click here </Link> to register.
                </p>
            </Col>
            <Col></Col>
        </Row>
    );
}
LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
};

