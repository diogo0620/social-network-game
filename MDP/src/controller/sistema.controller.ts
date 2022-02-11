import { deleteTudoByUtilizador } from "../service/sistema.service";
import { Request, Response } from "express";
import { getDislikesDoUtilizadorAemPostsDoUtilizadorB, getLikesDoUtilizadorAemPostsDoUtilizadorB } from "../service/post.service";
import { getDislikesDoUtilizadorAemComentariosDoUtilizadorB, getLikesDoUtilizadorAemComentariosDoUtilizadorB } from "../service/comentario.service";

export async function deleteTudoByUtilizadorHandler(req:Request, res : Response){
    const utilizador = req.params.idUtilizador;
    const apagados = await deleteTudoByUtilizador(utilizador);
    return res.send("Tudo apagado");  
}

export async function diferencaDeLikesDislikesEntreUtilizadores(req:Request, res : Response){
    const utilizadorA = req.query.utilizadorA!.toString();
    const utilizadorB = req.query.utilizadorB!.toString();

    const likesNosPosts = await getLikesDoUtilizadorAemPostsDoUtilizadorB(utilizadorA, utilizadorB);
    const dislikesNosPosts = await getDislikesDoUtilizadorAemPostsDoUtilizadorB(utilizadorA, utilizadorB);

    const likesNosComentarios = await getLikesDoUtilizadorAemComentariosDoUtilizadorB(utilizadorA, utilizadorB);
    const dislikesNosComentarios = await getDislikesDoUtilizadorAemComentariosDoUtilizadorB(utilizadorA, utilizadorB);

    const totalLikes = likesNosPosts + likesNosComentarios;
    const totalDislikes = dislikesNosPosts + dislikesNosComentarios;


    return res.send({likes: totalLikes, dislikes: totalDislikes});
}

