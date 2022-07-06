import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';


import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  
      // Add Favorite movie 
      addToFavs(movieId) {
        const currentUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios.post(`https://localhost:2222/users/${currentUser}/movies/${movieId}`, 
        {},
        {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then((response) => {
          console.log(response.data)
          alert(`The movie was successfully added to your list.`)
        }).
        catch(error => console.error(error))
    }

    // Remove Favorite movie 
    remFromFavs(movieId) {
        const currentUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios.delete(`https://localhost:2222/users/${currentUser}/movies/${movieId}`, 
        {},
        {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then((response) => {
          console.log(response.data)
          alert(`The movie was successfully removed from your list.`)
        }).
        catch(error => console.error(error))
    }

  
  render() {
    const { movie } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

//setting up default values for the MovieCard properties
//ensuring values are strings and required
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }).isRequired,

  onMovieClick: PropTypes.func.isRequired,
};