import { DocumentDefinition } from "mongoose";
import Post, { PostDocument } from "../model/post.model";
import { deleteTodosComentarios } from "./comentario.service";

export async function novoPost(post : DocumentDefinition<PostDocument>){

    return await Post.create(post);
}

export async function getTodosPosts(){
    return await Post.find().sort({data:-1});
}

export async function getPostById(id : string){
    return await Post.findById(id);
}

export async function getPostsByUtilizador(idUtilizador : string){
    return await Post.find({utilizadorId: idUtilizador}).sort({data:-1});
}

export async function getPostsByUtilizadores(utilizadores : string[]){
    return await Post.find().sort({data: -1}).where('utilizadorId').in(utilizadores).exec();
}

export async function fazerLike(postID: string, utilizadorId : string){

    if(!utilizadorId)
        throw Error("Deve especificar quem fez o like.");

    var likeAnterior = await Post.find({_id: postID, reacoes: {$elemMatch: {utilizadorId: utilizadorId, tipo: "LIKE"}}});

    if(likeAnterior.length > 0)
        throw Error("O utilizador já tem um like neste post.");
  
    var reacao = {utilizadorId : utilizadorId, data : Date.now(), tipo : "LIKE"};
    return await Post.findByIdAndUpdate(postID, {$push: {reacoes : reacao}}, {new: true})
}

export async function tirarLike(postID: string, utilizadorID: string){

    return await Post.findByIdAndUpdate(
        postID, 
        {$pull : {"reacoes" : {utilizadorId: utilizadorID, tipo: "LIKE"}}}, 
        {new:true}
        )
}

export async function tirarDislike(postID: string, utilizadorID: string){

    return await Post.findByIdAndUpdate(
        postID, 
        {$pull : {"reacoes" : {utilizadorId: utilizadorID, tipo: "DISLIKE"}}}, 
        {new:true}
        )
}

export async function fazerDislike(postID : string, utilizadorId : string) {
    if(!utilizadorId)
        throw Error("Deve especificar quem fez o dislike.");

    var likeAnterior = await Post.find({_id: postID, reacoes: {$elemMatch: {utilizadorId: utilizadorId, tipo: "DISLIKE"}}});

    if(likeAnterior.length > 0)
        throw Error("O utilizador já tem um dislike neste post.");
  
    var reacao = {utilizadorId : utilizadorId, data : Date.now(), tipo : "DISLIKE"};
    return await Post.findByIdAndUpdate(postID, {$push: {reacoes : reacao}}, {new: true})
}

export async function getLikesDoUtilizadorAemPostsDoUtilizadorB(utilizadorA : string, utilizadorB: string){
    const posts = await Post.find({utilizadorId:utilizadorB, reacoes: {$elemMatch: {utilizadorId: utilizadorA, tipo: "LIKE"}}})
    return posts.length;
}

export async function getDislikesDoUtilizadorAemPostsDoUtilizadorB(utilizadorA : string, utilizadorB: string){
    const posts = await Post.find({utilizadorId:utilizadorB, reacoes: {$elemMatch: {utilizadorId: utilizadorA, tipo: "DISLIKE"}}})
    return posts.length;
}

export async function getTagCloudNosPostsByUtilizador(utilizador : string){
    var tags : string[] = [];
    const posts = await getPostsByUtilizador(utilizador);
    posts.forEach(p => {
        tags = tags.concat(p.tags);
    })
    return tags;
}

export async function getTagCloudNosPosts(){
    var tags : string[] = [];
    const posts = await getTodosPosts();
    posts.forEach(p => {
        tags = tags.concat(p.tags);
    })
    return tags;
}

export async function deleteTodosPosts(){
    await deleteTodosComentarios();
    return await Post.deleteMany();
}

export async function deleteReacoesPostsByUtilizador(utilizador : string){
    return await Post.updateMany({}, {$pull : {"reacoes" : {utilizadorId: utilizador}}});
}

export async function deletePostsByUtilizador(utilizador: string)
{
    return await Post.deleteMany({utilizadorId:utilizador});
}

