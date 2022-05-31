import React from 'react';

export class MovieCard extends React.Component {
    render() {
        return <div className="movie-card">some title</div>;
    }
}

{ movies.map(movie => <MovieCard key={movie._id} movie={movie} onClick={() => { this.state.selectedMovie = movie; }} />) }