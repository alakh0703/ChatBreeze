import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import ChatHome from './components/ChatHome';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">
       <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/chatHome"
              element={
                <Home />
              }
            />
          
          </Routes>
        </Router>
     
    </div>
  );
}

export default App;
