import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Category = () => {
  const [cocktailsData, setCocktailData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Cocktail'); // Catégorie active par défaut

  useEffect(() => {
    fetchCategory();
    fetchData();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `https://thecocktaildb.com/api/json/v1/1/list.php?c=list`
      );
      setCategoryData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://thecocktaildb.com/api/json/v1/1/filter.php?c=${activeCategory}`
      );
      setCocktailData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  useEffect(() => {
    fetchData();
  }, [activeCategory]);

  return (
    <div>
    {categoryData ? (
      <Row className="mt-4 justify-content-center">
        {categoryData.drinks.map((cat, index) => (
          <Col key={index} xs={6} sm={6} md={3} lg={2}>
            <Button
              onClick={() => handleCategoryClick(cat.strCategory)}
              variant={activeCategory === cat ? 'primary' : 'secondary'}
              className="m-2 w-100"
            >
              {cat.strCategory}
            </Button>
          </Col>
        ))}
      </Row>
      ) : (
        <Col>
            <p>Loading categories data...</p>
          </Col>
        )}

      <Row className="mt-4 justify-content-center">
        {cocktailsData ? (
          cocktailsData.drinks.map((cocktailData, index) => (
            <Col key={index} lg={3} md={4} sm={6} xs={12}>
              <Card className="m-2">
                <Card.Img variant="top" src={cocktailData.strDrinkThumb} />
                <Card.Body>
                  <Card.Title className="cocktail-title">{cocktailData.strDrink}</Card.Title>
                  <div className="button-card">
                    <Button className="recette" href={`recette/${cocktailData.idDrink}`}>
                      Recette
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>Loading cocktail data...</p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Category;
