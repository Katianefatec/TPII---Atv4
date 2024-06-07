import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hospedagem from '../interfaces/hospedagem';

function Hospedagens() {
  const [hospedagens, setHospedagens] = useState<Hospedagem[]>([
    {
      id: 1,
      hospede: { id: 101, nome: 'João Silva', documento: '12345678900', telefone: '(11) 98765-4321', endereco: 'Rua A, 123' },
      acomodacao: { id: 201, nome: 'Quarto Standard', tipo: 'Solteiro', capacidade: 1, preco: 150, disponivel: true, caracteristicas: ['Wi-Fi'] },
      dataEntrada: '2024-06-05',
      dataSaida: '2024-06-10'
    },
    {
      id: 2,
      hospede: { id: 102, nome: 'Maria Santos', documento: '98765432100', telefone: '(21) 91234-5678', endereco: 'Rua B, 456' },
      acomodacao: { id: 202, nome: 'Suíte Luxo', tipo: 'Casal', capacidade: 2, preco: 250, disponivel: false, caracteristicas: ['TV', 'Wi-Fi'] },
      dataEntrada: '2024-06-03',
      dataSaida: '2024-06-08'
    },
  ]);

  return (
    <div className="container mt-5">
      <h1 className="title">Hospedagens</h1>

      <Link to="/cadastroHospedagem" className="button is-primary mb-3">Cadastrar Hospedagem</Link>

      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Hóspede</th>
            <th>Acomodação</th>
            <th>Data de Entrada</th>
            <th>Data de Saída</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {hospedagens.map((hospedagem) => (
            <tr key={hospedagem.id}>
              <td>{hospedagem.hospede.nome}</td>
              <td>{hospedagem.acomodacao.nome}</td>
              <td>{hospedagem.dataEntrada}</td>
              <td>{hospedagem.dataSaida}</td>
              <td>
                <button className="button is-small is-info mr-2">Editar</button>
                <button className="button is-small is-danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Hospedagens;


