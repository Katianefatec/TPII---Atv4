import React, { useState } from 'react';
import { Acomodacao } from '../interfaces/acomodacao';
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

export default Acomodacoes;

