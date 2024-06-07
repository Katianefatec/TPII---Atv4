import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Hospedes() {
    
    const [hospedes, setHospedes] = useState([
        { id: 1, nome: 'João Silva', documento: '123.456.789-00', dependentes: [] },
        { id: 2, nome: 'Maria Souza', documento: '987.654.321-11', dependentes: [] },
        { id: 3, nome: 'Pedro Santos', documento: '555.555.555-55', dependentes: [] },
        { id: 4, nome: 'Ana Oliveira', documento: '111.111.111-11', dependentes: [] },
    ]);

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
                    {hospedes.map(hospede => (
                        <tr key={hospede.id}>
                            <td>{hospede.nome}</td>
                            <td>{hospede.documento}</td>
                            <td>{hospede.dependentes.length}</td> 
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

export default Hospedes;

