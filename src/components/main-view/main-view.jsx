import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegisterView } from "../registration-view/registration-view";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export class MainView extends React.Component {
    constructor() {
        super();
        // Initial state is set to null
        this.state = {
            movies: [],
            user: null,
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem("token");
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem("user"),
            });
            this.getMovies(accessToken);
        }
    }

       /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

       onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username,
        });

        localStorage.setItem("token", authData.token);
        localStorage.setItem("user", authData.user.Username);
        this.getMovies(authData.token);
    }

    getMovies(token) {
        axios
            .get("https://gentle-reef-88518.herokuapp.com/movies", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                // Assign the result to the state
                this.setState({
                    movies: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

 
    render() {
        const { movies, user } = this.state;
        return (
            <Router>
                <Row className='main-view justify-content-md-center'>
                    <Route
                        exact
                        path='/'
                        render={() => {
                            if (!user)
                                return (
                                    <Col>
                                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            if (movies.length === 0) return <div className='main-view' />;
                            return movies.map((m) => (
                                <Col md={3} key={m._id}>
                                    <MovieCard movie={m} />
                                </Col>
                            ));
                        }}
                    />
                    <Route
                        path='/register'
                        render={() => {
                            if (user) return <Redirect to='/' />;
                            return (
                                <Col lg={8} md={8}>
                                    <RegisterView />
                                </Col>
                            );
                        }}
                    />

                    <Route
                        path='/movies/:movieId'
                        render={({ match, history }) => {
                            if (!user)
                                return (
                                    <Col md={8}>
                                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            if (movies.length === 0) return <div className='main-view' />;
                            return (
                                <Col md={8}>
                                    <MovieView
                                        movie={movies.find((m) => m._id === match.params.movieId)}
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            );
                        }}
                    />

                    <Route
                        path='/directors/:name'
                        render={({ match, history }) => {
                            if (!user)
                                return (
                                    <Col>
                                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            if (movies.length === 0) return <div className='main-view' />;
                            return (
                                <Col md={8}>
                                    <DirectorView
                                        director={
                                            movies.find((m) => m.Director.Name === match.params.name)
                                                .Director
                                        }
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            );
                        }}
                    />

                    <Route
                        path='/genres/:name'
                        render={({ match, history }) => {
                            if (!user)
                                return (
                                    <Col>
                                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            if (movies.length === 0) return <div className='main-view' />;
                            return (
                                <Col md={8}>
                                    <GenreView
                                        genre={
                                            movies.find((m) => m.Genre.Name === match.params.name)
                                                .Genre
                                        }
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            );
                        }}
                    />
                </Row>
            </Router>
        );
    }
}