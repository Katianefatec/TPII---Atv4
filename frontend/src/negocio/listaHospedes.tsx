import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import Hospede from '../interfaces/hospede';
import Dependente from '../interfaces/dependente';
import '../css/estilos.css';

function Hospedes() {
    const [hospedes, setHospedes] = useState<Hospede[]>([
        { id: 1, nome: 'João Silva', documento: '123.456.789-00', telefone: '(11) 99999-9999', endereco: 'Rua das Flores, 123', dependentes: [] },
        { id: 2, nome: 'Maria Souza', documento: '987.654.321-11', telefone: '(21) 88888-8888', endereco: 'Avenida do Sol, 456', dependentes: [] },
        { id: 3, nome: 'Pedro Santos', documento: '555.555.555-55', telefone: '(31) 77777-7777', endereco: 'Praça da Lua, 789', dependentes: [] },
        { id: 4, nome: 'Ana Oliveira', documento: '111.111.111-11', telefone: '(41) 66666-6666', endereco: 'Travessa das Árvores, 753', dependentes: [] },
      ]);
      

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hospedeEditando, setHospedeEditando] = useState<Hospede | null>(null);

  const handleEditar = (hospede: Hospede) => {
    setHospedeEditando(hospede);
    setIsModalOpen(true);
  };

  const handleExcluir = (id: number) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este hóspede?');
    if (confirmacao) {
      setHospedes(hospedes.filter(hospede => hospede.id !== id));
    }
  };

  const handleSalvarEdicao = (hospedeEditado: Hospede) => {
    setHospedes(hospedes.map(hospede =>
      hospede.id === hospedeEditado.id ? hospedeEditado : hospede
    ));
    setIsModalOpen(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="title">Hóspedes</h1>

      <Link to="/cadastroHospede" className="button is-primary mb-3">Cadastrar Hóspede</Link>

      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Documento</th>
            <th>Dependentes</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {hospedes.map((hospede) => (
            <tr key={hospede.id}>
              <td>{hospede.nome}</td>
              <td>{hospede.documento}</td>
              <td>{hospede.dependentes.length}</td>
              <td>
                <button className="button is-small is-info mr-2" onClick={() => handleEditar(hospede)}>Editar</button>
                <button className="button is-small is-danger" onClick={() => handleExcluir(hospede.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      {isModalOpen && (
        <div className="modal is-active">
          <div className="modal-background" onClick={() => setIsModalOpen(false)}></div>
          <div className="modal-content">
            <ModalEdicaoHospede
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              hospede={hospedeEditando}
              onSalvar={handleSalvarEdicao}
            />
          </div>
          <button className="modal-close is-large" aria-label="close" onClick={() => setIsModalOpen(false)}></button>
        </div>
      )}
    </div>
  );
}

function ModalEdicaoHospede({ isOpen, onClose, hospede, onSalvar }: { isOpen: boolean, onClose: () => void, hospede: Hospede | null, onSalvar: (hospede: Hospede) => void }) {
  const [nome, setNome] = useState(hospede?.nome || '');
  const [documento, setDocumento] = useState(hospede?.documento || '');
  const [dependentes, setDependentes] = useState<Dependente[]>(hospede?.dependentes || []);
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
        id: hospede!.id,
        nome,
        documento,
        dependentes,
        telefone: hospede!.telefone,  
        endereco: hospede!.endereco,  
    });
};

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Editar Hóspede</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          <form onSubmit={handleSubmit}>
           
            <div className="field">
              <label className="label">Nome:</label>
              <div className="control">
                <input className="input" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Documento:</label>
              <div className="control">
                <input className="input" type="text" value={documento} onChange={(e) => setDocumento(e.target.value)} />
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

export default Hospedes;
