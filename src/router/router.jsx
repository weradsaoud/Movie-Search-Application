import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Pathes from './pathes';
import Home from '../components/home/home';
import Favorites from '../components/favorites/favorites';
import Details from '../components/details/details';

function Router() {
    return (
        <Routes>
            <Route path={Pathes.homePath} element={<Home />} />
            <Route path={Pathes.favoritesPath} element={<Favorites />} />
            <Route path={Pathes.detailsPath} element={<Details />} />
        </Routes>
    );
}

export default Router;