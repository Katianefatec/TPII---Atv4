import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Acomodacoes from './negocio/listaAcomodacoes';
import Hospedagens from './negocio/listaHospedagens';
import Navbar from './componentes/navbar';
import Hospedes from './negocio/listaHospedes';
import CadastroHospedagem from './negocio/cadastroHospedagem';
import CadastroHospede from './negocio/cadastroHospede';

function App() {
  return (
    <BrowserRouter> 
      <Navbar />
      <Routes>
        <Route path="/" element={<Hospedes />} />
        <Route path="/hospedes" element={<Hospedes />} />
        <Route path="/acomodacoes" element={<Acomodacoes />} />
        <Route path="/hospedagens" element={<Hospedagens />} />
        <Route path="/cadastroHospede" element={<CadastroHospede />} />        
        <Route path="/cadastroHospedagem" element={<CadastroHospedagem />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

