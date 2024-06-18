import React, { useState, ChangeEvent, FormEvent } from 'react';
import Dependente from '../interfaces/dependente';
import { useNavigate } from 'react-router-dom';
function CadastroHospede() {
  const [hospede, setHospede] = useState({
    nome: '',
    documento: '',
    telefone: '',
    endereco: '',
    dependentes: [] as Dependente[] 
  });
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setHospede(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddDependente = () => {
    setHospede(prevState => ({
      ...prevState,
      dependentes: [...prevState.dependentes, { nome: '', documento: '' }]
    }));
  };

  const handleDependenteChange = (index: number, field: string, value: string) => {
    setHospede(prevState => ({
      ...prevState,
      dependentes: prevState.dependentes.map((dependente, i) =>
        i === index ? { ...dependente, [field]: value } : dependente
      )
    }));
  };

  const handleRemoveDependente = (index: number) => {
    setHospede(prevState => ({
      ...prevState,
      dependentes: prevState.dependentes.filter((_, i) => i !== index)
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(hospede); // Aqui você poderia enviar os dados para o backend no futuro
    navigate('/hospedes');
  }; 
  

  return (
    <div className="container mt-5">
      <h1 className="title">Cadastro de Hóspedes</h1>
      <form onSubmit={handleSubmit} className="box"> {/* Adiciona a classe 'box' do Bulma */}

        {/* Campos para nome, documento, telefone e endereço */}
        <div className="field">
          <label className="label">Nome</label>
          <div className="control">
            <input className="input" type="text" name="nome" value={hospede.nome} onChange={handleInputChange} required />
          </div>
        </div>
        <div className="field">
          <label className="label">Documento</label>
          <div className="control">
            <input className="input" type="text" name="documento" value={hospede.documento} onChange={handleInputChange} required />
          </div>
        </div>
        <div className="field">
          <label className="label">Telefone</label>
          <div className="control">
            <input className="input" type="text" name="telefone" value={hospede.telefone} onChange={handleInputChange} required />
          </div>
        </div>
        <div className="field">
          <label className="label">Endereço</label>
          <div className="control">
            <input className="input" type="text" name="endereco" value={hospede.endereco} onChange={handleInputChange} required />
          </div>
        </div>       
        
        <div className="field">
          <label className="label">Dependentes</label>
          <button type="button" className="button is-primary is-small mb-2" onClick={handleAddDependente}>
            Adicionar Dependente
          </button>
          {hospede.dependentes.map((dependente, index) => (
            <div key={index} className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <label className="label">Nome</label>
                  <div className="control">
                    <input className="input is-small" type="text" placeholder="Nome" value={dependente.nome} onChange={(e) => handleDependenteChange(index, 'nome', e.target.value)} />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Documento</label>
                  <div className="control">
                    <input className="input is-small" type="text" placeholder="Documento" value={dependente.documento} onChange={(e) => handleDependenteChange(index, 'documento', e.target.value)} />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Parentesco</label>
                  <div className="control">
                    <input className="input is-small" type="text" placeholder="Parentesco" />
                  </div>
                </div>
                <div className="field">
                  <button type="button" className="button is-danger is-small" onClick={() => handleRemoveDependente(index)}>
                    Remover
                  </button>
                </div>
                
              </div>
            </div>
          ))}
        </div>

        <div className="field">
          <div className="control">
            <button className="button is-link" type="submit">Enviar</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CadastroHospede;
