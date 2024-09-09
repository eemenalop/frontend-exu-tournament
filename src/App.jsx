import Home from './componets/Home';
import LogIn from './adminComponets/LogIn';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminHome from './adminComponets/AdminHome';
import ProtectedRoute from './adminComponets/ProtectedRoute';
import GeneralStats from './componets/statistics/GeneralStats';
import Team from './componets/teams/Team';
import Player from './componets/players/Player';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin-login' element={<LogIn />} />
        <Route path='/admin-home' element={<ProtectedRoute />}>
          <Route path='/admin-home' element={<AdminHome />} />
        </Route>
        <Route path="/GeneralStats" element={<GeneralStats />} />
        <Route path="/team/:teamId" element={<Team />} />
        <Route path="/player/:player_id" element={<Player />} />
      </Routes>
    </Router>
  );
}

export default App;
