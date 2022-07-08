import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

import './movie-view.scss';

/*MovieView: display details about a movie clicked by user*/
export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Container fluid className='moviesContainer'>
                <Row>
                    <Col>
                        <div className='movie-poster'>
                            <img src={movie.ImagePath} />
                        </div>
                        <div className='movie-title'>
                            <span className='label'>Title: </span>
                            <span className='value'>{movie.Title}</span>
                        </div>
                        <div className='movie-description'>
                            <span className='label'>Description: </span>
                            <span className='value'>{movie.Description}</span>
                        </div>
                        <div className='movie-genre'>
                            <span className='label'>Genre: </span>
                            <Link to={`/genres/${movie.Genre.Name}`}>
                                <Button variant='link'>{movie.Genre.Name}</Button>
                            </Link>
                        </div>
                        <div className='movie-director'>
                            <span className='label'>Director: </span>
                            <Link to={`/directors/${movie.Director.Name}`}>
                                <Button variant='link'>{movie.Director.Name}</Button>
                            </Link>
                        </div>
                        <Button variant='outline-secondary' onClick={() => onBackClick()}>
                            Back
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

/*  -- specify how MovieView's props should look: -- */
MovieView.propTypes = {
    movie:  PropTypes.shape({
                Title:              PropTypes.string.isRequired,
                Description:        PropTypes.string.isRequired,
                Genre: PropTypes.shape({
                    Name:           PropTypes.string.isRequired,
                    Description:    PropTypes.string.isRequired
                }).isRequired,
                Director: PropTypes.shape({
                    Name:           PropTypes.string.isRequired,
                    Bio:            PropTypes.string.isRequired, 
                    Birth:          PropTypes.string.isRequired,
                    Death:          PropTypes.string
                }).isRequired,
                Actors:             PropTypes.arrayOf(PropTypes.string).isRequired,
                ImagePath:          PropTypes.string.isRequired,
                Featured:           PropTypes.bool.isRequired
            }).isRequired,
    onBackClick: PropTypes.func.isRequired
};