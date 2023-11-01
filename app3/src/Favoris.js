import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Favoris = () => {
    return (
        <Container>
        <Row className="mt-4 justify-content-center">
            <Col>
                <Form>
                    <Row className="align-items-center">
                        <Col xs={4}>
                            <Form.Control
                                type="text"
                                placeholder="Enter city name"
                            />
                        </Col>
                        <Col xs={2}>
                            <Button variant="primary" type="submit" className="w-100 ">
                                Rechercher
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    </Container>
    );
}

export default Favoris;