import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import CreateTeam from '../container/CreateTeam';
import Home from '../container/Home/index';
import Login from '../container/Login';
import { checkIfLoggedIn } from './helper';
import Register from '../container/Login/Register';

function PrivateRoute() {
    const auth = checkIfLoggedIn();
    return auth ? <Outlet /> : <Navigate to="/login" />;
}
function UnProtectedRoute() {
    const auth = !checkIfLoggedIn();
    return auth ? <Outlet /> : <Navigate to="/home" />;
}
const RouteComponent = () => {
    return (
        <Routes>
            <Route element={<UnProtectedRoute />}>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<PrivateRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/create-team" element={<CreateTeam />} />
            </Route>
        </Routes>
    );
};

export default RouteComponent;
