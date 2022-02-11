import { deleteTodosComentarios, fazerDislike, fazerLike, getComentarioByPost, getTodosComentarios, novoComentario, tirarDislike, tirarLike } from "../service/comentario.service";
import { Request, Response } from "express";


export async function criarComentarioHandler(req : Request, res : Response){
    try{
        const post = await novoComentario(req.body);
        return res.send(post);
    }catch(e){
        const error = e as Error;
        return res.status(400).send(error.message);
    }
}

export async function getTodosComentariosHandler(req : Request, res : Response){
    const idPost = req.query.post?.toString();

    if(idPost){
        const comentarios = await getComentarioByPost(idPost);
        return res.send(comentarios);
    }

    const comentarios = await getTodosComentarios();
    return res.send(comentarios);

    
}

export async function fazerLikeComentarioHandler(req : Request, res : Response){
    try{
        const comentarioID = req.params.id;
        const comentario = await fazerLike(comentarioID, req.body.utilizadorId);
        return res.send(comentario);
    }catch(e){
        const error = e as Error;
        return res.status(400).send(error.message);
    }
}

export async function fazerDislikeComentarioHandler(req: Request, res: Response){
    try{
        const comentarioID = req.params.id;
        const post = await fazerDislike(comentarioID, req.body.utilizadorId);
        return res.send(post);
    }catch(e){
        const error = e as Error;
        return res.status(400).send(error.message);
    }
}

export async function tirarLikeComentarioHandler(req: Request, res : Response){

    try{
        const comentarioID = req.params.idComentario;
        const utilizadorId = req.params.idUtilizador;
        const comentario = await tirarLike(comentarioID, utilizadorId);
        return res.send(comentario);
    }catch(e){
        const error = e as Error;
        return res.status(400).send(error.message);
    }
  
}

export async function tirarDislikeComentarioHandler(req: Request, res : Response){

    try{
        const comentarioID = req.params.idComentario;
        const utilizadorId = req.params.idUtilizador;
        const comentario = await tirarDislike(comentarioID, utilizadorId);
        return res.send(comentario);
    }catch(e){
        const error = e as Error;
        return res.status(400).send(error.message);
    }
}


export async function deleteComentariosHandler(req: Request, res: Response){
    const comentarios = await deleteTodosComentarios();
    return res.send(comentarios);
}

