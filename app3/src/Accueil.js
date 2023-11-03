import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const Accueil = () => {
  const [cocktailsData, setCocktailData] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const ingredientsResponse = await axios.get(
        `https://thecocktaildb.com/api/json/v1/1/list.php?i=list`
      );
      setIngredients(ingredientsResponse.data.drinks.map((drink) => drink.strIngredient1));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    filterCocktailsByIngredients();
  }, [selectedIngredients, selectAll]);

  const filterCocktailsByIngredients = async () => {
    try {
      const promises = selectedIngredients.map(async (ingredient) => {
        console.log(ingredient);
        const response = await axios.get(
          `https://thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
        );
        return response.data;
      });
      const results = await Promise.all(promises);
      setCocktailData(results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleIngredientChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedIngredients([...selectedIngredients, value]);
    } else {
      setSelectedIngredients(selectedIngredients.filter((ingredient) => ingredient !== value));
    }
  };

  return (
    <Container>
      <Row>
      {ingredients ? (
        <Col md={3}>
          <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
            <Form.Group controlId="ingredientCheckboxes">
              <Form.Label>Choisir des ingrédients :</Form.Label>
              {ingredients.map((ingredient, index) => (
                <Form.Check
                  type="checkbox"
                  label={ingredient}
                  value={ingredient}
                  onChange={handleIngredientChange}
                  checked={selectedIngredients.includes(ingredient)}
                  key={index}
                  style={{ margin: '5px' }}
                />
              ))}
            </Form.Group>
          </div>
        </Col>
        ) : (
            <Col>
                <p>Loading ingredients data...</p>
              </Col>
            )}
        <Col md={9}>
          <Row className="mt-4 justify-content-center">
            {cocktailsData.length > 0 ? (
              cocktailsData.map((cocktailList, index) => (
                <React.Fragment key={index}>
                  {cocktailList.drinks.map((cocktailData, subIndex) => (
                    <Card key={subIndex} className="card" style={{ width: '18rem', margin: '10px', border: '1px solid #ccc' }}>
                      <Card.Img className="card-img-top" variant="top" src={cocktailData.strDrinkThumb} />
                      <Card.Body>
                        <Card.Title className="cocktail-title">{cocktailData.strDrink}</Card.Title>
                        <div className="button-card">
                          <Button className="recette" href={`recette/${cocktailData.idDrink}`}>
                            Recette
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <Col>
                <p>Choisir les ingredients</p>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Accueil;
