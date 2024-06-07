import React, { useState, useEffect } from 'react';
import Hospede from '../interfaces/hospede';



function CadastroHospedagem() {
  const [hospedes, setHospedes] = useState<Hospede[]>([]);
  const [acomodacoes, setAcomodacoes] = useState([]);
  const [hospedeSelecionado, setHospedeSelecionado] = useState('');
  const [acomodacaoSelecionada, setAcomodacaoSelecionada] = useState('');
  const [dataEntrada, setDataEntrada] = useState('');
  const [dataSaida, setDataSaida] = useState('');


  useEffect(() => {
    // Lógica para buscar a lista de hóspedes e acomodações do backend
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Lógica para enviar os dados da hospedagem para o backend
  };

  return (
    <div className="container">
      <h1 className="title">Cadastro de Hospedagem</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Hóspede</label>
          <div className="control">
            <div className="select">
              <select value={hospedeSelecionado} onChange={(e) => setHospedeSelecionado(e.target.value)}>
                <option value="">Selecione um hóspede</option>
                {hospedes.map((hospede) => (
                  <option key={hospede.id} value={hospede.id}>{hospede.nome}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ... (outros campos do formulário: acomodação, data de entrada, data de saída) */}

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">Registrar</button>
          </div>
          <div className="control">
            <button className="button is-link is-light">Cancelar</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CadastroHospedagem;
