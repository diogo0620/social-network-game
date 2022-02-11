import { Request, Response } from "express";
import { deleteTodosPosts, fazerDislike, fazerLike, getPostById, getPostsByUtilizadores, getTagCloudNosPosts, getTagCloudNosPostsByUtilizador, getTodosPosts, novoPost, tirarDislike, tirarLike } from "../service/post.service";

export async function criarPostHandler(req : Request, res : Response){   
    const post = await novoPost(req.body);
    return res.send(post);
}

export async function getTodosPostsHandler(req : Request, res : Response){
    const utilizadores = req.query.utilizadores?.toString().split(",");

    if(utilizadores){
        const posts = await getPostsByUtilizadores(utilizadores);
        return res.send(posts);
    }

    const posts = await getTodosPosts();
    return res.send(posts);
}

export async function getPostByIdHandler(req: Request, res : Response){
    const post = await getPostById(req.params.id);
    return res.send(post);
}

export async function fazerLikeHandler(req : Request, res : Response){
    try{
        const postID = req.params.id;
        const post = await fazerLike(postID, req.body.utilizadorId);
        return res.send(post);
    }catch(e){
        const error = e as Error;
        return res.status(400).send(error.message);
    }
}

export async function tirarLikeHandler(req: Request, res : Response){

    try{
        const postID = req.params.idPost;
        const utilizadorId = req.params.idUtilizador;
        const post = await tirarLike(postID, utilizadorId);
        return res.send(post);
    }catch(e){
        const error = e as Error;
        return res.status(400).send(error.message);
    }
  
}

export async function tirarDislikeHandler(req: Request, res : Response){

    try{
        const postID = req.params.idPost;
        const utilizadorId = req.params.idUtilizador;
        const post = await tirarDislike(postID, utilizadorId);
        return res.send(post);
    }catch(e){
        const error = e as Error;
        return res.status(400).send(error.message);
    }
}


export async function fazerDislikeHandler(req: Request, res: Response){

    try{

        const postID = req.params.id;
        const post = await fazerDislike(postID, req.body.utilizadorId);
        return res.send(post);
    }catch(e){
        const error = e as Error;
        return res.status(400).send(error.message);
    }
}

export async function tagCloudByUtilizadorHandler(req: Request, res : Response){
    const utilizador = req.params.idUtilizador;
    const tagCloudNosPosts : string[] = await getTagCloudNosPostsByUtilizador(utilizador);
    return res.send(tagCloudNosPosts);
}

export async function tagCloudHandler(req: Request, res : Response){
    const tagCloudNosPosts : string[] = await getTagCloudNosPosts();
    return res.send(tagCloudNosPosts);
}


export async function deletePostsHandler(req : Request, res : Response){
    const posts = await deleteTodosPosts();
    return res.send(posts);
}

