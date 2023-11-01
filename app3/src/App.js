import './App.css';
import Navigation from './Navigation';
import AppRouter from './AppRouter';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className='app'>
      <Navigation/>
      <AppRouter/>
     
    </div>
    
  );
}

export default App;
