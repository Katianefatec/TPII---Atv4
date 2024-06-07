import React, { useState } from 'react';

function CadastroHospede() {
  const [nome, setNome] = useState('');
  const [documento, setDocumento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [dependentes, setDependentes] = useState([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Lógica para enviar os dados do hóspede para o backend
  };

  return (
    <div className="container">
      <h1 className="title">Cadastro de Hóspede</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Nome</label>
          <div className="control">
            <input className="input" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
        </div>

        {/* ... (outros campos do formulário: documento, telefone, endereço) */}

        <div className="field">
          <label className="label">Dependentes</label>
          {/* ... (lógica para adicionar e remover dependentes) */}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">Cadastrar</button>
          </div>
          <div className="control">
            <button className="button is-link is-light">Cancelar</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CadastroHospede;
