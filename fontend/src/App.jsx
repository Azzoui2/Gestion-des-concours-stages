// src/App.jsx
import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './component/Navbar.jsx'; // Assure-toi d'importer le composant NavBar
import ListCNC from './Admin/ListCNC';
import AjouCNC from './Admin/AjouCNC';
import Home from './Admin/Home.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <NavBar /> {/* Ajoute la barre de navigation ici */}
        <Routes>
         <Route path='/' element={<Home />} />

          <Route path='/ajouter' element={<AjouCNC />} />

          <Route path='/list' element={<ListCNC />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
