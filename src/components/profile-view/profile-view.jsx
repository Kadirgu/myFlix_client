import React from 'react';
import {Button, Card, Container, Row, Col, FormControl, FormGroup, Form} from 'react-bootstrap';
import axios from 'axios';
import { remFavMovie } from '../../actions/actions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import "./profile-view.scss";

class ProfileView extends React.Component {
    constructor() {
        super();

        this.state = {
            Username: '',
            // Password: '',
            Email: '',
            Birthday: '',
            FavoriteMovies: []
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
    }
    
    getUser(token) {
        const Username = localStorage.getItem('user');
        axios.get(`https://gentle-reef-88518.herokuapp.com/users/${Username}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            this.setState({
                Username: response.data.Username,
                // Password: response.data.Password,
                Email: response.data.Email,
                Birthday: response.data.Birthday,
                FavoriteMovies: response.data.FavoriteMovies
            });
        })
        .catch(function (error) {
            console.log(error)
        });
    }

    //Sends a PUT request to API and the response sets the state to update user info.
    //console.log message indicates success
    updateUser = (e) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.put(`https://gentle-reef-88518.herokuapp.com/users/${Username}`, 
        {
            Username: this.state.Username,
            Password: this.state.Password,
            Email: this.state.Email,
            Birthday: this.state.Birthday

        }, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then((response) => {
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                Birthday: response.data.Birthday
            });

            localStorage.setItem('user', this.state.Username);
            alert("Profile has been updated!");
        });
    }

    //Sends a DELETE request to API and console.log message indicates success
    removeFromFavorite = (event, movie) => {
        event.preventDefault()

        console.log('removing from favorites: ', movie, this.props.user)
    
        const username = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        console.log('remove fav auth: ', token)
    
        axios
          .delete(
            `https://gentle-reef-88518.herokuapp.com/users/${username}/movies/${movie._id}`,
            {
              headers: { Authorization:`Bearer ${token}`}
            }
          )
          .then((res) => {
            this.setState({ FavoriteMovies: res?.data?.FavoriteMovies });
            this.props.remFavMovie(res?.data)
          })
          .catch((err) => {
            console.log(err);
      })
    }

    //Sends DELETE request to API and console.log message indicates success
    removeUser() {
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios.delete(`https://gentle-reef-88518.herokuapp.com/users/${Username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            console.log("Profile has been deleted")
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    setUsername(value) {
        this.setState({
            Username: value
        });
    }

    setEmail(value) {
        this.setState({
            Email: value
        });
    }

    setBirthday(value) {
        this.setState({
            Birthday: value
        });
    }

    getBirthdayValue = () => {
        if (this.state.Birthday) return this.state.Birthday.split('T')[0]
        return ''
    }

    render() {
        const { movies } = this.props;
        const { FavoriteMovies, Username, Email } = this.state;

        return (
            <Container className="form-element">
            <Row>
                <Col>
                    <Card>
                        <Card.Body className="bg-col lining">
                            <Card.Title>My Account</Card.Title>
                            <Form
                                onSubmit={(e) => {
                                    this.updateUser(e)
                                }} >
                                <FormGroup  className="mb-3" controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="username"
                                        placeholder="username"
                                        value={Username}
                                        onChange={(e) => this.setUsername(e.target.value || '')}
                                        required />
                                </FormGroup>

                                <FormGroup className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <FormControl
                                        type="email"
                                        name="email"
                                        placeholder="Enter a new email"
                                        value={Email}
                                        onChange={(e) => this.setEmail(e.target.value)}
                                        required />
                                </FormGroup>

                                <br></br>

                                <Button 
                                    id="update-user-button"
                                    className="button"
                                    variant="primary"
                                    type="submit"
                                    onClick={this.updateUser}>
                                        Update Info
                                </Button>

                                <Button 
                                    id="delete-profile-button"
                                    className="button"
                                    variant="secondary"
                                    onClick={() => this.removeUser()}>
                                        Delete Profile
                                </Button>
                            </Form>
                                
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            


            {/* Fav Movies */}
            
            <Card className="new-part">
                <Card.Body className="bg-col lining">
                    <Card.Title>My Favorite Movies</Card.Title>
                    {!FavoriteMovies || FavoriteMovies.length === 0 && (
                        <div>Favorites list is empty.</div>
                    )}
                    <Row>
                        {FavoriteMovies?.length > 0 && movies.map((movie) => {
                            if (movie._id === FavoriteMovies.find((fav) => fav === movie._id)) {
                                return (
                                    <Card key={movie._id}  className=" col-md-3 card-fav-movie">
                                        <Link to={`/movies/${movie._id}`} className="text-link">
                                            <Card.Img                                                 
                                                className="fav-movie"
                                                variant="top"
                                                src={movie.ImagePath}
                                            />
                                        </Link>
                                        
                                        <Card.Body>
                                            <div className="div-button-rem-favs">
                                                <Button 
                                                    className="button-rem-favs"
                                                    value={movie._id} 
                                                    onClick={(e) => this.removeFromFavorite(e, movie)}>
                                                    Delete
                                                </Button>
                                            </div>                                                                                                       
                                        </Card.Body>
                                    </Card>
                                    );
                                }
                            })}
                        </Row>
                </Card.Body>
            </Card>
                
        </Container>
        
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { remFavMovie })(ProfileView);