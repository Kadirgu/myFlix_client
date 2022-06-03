import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [
                { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...' },
                { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...' },
                { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...' }
            ],
            selectedMovie: null
        };
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;

        if (selectedMovie) return <MovieView movie={selectedMovie} />;

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onClick={(movie) => { this.setSelectedMovie(movie) }} />
                    ))
                }
            </div>
        );
    }

}


/* render() {
   return (
     <div className="main-view">
       <div>Inception</div>
       <div>The Shawshank Redemption</div>
       <div>Gladiator</div>
     </div>
   );
 } */


export default MainView;