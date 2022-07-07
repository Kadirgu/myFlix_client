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
            .get(`https://gentle-reef-88518.herokuapp.com/users/${user}`, {
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
            let user = localStorage.getItem('user');
            axios
            .put(`https://gentle-reef-88518.herokuapp.com/users/${user}`, {
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


        // Delete user 
    const handleDelete = () => {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        axios
        .delete(`https://localhost:1234/users/${currentUser}`, {
            headers: { 
                Authorization: 'Bearer ' + token
             }})
             .then((response) => {
                alert(`The account was successfully deleted.`)
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.open('/register', '_self');
            }).
            catch(error => console.error(error))
    }

    const renderFavorites = () => {
        console.log(movies)
        return (
            <Row className="justify-content-md-center">
                {favoriteMovies.length === 0 ? (<h5>Add your favorite movie to your list</h5>) :(
                    favoriteMovies.map((movieId, i) => (
                        <Col md={6} lg={4}>
                            <Movie 
                            key={`${i}-${movieId}`}
                            movie={movies.find(m => m._id == movieId)}
                            />
                        </Col>
                    ))
                )}
            </Row>
        )
    }

      // Functions needed to open and close the modal (below) to delete a user 
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

     // Function that contains the modal to delete a users account 
      const cancelUserModal = () => {
        return (
            <>
            <Modal style={{ background: "transparent"}} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete your Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   Are you sure you want to delete your account? 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Link to={`/register`}>
                        <Button variant="primary" onClick={deleteUser}>Delete</Button>
                    </Link> 

                </Modal.Footer>
            </Modal>
            </>
        );
      }
    
      return (
        <p>
            <Container className="form-element">
                
            <h1>{username}'s Account</h1>
            <Form>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter new email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="birthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control onChange={(e) => setBirthday(e.target.value)} value={birthday} type="date" placeholder="birthday" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" value={password} placeholder="Password" />
                </Form.Group>

                <Button variant="warning" onClick={updateUser}>
                    Update my profile
                </Button>

                {/* This button triggers a modal that's called below   */}
                <Button className='deleteButton' variant="link" onClick={handleShow}>
                    Delete my profile
                </Button>
            </Form>

            {/* Calling the function that renders the modal to delete the users account */}
            {cancelUserModal()}

         
            <Form className="form-element">
                <h2>My Favorite Movies:</h2>

                {/* Calling the function that renders the users favorite movies on the profile page */}
                {renderFavorites()}
            </Form>
            
            </Container>
        </p>
    )
}