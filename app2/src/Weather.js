import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from 'react-bootstrap/Card';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const urlImg = "https://openweathermap.org/img/wn/";

    const [add, setAdd] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            const { latitude, longitude } = pos.coords;
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
            fetch(url).then(res => res.json()).then(data => setAdd(data.address));
        });
    }, []);

    useEffect(() => {
        setCity(add.city);
        fetchData();
    }, [add]);

    const fetchData = async () => {
        const APIKEY = "8ba77e856b1563aa404795602d6c9abb";
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKEY}`
            );
            setWeatherData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    function groupWeatherDataByDay(data) {
        const groupedData = {};
        data.forEach((item) => {
            const date = item.dt_txt.split(' ')[0];
            if (!groupedData[date]) {
                groupedData[date] = [];
            }
            groupedData[date].push(item);
        });
        return Object.values(groupedData);
    }

    return (
        <Container>
            <Row className="mt-4 justify-content-center">
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Row className="align-items-center">
                            <Col xs={4}>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter city name"
                                    value={city}
                                    onChange={handleInputChange}
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
            {weatherData ? (
                <>
                    
                    {weatherData.list.slice(0, 1).map((firstDayData, index) => (
                        <Row key={index} className="mt-4">
                            <Col>
                            <Card className="text-center" style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{weatherData.city.name}</Card.Title>
                                    <Card.Text>
                                        Aujourd'hui:
                                    </Card.Text>
                                    <Card.Text>
                                        Date: {weatherData.list[0].dt_txt.slice(0, -3)}
                                    </Card.Text>
                                    <Card.Text>
                                        Temperature: {weatherData.list[0].main.temp}°C
                                    </Card.Text>
                                    <Card.Text>
                                        Description: {weatherData.list[0].weather[0].description}
                                    </Card.Text>
                                    <Card.Img src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}.png`} alt="meteo" className="img-fluid" style={{maxWidth: '50px', maxHeight: '50px'}} />
                                </Card.Body>
                            </Card>
                            </Col>
                        </Row>
                    ))}
                    <Row className="mt-4">
                        <Col className='col-12'>
                            <h3>Prévision du jour:</h3>
                        </Col>

                        {weatherData.list.slice(1, 4).map((dayData, index) => (

                            <Col className='col-4'>
                                <p>{dayData.dt_txt.split(' ')[1].slice(0, -3)}</p>
                                <p>Temperature: {dayData.main.temp}°C</p>
                                <p>Description: {dayData.weather[0].description}</p>
                                <img src={urlImg + dayData.weather[0].icon + ".png"} alt="meteo" />
                            </Col>

                        ))}
                    </Row>
                    <Row>
                        <Col>
                            <h3>Autres jours</h3>
                        </Col>
                    </Row>
                    <div className="scrollable-cards row">
                        {groupWeatherDataByDay(weatherData.list.slice(5, 40)).map((dayData, index) => {
                            if (index === 0) {
                                // Skip the first day
                                return null;
                            }

                            return (
                                <Card key={index} className='col-12 '>
                                    <Card.Body className='row'>
                                        <Card.Title>Date: {dayData[0].dt_txt.split(' ')[0]}</Card.Title>
                                        {dayData.map((hourData, hourIndex) => (
                                            <div key={hourIndex} className='col-3'>
                                                <Card.Text>
                                                    Time: {hourData.dt_txt.split(' ')[1].slice(0, -3)}
                                                </Card.Text>
                                                <Card.Text>
                                                    Temperature: {hourData.main.temp}°C
                                                </Card.Text>
                                                <Card.Text>
                                                    Description: {hourData.weather[0].description}
                                                </Card.Text>
                                                <img
                                                    src={urlImg + hourData.weather[0].icon + ".png"}
                                                    alt="meteo"
                                                />
                                            </div>
                                        ))}
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </div>


                </>
            ) : (
                <Row>
                    <Col>
                        <p>Loading weather data...</p>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Weather;