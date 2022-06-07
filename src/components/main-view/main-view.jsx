import React from "react";
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [
                {
                    _id: 1,
                    Title: "Inception",
                    Description: "desc1...",
                    ImagePath: "...",
                },
                {
                    _id: 2,
                    Title: "The Shawshank Redemption",
                    Description: "desc2...",
                    ImagePath: "...",
                },
                {
                    _id: 3,
                    Title: "Gladiator",
                    Description: "desc3...",
                    ImagePath: "...",
                },
            ],
            selectedMovie: null,
        };
    }

    componentDidMount() {
        axios.get('https://my-flix-api123.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        // Before the movies have been loaded
        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div className="main-view">
                {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                    ))
                }
            </div>
        );
    }

}
export default MainView;