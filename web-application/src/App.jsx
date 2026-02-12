import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Reg from './pages/Reg';
import { ThemeProvider } from './ThemeContext';
import './app.css';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <Router basename="/galaxy">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile/me" element={<Profile />} />
          <Route path="/profile/users/:id" element={<Profile />} />
          <Route path="/auth" element={<Auth />} />
          <Route path='/reg' element={<Reg />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
