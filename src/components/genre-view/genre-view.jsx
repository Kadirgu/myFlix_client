import React from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';

import "./genre-view.scss";

export class GenreView extends React.Component {
    render() {
        const { genre, onBackClick } = this.props;

        return (
            <Container className="mt-3 genre-view">
                <Row>
                    <Col className="left-col">Genre: </Col>
                    <Col className="right-col">{genre?.Name}</Col>
                </Row>
                <Row className="mt-3">
                    <Col className="left-col">Description: </Col>
                    <Col className="right-col">{genre?.Description}</Col>
                </Row>
                <Row className="mt-3">
                    <Col className="left-col"></Col>
                    <Col className="right-col">
                        <Button 
                            className="d-block mt-3" 
                            onClick={() => { onBackClick(null); }}                             
                            >Back
                        </Button>
                    </Col>
                </Row>            
            </Container>
        )
    }
}