import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accueil from './Accueil';
import Recette from './Recette';
import Favoris from './Favoris';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/accueil' element={<Accueil/>}/>
                <Route path='/recette' element={<Recette/>}/>
                <Route path='/favoris' element={<Favoris/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter;