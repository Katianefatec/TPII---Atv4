import Dependente from "./dependente";

export default interface Hospede {
    id: number;
    nome: string;
    documento: string;
    telefone: string;
    endereco: string;   
    dependentes: Dependente[];   
  }
  