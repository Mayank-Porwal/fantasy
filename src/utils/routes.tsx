import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../container/Home/index';
const RouteComponent = () => {
    return <BrowserRouter>
    <Routes>
        <Route path="/" Component={(routeProps) => <Home {...routeProps}/>} />
        <Route path="/home" Component={(routeProps) => <Home {...routeProps}/>} />
    </Routes>
    </BrowserRouter>
}

export default RouteComponent