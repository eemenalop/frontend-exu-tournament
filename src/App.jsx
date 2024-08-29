import Home from './componets/Home';
import LogIn from './adminComponets/LogIn';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminHome from './adminComponets/AdminHome';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin-login' element={<LogIn />} />
        <Route path='/admin-home' element={<AdminHome />} />
      </Routes>
    </Router>
  );
}

export default App;
