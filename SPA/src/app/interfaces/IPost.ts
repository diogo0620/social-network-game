import { IComentario } from "./IComentario";
import { IReacao } from "./IReacao";
import { IUtilizador } from "./IUtilizador";

export interface IPost{
    id: string;
    utilizador : IUtilizador;
    texto: string;
    tags: string[];
    data: string;
    reacoes : IReacao[];

    likes: IReacao[];
    dislikes: IReacao[];


    comentarios : IComentario[];

    mostrarComentarios : boolean;
    aPublicarComentario : boolean;

    temComentarioDoAutenticado : boolean;
    temLikeDoAutenticado : boolean;
    temDislikeDoAutenticado : boolean;

}