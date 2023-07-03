import { Route, Routes } from 'react-router-dom';
import CreateTeam from '../container/CreateTeam';
import Home from '../container/Home/index';
import React from 'react';
const RouteComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create-team" element={<CreateTeam />} />
        </Routes>
    );
};

export default RouteComponent;
