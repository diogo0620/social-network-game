import { IReacao } from "./IReacao";
import { IUtilizador } from "./IUtilizador";

export interface IComentario{
    id: string;
    utilizador : IUtilizador;
    idPost: string;
    texto: string;
    tags: string[];
    data: string;
    reacoes: IReacao[];
    likes: IReacao[];
    dislikes: IReacao[];
    temLikeDoAutenticado : boolean;
    temDislikeDoAutenticado: boolean;
}