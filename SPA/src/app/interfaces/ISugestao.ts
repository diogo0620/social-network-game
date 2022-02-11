import { IUtilizador } from "./IUtilizador";

export interface ISugestao{
    utilizador : IUtilizador;
    tagsEmComum : number;
    amigosEmComum : number;
}