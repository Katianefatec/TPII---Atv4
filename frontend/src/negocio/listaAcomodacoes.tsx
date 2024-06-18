import React, { useState } from 'react';
import { Acomodacao } from '../interfaces/acomodacao';
import '../css/estilos.css';



function Acomodacoes() {
  const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([
    { id: 1, nome: 'Standard Solteiro', tipo: 'Solteiro', capacidade: 1, preco: 150, disponivel: true, caracteristicas: ['TV', 'Wi-Fi'] },
    { id: 2, nome: 'Luxo Casal', tipo: 'Casal', capacidade: 2, preco: 250, disponivel: false, caracteristicas: ['TV', 'Wi-Fi', 'Banheira'] },
    { id: 3, nome: 'Família Standard', tipo: 'Família', capacidade: 4, preco: 350, disponivel: true, caracteristicas: ['TV', 'Wi-Fi', 'Frigobar'] },
    { id: 4, nome: 'Suíte Master', tipo: 'Casal', capacidade: 2, preco: 500, disponivel: true, caracteristicas: ['TV', 'Wi-Fi', 'Banheira', 'Vista Mar'] },
    { id: 5, nome: 'Econômico', tipo: 'Solteiro', capacidade: 1, preco: 100, disponivel: true, caracteristicas: ['Wi-Fi'] },
    { id: 6, nome: 'Luxo Triplo', tipo: 'Triplo', capacidade: 3, preco: 380, disponivel: true, caracteristicas: ['TV', 'Wi-Fi', 'Frigobar'] },
    { id: 7, nome: 'Suíte Família', tipo: 'Família', capacidade: 5, preco: 600, disponivel: false, caracteristicas: ['TV', 'Wi-Fi', 'Banheira', 'Vista Montanha'] },
    { id: 8, nome: 'Standard Duplo', tipo: 'Duplo', capacidade: 2, preco: 200, disponivel: true, caracteristicas: ['TV', 'Wi-Fi'] },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [acomodacaoEditando, setAcomodacaoEditando] = useState<Acomodacao | null>(null);

  const handleEditar = (acomodacao: Acomodacao) => {
    setAcomodacaoEditando(acomodacao);
    setIsModalOpen(true);
  };

  const handleExcluir = (id: number) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir esta acomodação?');
    if (confirmacao) {
      setAcomodacoes(acomodacoes.filter(acomodacao => acomodacao.id !== id));
    }
  };

  const handleSalvarEdicao = (acomodacaoEditada: Acomodacao) => {
    setAcomodacoes(acomodacoes.map(acomodacao =>
      acomodacao.id === acomodacaoEditada.id ? acomodacaoEditada : acomodacao
    ));
    setIsModalOpen(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="title">Acomodações</h1>

      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Capacidade</th>
            <th>Preço</th>
            <th>Disponível</th>
            <th>Características</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {acomodacoes.map(acomodacao => (
            <tr key={acomodacao.id}>
              <td>{acomodacao.nome}</td>
              <td>{acomodacao.tipo}</td>
              <td>{acomodacao.capacidade}</td>
              <td>{acomodacao.preco}</td>
              <td>{acomodacao.disponivel ? 'Sim' : 'Não'}</td>
              <td>{acomodacao.caracteristicas.join(', ')}</td> 
              <td>
                <button className="button is-small is-info mr-2" onClick={() => handleEditar(acomodacao)}>Editar</button>
                <button className="button is-small is-danger" onClick={() => handleExcluir(acomodacao.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {isModalOpen && (
        <div className="modal-container">
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            acomodacao={acomodacaoEditando}
            onSalvar={handleSalvarEdicao}
          />
        </div>
      )}
    </div>
  );
}

function Modal({ isOpen, onClose, acomodacao, onSalvar }: { isOpen: boolean, onClose: () => void, acomodacao: Acomodacao | null, onSalvar: (acomodacao: Acomodacao) => void }) {
    const [nome, setNome] = useState(acomodacao?.nome || '');
    const [tipo, setTipo] = useState(acomodacao?.tipo || '');
    const [capacidade, setCapacidade] = useState(acomodacao?.capacidade || 0);
    const [preco, setPreco] = useState(acomodacao?.preco || 0);
    const [disponivel, setDisponivel] = useState(acomodacao?.disponivel || false);
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      onSalvar({
        id: acomodacao!.id,
        nome,
        tipo,
        capacidade,
        preco,
        disponivel,
        caracteristicas: acomodacao!.caracteristicas // Mantemos as características originais
      });
    };
  
    return (
      <div className={`modal ${isOpen ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={onClose}></div>
        <div className="modal-content"> 
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Nome:</label>
              <div className="control">
                <input className="input" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Tipo:</label>
              <div className="control">
                <input className="input" type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Capacidade:</label>
              <div className="control">
                <input className="input" type="number" value={capacidade} onChange={(e) => setCapacidade(parseInt(e.target.value, 10))} />
              </div>
            </div>
            <div className="field">
              <label className="label">Preço:</label>
              <div className="control">
                <input className="input" type="number" value={preco} onChange={(e) => setPreco(parseFloat(e.target.value))} />
              </div>
            </div>
            <div className="field">
              <label className="label">Disponível:</label>
              <div className="control">
                <label className="checkbox">
                  <input type="checkbox" checked={disponivel} onChange={(e) => setDisponivel(e.target.checked)} />
                  Sim
                </label>
              </div>
            </div>
            <div className="field is-grouped"> 
            <div className="control">
              <button className="button is-success" type="submit">Salvar</button>
            </div>
            <div className="control">
              <button className="button is-link is-light" onClick={onClose}>Cancelar</button>
            </div>
          </div>
        </form>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  );
}

export default Acomodacoes;
