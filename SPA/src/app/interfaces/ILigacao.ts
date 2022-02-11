import { IUtilizador } from "./IUtilizador";

export interface ILigacao{
    id: string;
    utilizadorA:IUtilizador;
    utilizadorB:IUtilizador;
    forcaLigacao:number;
    tags: string[];
    forcaRelacao:number;
    numeroLikes:number;
    numeroDislikes:number;
}