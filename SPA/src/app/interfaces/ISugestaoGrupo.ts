import { IUtilizador } from "./IUtilizador";

export interface ISugestaoGrupo{
    grupo : IUtilizador[];
    tagsEmComum : string[];
    

    verDetalhes: boolean;
}