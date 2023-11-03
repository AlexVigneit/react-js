import './App.css';
import Navigation from './Navigation';
import Accueil from './Accueil';
import Recette from './Recette';
import Category from './Category';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className='app'>
      <Router>
        <Navigation />
        <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/category" element={<Category />} />
        <Route path="/recette/:id" element={<Recette />} />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
