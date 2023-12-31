import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './NavbarComponents/Navbar';
import { About, Contact, Chess, Home } from './NavbarComponents/pages';

function App() {
  return (
    <div id="app">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/Chess" element={<Chess/>}/>
      </Routes>
    </div>
  );
}

export default App;
