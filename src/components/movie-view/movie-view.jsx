import PropTypes from "prop-types";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export class MovieView extends React.Component {
    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener("keypress", this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener("keypress", this.keypressCallback);
    }

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

MovieView.propTypes = {
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

    onBackClick: PropTypes.func.isRequired,
};