import { Acomodacao } from "./acomodacao";
import Hospede from "./hospede";

export default interface Hospedagem {
    id: number;
    hospede: Hospede;
    acomodacao: Acomodacao;
    dataEntrada: string;
    dataSaida: string;
  }