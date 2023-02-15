import './App.css';
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './pages/Home/home.jsx'
import Events from './pages/Events/events.jsx'
import NotFound from './pages/error-page.jsx'
import Venues from './pages/Venues/venues.jsx'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

export default function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/venues" element={<Venues/>}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </Router>
  );
}

