export interface Acomodacao {
    id: number;
    nome: string;
    tipo: string;
    capacidade: number;
    preco: number;
    disponivel: boolean;
    caracteristicas: string[];
  }