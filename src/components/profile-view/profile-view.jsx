import React, { useEffect, useState } from 'react';
import './profile-view.scss'
import PropTypes from 'prop-types';
import { Form, Button, Container, Col, Row, Modal } from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";
import { MovieCard } from '../movie-card/movie-card';

    export function ProfileView({ movies }) {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [email, setEmail]       = useState('');
        const [birthday, setBirthday] = useState('');
        const [favoriteMovies, setFavoriteMovies] = useState([]);
        const [show, setShow] = useState(false); // setting the state for the deleteUser modal 

        useEffect(() => {
            getUser()
        }, [])

        const getUser = () => {
            let token = localStorage.getItem('token');
            let user = localStorage.getItem("user");
            axios
            .get(`https://localhost:1234/users/${user}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                setUsername(response.data.Username)
                setEmail(response.data.Email)
                setFavoriteMovies(response.data.FavoriteMovies)
                console.log(response.data)
            })
            .catch(e => {
            console.log('Error')
            });
        }
   
        // Update users info 
        const updateUser = () => {
            let token = localStorage.getItem('token');
            let user = localStorage.getItem("user");
            axios
            .put(`https://localhost:1234/users/${user}`, {
                Username: username,
                Email: email, 
                Birthday: birthday,
                Password: password
            },
            {
            headers: {
                Authorization: 'Bearer ' + token
            }})
            .then((response) => {
                alert('Your profile has been updated');
                localStorage.setItem('user', response.data.Username),
                console.log(response.data)
            })
            .catch(e => {
                console.log('Error')
            });
        }


    const handleDelete = () => {
        axios.delete(`https://localhost:1234/users/${currentUser}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                alert(`The account ${user.Username} was successfully deleted.`)
                localStorage.clear();
                window.open('/register', '_self');
            }).
            catch(error => console.error(error))
    }

    return (
        <Container id="profile-form">
            <Row><h4>Your profile</h4></Row>
            <Row>
                <Col className="label">Username:</Col>
                <Col className="value">{user.Username}</Col>
            </Row>
            <Row className="mt-3">
                <Col className="label">Password:</Col>
                <Col className="value">******</Col>
            </Row>
            <Row className="mt-3">
                <Col className="label">Email:</Col>
                <Col className="value">{user.Email}</Col>
            </Row>
            <Row className="mt-3">
                <Col className="label">Birthday:</Col>
                <Col className="value">{user.Birthday}</Col>
            </Row>
            <Row className="mt-5"><h4>Your favourite movies</h4></Row>
            <Row className="mt-3">
                <FavouriteMoviesView
                    movies={movies}
                    favouriteMovies={favouriteMovies}
                    currentUser={currentUser}
                    token={token} />
            </Row>
            <UpdateView user={user} />
            <Button className="d-block mt-5" variant="danger" onClick={handleDelete}>Delete profile</Button>
        </Container>
    )
}