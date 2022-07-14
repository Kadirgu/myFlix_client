import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Card, Container, Col, Row, CardGroup } from 'react-bootstrap';
import './registration-view.scss'

export function RegistrationView() {

    const [ username, setUsername] = useState('');
        const [ password, setPassword] = useState('');
        const [ email, setEmail] = useState('');
        const [ birthday, setBirthday] = useState('');
        const [ values, setValues] = useState({
        usernameErr: '',
        passwordErr: '',
        emailErr: '',
        });

    const validate =() => {
        let isReq = true;
        if (!username) {
            setValues({...values, usernameErr: 'Username required'});
            isReq = false;
        } else if (username.length < 5) {
            setValues({...values, usernameErr: 'Username must be at least 5 characters long'});
            isReq= false;
        }
        if (!password) {
            setValues({...values, passwordErr: 'Password required'});
            isReq = false;
        } else if (password.match(/[^0-9a-z]/i)) {
            setValues({...values, passwordErr: 'Password may only contain letters and digits'});
            isReq= false;
        }
        if (!email) {
            setValues({...values, emailErr: 'Email required'});
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setValues({...values, emailErr: 'Enter valid email'});
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
                Birthday: birthday
            })
            .then(response => {
                const data = response.data;
                console.log(data);
                alert('Registration successful, please login.')
                //_self keeps page from opening into a new tab
                window.open('/', '_self');
            })
            .catch(response => {
                console.error(response);
                alert('Unable to register.')
            })
        }
    }

    return (
        <Container className="registration-form">
            <Row className="justify-content-center">
            <Col>
                <Form className="registration-form bg-col lining">
                    <Form.Group className="mb-4" controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required/>
                        {values.usernameErr && <p>{values.usernameErr}</p>}
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                        {values.passwordErr && <p>{values.passwordErr}</p>}
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@mail.com" required />
                        {values.emailErr && <p>{values.emailErr}</p>}
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control type="text" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="YYYY-MM-DD" />
                    </Form.Group>
                    <Row className="mt-4 justify-content-start">
                        <Col sm="10" md="8" lg="6">
                            <Button className="reg-button" type="submit" onClick={handleSubmit}>Register</Button>
                        </Col>
                </Row>
                </Form>
            </Col>
            </Row>
        </Container>
    )
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.number.isRequired
    })
};