import React, { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import axios from 'axios';

import {
    useParams,
  } from "react-router-dom";

const Recettes = () => {

    const [cocktailData, setCocktailData] = useState(null);
    const { id } = useParams();
    let tableau = [];


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
            );
            setCocktailData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <Container>
            {cocktailData ? (
                <Row>
                    <Col xs={12} md={9}>
                        <Card className='card' style={{height: '80%' ,paddingLeft: '0px', paddingRight: '0px' }}>
                            <Card.Img className="card-img-top" variant="top" src={cocktailData.drinks[0].strDrinkThumb} />
                            <Card.Body>
                                <Card.Title className='cocktail-title'>{cocktailData.drinks[0].strDrink}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={3}>
                        <Card style={{ width: '18rem', marginLeft: 'auto' }}>
                            <Card.Title style={{ textAlign: 'center', margin: '10px' }}>Ingredients</Card.Title>
                            <ListGroup variant="flush">
                                {(() => {
                                    const items = [];
                                    for (let i = 1; i <= 15; i++) {
                                        const ingredientKey = `strIngredient${i}`;
                                        const measureKey = `strMeasure${i}`;
                                        if (cocktailData.drinks[0][ingredientKey]) {
                                            items.push(
                                                <ListGroup.Item key={ingredientKey}>
                                                    <Row>
                                                        <Col xs={3}>
                                                            <img src={`https://thecocktaildb.com/images/ingredients/${cocktailData.drinks[0][ingredientKey]}-Small.png`} alt="Ingredient" style={{ maxWidth: '100%', height: 'auto' }} />
                                                        </Col>
                                                        <Col xs={9}>
                                                            <p>{cocktailData.drinks[0][ingredientKey]} <br /> {cocktailData.drinks[0][measureKey]}</p>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            );
                                        }
                                    }
                                    return items;
                                })()}
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col xs={12}>
                        <h2 style={{marginBottom: '20px'}}>Recette</h2>
                        {(() => {
                            if (cocktailData.drinks[0].strInstructionsFr) {
                                tableau = cocktailData.drinks[0].strInstructionsFR.split('.');
                            }else{
                                tableau = cocktailData.drinks[0].strInstructions.split('.');
                            }
                            if (tableau[tableau.length - 1] === '') {
                                tableau.pop(); // Supprime le dernier élément s'il est vide (résultant du dernier point)
                            }
                        })()}
                        <ol>
                            {tableau.map((recip, index) => (
                                <li style={{marginBottom: '10px'}} key={index}>{recip.trim()}</li>
                            ))}
                        </ol>
                    </Col>
                </Row>
                
            ) : (
                <p>Loading weather data...</p>
            )}
        </Container>
    );
}

export default Recettes;