import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navigation = () => {

    const [cocktailData, setCocktailData] = useState(null);

    const fetchData = async () => {
        const APIKEY = "1";
        try {
            const response = await axios.get(
                `www.thecocktaildb.com/api/json/v1/${APIKEY}/filter.php?c=Ordinary_Drink`
            );
            setCocktailData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="http://localhost:3000/accueil">Cocktail</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="http://localhost:3000/accueil">Accueil</Nav.Link>
                        <Nav.Link href="http://localhost:3000/favoris">Mes favoris</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
    </Navbar>
    );
}

export default Navigation;