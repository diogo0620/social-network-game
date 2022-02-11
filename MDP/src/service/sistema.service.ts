import { deleteComentariosByUtilizador, deleteReacoesComentariosByUtilizador } from "./comentario.service";
import { deletePostsByUtilizador, deleteReacoesPostsByUtilizador } from "./post.service";

export async function deleteTudoByUtilizador(utilizador : string){
    await deleteReacoesPostsByUtilizador(utilizador);
    await deleteReacoesComentariosByUtilizador(utilizador);
    await deleteComentariosByUtilizador(utilizador);
    return await deletePostsByUtilizador(utilizador);
}