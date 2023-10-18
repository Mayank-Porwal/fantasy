import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import CreateTeam from '../container/CreateTeam'
import Home from '../container/Home/index'
import Login from '../container/Login'
import { checkIfLoggedIn } from './helper'
import Register from '../container/Login/Register'
import ManageLeague from '../container/ManageLeague'
import LeagueDetails from '../container/ManageLeague/LeagueDetails'

function PrivateRoute() {
  const auth = checkIfLoggedIn()
  return auth ? <Outlet /> : <Navigate to='/login' />
}
function UnProtectedRoute() {
  const auth = !checkIfLoggedIn()
  return auth ? <Outlet /> : <Navigate to='/home' />
}
const RouteComponent = () => {
  return (
    <div style={{ width: '98%' }}>
      <Routes>
        <Route element={<UnProtectedRoute />}>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path='/home' element={<Home />} />
          <Route path='/teams' element={<CreateTeam />} />
          <Route path='/manage-league' element={<ManageLeague />} />
          <Route path='/league-details' element={<LeagueDetails />} />
        </Route>
      </Routes>
    </div>
  )
}

export default RouteComponent
