import { ILigacao } from "./ILigacao";

export interface ICaminho{
    ligacoes: ILigacao[];
    numeroNos: number;
    forcaLigacaoTotal: number;
    forcaRelacaoTotal: number;
    custoMinimo: number;
    custoTotal: number;
}