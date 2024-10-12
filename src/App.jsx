import Home from './componets/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GeneralStats from './componets/statistics/GeneralStats';
import Team from './componets/teams/Team';
import Player from './componets/players/Player';
import History from './componets/History';
import CalendarDetail from './componets/CalendarDetail';
import LogIn from './adminComponets/LogIn';
import ProtectedRoute from './adminComponets/ProtectedRoute'
import AdminHome from './adminComponets/AdminHome';
import CreateTeam from './adminComponets/CreateTeam'
import CreatePlayer from './adminComponets/CreatePlayer'
import CreateMatch from './adminComponets/CreateMatch'
import CreatePlayersMatchStats from './adminComponets/CreatePlayersMatchStats'
import AddStatsPlayersPage from './adminComponets/AddStatsPlayersPage';
import Matches from './componets/results/Matches';
import MatchesBoxScore from './componets/results/MatchesBoxScore';
import StatsFullList from './componets/statistics/StatsFullList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/admin-login' element={<LogIn />} />
        <Route path='/admin-home' element={<ProtectedRoute />}>
            <Route path='/admin-home' element={<AdminHome />} />
        </Route>

        <Route path='/admin-home/CreateTeam' element={<ProtectedRoute />}>
          <Route path="/admin-home/CreateTeam" element={<CreateTeam />} />
        </Route>

        <Route path='/admin-home/CreatePlayer' element={<ProtectedRoute />}>
          <Route path="/admin-home/CreatePlayer" element={<CreatePlayer />} />
        </Route>

        <Route path='/admin-home/CreateMatch' element={<ProtectedRoute />}>
          <Route path="/admin-home/CreateMatch" element={<CreateMatch />} />
        </Route>
        
        <Route path='/admin-home/CreatePlayersMatchStats' element={<ProtectedRoute />}>
          <Route path="/admin-home/CreatePlayersMatchStats" element={<CreatePlayersMatchStats />} />
        </Route>

        <Route path='/admin-home/CreatePlayersMatchStats/AddStatsPlayerPage' element={<ProtectedRoute />}>
          <Route path="/admin-home/CreatePlayersMatchStats/AddStatsPlayerPage/:match_id" element={<AddStatsPlayersPage />} />
        </Route>
        
        

        <Route path="/CalendarDetail" element={<CalendarDetail />} />

        <Route path="/GeneralStats" element={<GeneralStats />} />

        <Route path="/GeneralStats/full-list/" element={<StatsFullList />} />

        <Route path="/Matches" element={<Matches />} />

        <Route path="/match/:matchId/MatchesBoxScore" element={<MatchesBoxScore />} />
        
        <Route path="/team/:teamId" element={<Team />} />

        <Route path="/player/:playerId" element={<Player />} />

        <Route path="/historia" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
