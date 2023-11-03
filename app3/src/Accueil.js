import React, { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import axios from 'axios';

const Accueil = () => {
    const [cocktailsData, setCocktailData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink`
            );
            setCocktailData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            {cocktailsData ? (
                <Row className="mt-4 justify-content-center">
                    {cocktailsData.drinks.map((cocktailData, index) => (
                        <Card key={index} className='card' style={{ width: '18rem',paddingLeft: '0px', paddingRight: '0px'}}>
                            <Card.Img className="card-img-top" variant="top" src={cocktailData.strDrinkThumb} />
                            <Card.Body>
                                <Card.Title className='cocktail-title'>{cocktailData.strDrink}</Card.Title>
                                <div className='button-card'>
                                    <Button className='recette' href={`recette/${cocktailData.idDrink}`}>
                                    Recette
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            ) : (
                <Row>
                    <Col>
                        <p>Loading cocktail data...</p>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Accueil;
