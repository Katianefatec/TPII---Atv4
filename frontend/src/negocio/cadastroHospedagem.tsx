import React, { useState, ChangeEvent, FormEvent } from 'react';

import { Acomodacao } from '../interfaces/acomodacao';
import Hospede from '../interfaces/hospede';
import { useNavigate } from 'react-router-dom';

function CadastroHospedagem() {
  const [hospedes, setHospedes] = useState<Hospede[]>([
    { id: 1, nome: 'João Silva', documento: '123.456.789-00', telefone: '(11) 99999-9999', endereco: 'Rua das Flores, 123', dependentes: [] },
    { id: 2, nome: 'Maria Santos', documento: '987.654.321-11', telefone: '(21) 88888-8888', endereco: 'Avenida do Sol, 456', dependentes: [] },
    { id: 3, nome: 'Pedro Alves', documento: '555.555.555-55', telefone: '(31) 77777-7777', endereco: 'Praça da Lua, 789', dependentes: [] },
  ]);

  const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([
    { id: 1, nome: 'Quarto Standard', tipo: 'Solteiro', capacidade: 1, preco: 150, disponivel: true, caracteristicas: ['Wi-Fi', 'Ar condicionado'] },
    { id: 2, nome: 'Quarto Deluxe', tipo: 'Casal', capacidade: 2, preco: 250, disponivel: true, caracteristicas: ['Wi-Fi', 'Ar condicionado', 'Vista para o mar'] },
    { id: 3, nome: 'Suíte Família', tipo: 'Família', capacidade: 4, preco: 400, disponivel: false, caracteristicas: ['Wi-Fi', 'Ar condicionado', 'Banheira', 'Varanda'] }
  ]);
  const [hospedeSelecionado, setHospedeSelecionado] = useState<number | null>(null);
  const [acomodacaoSelecionada, setAcomodacaoSelecionada] = useState<number | null>(null);
  const [dataEntrada, setDataEntrada] = useState('');
  const [dataSaida, setDataSaida] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();    
    console.log({
      hospedeId: hospedeSelecionado,
      acomodacaoId: acomodacaoSelecionada,
      dataEntrada,
      dataSaida    
    });
    navigate('/hospedagens');    
  };


  return (
    <div className="container mt-5">
      <h1 className="title">Cadastro de Hospedagem</h1>
      <form onSubmit={handleSubmit} className="box">
        
        <div className="field">
          <label className="label">Hóspede</label>
          <div className="control">
            <div className="select">
              <select value={hospedeSelecionado || ''} onChange={(e: ChangeEvent<HTMLSelectElement>) => setHospedeSelecionado(Number(e.target.value))}>
                <option value="">Selecione um hóspede</option>
                {hospedes.map((hospede) => (
                  <option key={hospede.id} value={hospede.id}>{hospede.nome}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
       
        <div className="field">
          <label className="label">Acomodação</label>
          <div className="control">
            <div className="select">
              <select value={acomodacaoSelecionada || ''} onChange={(e: ChangeEvent<HTMLSelectElement>) => setAcomodacaoSelecionada(Number(e.target.value))}>
                <option value="">Selecione uma acomodação</option>
                {acomodacoes.map((acomodacao) => (
                  <option key={acomodacao.id} value={acomodacao.id}>{acomodacao.nome} ({acomodacao.tipo})</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="is-horizontal">
          <div className="field">
            <label className="label">Data de Entrada</label>
            <div className="control">
              <input className="input" type="date" value={dataEntrada} onChange={(e) => setDataEntrada(e.target.value)} required />
            </div>
          </div>

          <div className="field">
            <label className="label">Data de Saída</label>
            <div className="control">
              <input className="input" type="date" value={dataSaida} onChange={(e) => setDataSaida(e.target.value)} required />
            </div>
          </div>
        </div>
        
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">Registrar</button>
          </div>
          <div className="control">
            <button className="button is-link is-light" type="reset">Cancelar</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CadastroHospedagem;

