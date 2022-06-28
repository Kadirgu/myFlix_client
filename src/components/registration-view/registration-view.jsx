import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

export function RegisterView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [values, setValues] = useState({
        usernameErr: '',
        passwordErr: '',
        emailErr: '',
    });


    // validate user inputs
    const validate = () => {
        let isReq = true;
        if (!username) {
            setValues({ ...values, usernameErr: 'Username required' });
            isReq = false;
        } else if (username.length < 2) {
            setValues({ ...values, usernameErr: 'Username must be at least 2 characters long' });
            isReq = false;
        }
        if (!password) {
            setValues({ ...values, passwordErr: 'Password required' });
            isReq = false;
        } else if (password.length < 6) {
            setValues({ ...values, passwordErr: 'Password must be at least 6 characters long' });
            isReq = false;
        }
        if (!email) {
            setValues({ ...values, emailErr: 'Email required' });
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setValues({ ...values, emailErr: 'Enter valid email' });
            isReq = false;
        }
        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            axios.post('https://gentle-reef-88518.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday,
                FavoriteMovies: []
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    alert('Registration successful, please login.');
                    window.open('/', '_self');
                })
                .catch(e => {
                    console.log('Error');
                    alert('Unable to register');
                });
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                minLength="8"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                            />
                        </Form.Group>
                        <Button type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>

    );
}

RegisterView.propTypes = {
    user: PropTypes.exact({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired
    }).isRequired,
};