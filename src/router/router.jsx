import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Pathes from './pathes';
import Home from '../components/home/home';
import Favorites from '../components/favorites/favorites';
import Details from '../components/details/details';
import Layout from '../components/layouts/layout';
import Err from '../components/error/error';

function Router() {
    return (
        <Routes>
            <Route path={Pathes.homePath} element={<Layout />}>
                <Route index element={<Home />} />
                <Route path={Pathes.favoritesPath} element={<Favorites />} />
                <Route path={Pathes.detailsPath} element={<Details />} />
                <Route path='/err' element={<Err />} />
            </Route>

        </Routes>
    );
}

export default Router;