import React from 'react';
import PropTypes from 'prop-types';
import {Card, Row, Col} from 'react-bootstrap';

import { Link } from "react-router-dom";

import './movie-card.scss';


export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;
        console.log(movie);
        return (
            <Card className="cards bg-col"  >
                <Link to={`/movies/${movie._id}`}>
                    <Card.Img className='cards-img bg-col' variant="top" src={movie.ImagePath} />
                </Link>
                <Card.Header >
                    <Card.Title className='cards-title'>{movie.Title}</Card.Title>                                                                                                         
                </Card.Header>
                <Card.Body className="bg-col">                          
                    <Card.Text className="cards-description">
                        {movie.Description.split(' ').slice(0, 14).join(' ') + ' '}
                        <Link to={`/movies/${movie._id}`} className="text-link">
                            [...]
                        </Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        ) 
    }
}

/*  -- specify how MovieCard's props should look: -- */
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title:              PropTypes.string.isRequired,
        Description:        PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name:           PropTypes.string.isRequired                  
        }).isRequired,
        Director: PropTypes.shape({
            Name:           PropTypes.string.isRequired
        }).isRequired,
        Actors:             PropTypes.arrayOf(PropTypes.string).isRequired,
        ImagePath:          PropTypes.string.isRequired,
        Featured:           PropTypes.bool.isRequired
    }).isRequired
};