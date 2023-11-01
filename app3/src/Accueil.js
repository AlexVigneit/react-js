import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from 'axios';


const Accueil = () => {
    return (
        <Container>
            <Row className="mt-4 justify-content-center">
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Card.Link href="#">Recette</Card.Link>
                        <Card.Link href="#">favoris</Card.Link>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
}

export default Accueil;