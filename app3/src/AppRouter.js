import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accueil from './Accueil';
import Recette from './Recette';
import Favoris from './Category';

function AppRouter() {
    return (
        
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Accueil/>}/>
                <Route path='/recette/:id' element={<Recette/>}/>
                <Route path='/favoris' element={<Favoris/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter;