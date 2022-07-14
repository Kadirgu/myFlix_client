import React, { setState } from 'react';
import axios from 'axios';
import {Button, Card} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './movie-view.scss';

export class MovieView extends React.Component {

    addToFavs = (event) => {
        event.preventDefault()
    
        const username = localStorage.getItem("user");
        const token = localStorage.getItem("token");
    
        axios
        .post(
            `https://gentle-reef-88518.herokuapp.com/users/${username}/movies/${this.props.movie._id}`,
            {},
            {headers: { Authorization: `Bearer ${token}` }})
        .then(() => {
            alert(`${this.props.movie.Title} was added to your favorites list`);
            })
        .catch((err) => {
            console.log(err);
            }
        );
    }

    render () {
        if (!this.props?.user || !this.props.movie) return <div />
        const { movie, onBackClick } = this.props;
        console.log('single movie view: ', movie)

        return (
            <Card className="indiv-view  movie-view">
            <Card.Img className="bg-col indiv-img" variant="top" src={movie.ImagePath}  />
            <Card.Header>
                <Card.Title className="indiv-title">{movie.Title}</Card.Title>
            </Card.Header>
            <Card.Body className="bg-col">            
                <Card.Text>{movie.Description}</Card.Text>
                <Card.Text><strong>Director: </strong>{movie.Director.Name}</Card.Text>
                <Card.Text><strong>Starring: </strong>{movie.Actors.join(', ')}</Card.Text>
                <Route path=".movies/:movieId" render={({ match, history }) => {
                                    return <Col md={8}>
                                        <MovieView movie={movie.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                                    </Col>
                                }} />
                <Link to={`/directors/${movie.Director.Name}`}>
                    <Button className="button" variant="secondary">Director</Button>
                </Link>
                <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button className="button" variant="secondary">Genre</Button>
                </Link>
                <Button className="button" onClick={() => { onBackClick(null); }} >Back</Button>               
                <Button 
                    className="button button-add-favs"
                    variant="outline-secondary"
                    title="Add to My Favorites" 
                                       
                    onClick={(event) => this.addToFavs(event) }> &#x2764;                      
                </Button> 
                                   
            </Card.Body>           
            </Card>
        );
    }
}