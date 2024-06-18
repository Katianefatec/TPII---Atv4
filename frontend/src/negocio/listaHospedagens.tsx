import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import Hospedagem from '../interfaces/hospedagem';
import Dependente from '../interfaces/dependente';
import '../css/estilos.css';
import Hospede from '../interfaces/hospede';
import { Acomodacao } from '../interfaces/acomodacao';

function Hospedagens() {
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
  const [hospedagens, setHospedagens] = useState<Hospedagem[]>([
    {
      id: 1,
      hospede: hospedes[0],  
      acomodacao: acomodacoes[0],  
      dataEntrada: '2024-06-05',
      dataSaida: '2024-06-10'
    },
    {
      id: 2,
      hospede: hospedes[1],  
      acomodacao: acomodacoes[1],  
      dataEntrada: '2024-06-03',
      dataSaida: '2024-06-08'
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hospedagemEditando, setHospedagemEditando] = useState<Hospedagem | null>(null);

  const handleEditar = (hospedagem: Hospedagem) => {
    setHospedagemEditando(hospedagem);
    setIsModalOpen(true);
  };

  const handleExcluir = (id: number) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir esta hospedagem?');
    if (confirmacao) {
      setHospedagens(hospedagens.filter(hospedagem => hospedagem.id !== id));
    }
  };

  const handleSalvarEdicao = (hospedagemEditada: Hospedagem) => {
    setHospedagens(hospedagens.map(hospedagem =>
      hospedagem.id === hospedagemEditada.id ? hospedagemEditada : hospedagem
    ));
    setIsModalOpen(false);
  };

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
                <button className="button is-small is-info mr-2" onClick={() => handleEditar(hospedagem)}>Editar</button>
                <button className="button is-small is-danger" onClick={() => handleExcluir(hospedagem.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal is-active">
          <div className="modal-background" onClick={() => setIsModalOpen(false)}></div>
          <div className="modal-content">
            <ModalEdicaoHospedagem
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              hospedagem={hospedagemEditando}
              onSalvar={handleSalvarEdicao}
              hospedes={hospedes}
              acomodacoes={acomodacoes}
            />
          </div>
          <button className="modal-close is-large" aria-label="close" onClick={() => setIsModalOpen(false)}></button>
        </div>
      )}
    </div>
  );
}


function ModalEdicaoHospedagem({ isOpen, onClose, hospedagem, onSalvar, hospedes, acomodacoes }: { isOpen: boolean; onClose: () => void; hospedagem: Hospedagem | null; onSalvar: (hospedagem: Hospedagem) => void; hospedes: Hospede[]; acomodacoes: Acomodacao[] }) {
  const [hospedeSelecionado, setHospedeSelecionado] = useState(hospedagem?.hospede.id.toString() || '');
  const [acomodacaoSelecionada, setAcomodacaoSelecionada] = useState(hospedagem?.acomodacao.id.toString() || '');
  const [dataEntrada, setDataEntrada] = useState(hospedagem?.dataEntrada || '');
  const [dataSaida, setDataSaida] = useState(hospedagem?.dataSaida || '');
  const [dependentes, setDependentes] = useState<Dependente[]>(hospedagem?.dependentes || []);
  const [novoDependente, setNovoDependente] = useState<Dependente>({ nome: '', parentesco: '', documento: '' });
  const [adicionandoDependente, setAdicionandoDependente] = useState(false);

  const handleAdicionarDependente = () => {
    setAdicionandoDependente(true);
  };

  const handleSalvarDependente = () => {
    setDependentes([...dependentes, novoDependente]);
    setNovoDependente({ nome: '', parentesco: '', documento: '' });
    setAdicionandoDependente(false);
  };

  const handleCancelarAdicionarDependente = () => {
    setAdicionandoDependente(false);
  };

  const handleRemoverDependente = (index: number) => {
    setDependentes(dependentes.filter((_, i) => i !== index));
  };

  const handleEditarDependente = (index: number, campo: keyof Dependente, valor: string) => {
    setDependentes(dependentes.map((dependente, i) =>
      i === index ? { ...dependente, [campo]: valor } : dependente
    ));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSalvar({
      id: hospedagem!.id,
      hospede: hospedes.find((h) => h.id === parseInt(hospedeSelecionado, 10))!,
      acomodacao: acomodacoes.find((a) => a.id === parseInt(acomodacaoSelecionada, 10))!,
      dataEntrada,
      dataSaida,
      dependentes: dependentes.filter(dependente => dependente.nome !== "" && dependente.parentesco !== ""),
    });
  };

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Editar Hospedagem</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Hóspede:</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select value={hospedeSelecionado} onChange={(e) => setHospedeSelecionado(e.target.value)}>
                    {hospedes.map((hospede) => (
                      <option key={hospede.id} value={hospede.id}>{hospede.nome}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Acomodação:</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select value={acomodacaoSelecionada} onChange={(e) => setAcomodacaoSelecionada(e.target.value)}>
                    {acomodacoes.map((acomodacao) => (
                      <option key={acomodacao.id} value={acomodacao.id}>{acomodacao.nome}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Data de Entrada:</label>
              <div className="control">
                <input className="input" type="date" value={dataEntrada} onChange={(e) => setDataEntrada(e.target.value)} required />
              </div>
            </div>
            <div className="field">
              <label className="label">Data de Saída:</label>
              <div className="control">
                <input className="input" type="date" value={dataSaida} onChange={(e) => setDataSaida(e.target.value)} required />
              </div>
            </div>
            <div className="field">
              <label className="label">Dependentes:</label>
              {!adicionandoDependente && (
                <button type="button" className="button is-small is-primary mb-2" onClick={handleAdicionarDependente}>
                  Adicionar Dependente
                </button>
              )}

              {adicionandoDependente && (
                <>
                  <div className="field">
                    <label className="label">Nome:</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        value={novoDependente.nome}
                        onChange={(e) => setNovoDependente({ ...novoDependente, nome: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Parentesco:</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        value={novoDependente.parentesco}
                        onChange={(e) => setNovoDependente({ ...novoDependente, parentesco: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="field is-grouped">
                    <div className="control">
                      <button type="button" className="button is-success is-small" onClick={handleSalvarDependente}>Salvar Dependente</button>
                    </div>
                    <div className="control">
                      <button type="button" className="button is-link is-light is-small" onClick={handleCancelarAdicionarDependente}>Cancelar</button>
                    </div>
                  </div>
                </>
              )}

              {dependentes.map((dependente, index) => (
                <div key={index} className="box">
                  <div className="field">
                    <label className="label">Nome:</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        value={dependente.nome}
                        onChange={(e) => handleEditarDependente(index, 'nome', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Parentesco:</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        value={dependente.parentesco}
                        onChange={(e) => handleEditarDependente(index, 'parentesco', e.target.value)}
                      />
                    </div>
                  </div>
                  <button className="button is-danger is-small" onClick={() => handleRemoverDependente(index)}>
                    Remover
                  </button>
                </div>
              ))}
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
        </section>
      </div>
    </div>
  );
}

export default Hospedagens;


