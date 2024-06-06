import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Acomodacoes from './negocio/acomodacoes';
import Hospedagens from './negocio/hospedagens';
import Navbar from './componentes/navbar';
import Hospedes from './negocio/hospedes';

function App() {
  return (
    <BrowserRouter> 
      <Navbar />
      <Routes>
        <Route path="/" element={<Hospedes />} />
        <Route path="/hospedes" element={<Hospedes />} />
        <Route path="/acomodacoes" element={<Acomodacoes />} />
        <Route path="/hospedagens" element={<Hospedagens />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

