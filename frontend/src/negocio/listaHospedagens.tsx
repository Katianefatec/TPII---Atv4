import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Hospedagens() {
    // Dados de exemplo para hospedagens (substituir por dados reais posteriormente)
    const [hospedagens, setHospedagens] = useState([]); 

    return (
        <div className="container mt-5">
            <h1 className="title">Hospedagens</h1>

            <Link to="/cadastroHospedagem" className="button is-primary mb-3">Cadastrar Hospedagem</Link>

            {/* Tabela de Hospedagens */}
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
                    {/* ... (renderizar as hospedagens) */}
                </tbody>
            </table>
        </div>
    );
}

export default Hospedagens;

