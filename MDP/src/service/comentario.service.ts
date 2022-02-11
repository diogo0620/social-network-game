import { DocumentDefinition } from "mongoose";
import Comentario, {ComentarioDocument} from "../model/comentario.model";
import { getPostById } from "./post.service";


export async function novoComentario(comentario : DocumentDefinition<ComentarioDocument>){
    const post = await getPostById(comentario.postId);

    if(!post)
        throw Error("O post especificado não existe.");
        
    return await Comentario.create(comentario);
}

export async function getTodosComentarios(){
    return await Comentario.find();
}

export async function getComentarioById(id : string){
    return await Comentario.findById(id);
}

export async function getComentarioByPost(postId : string){
    return await Comentario.find({postId: postId}).sort({data : -1});
}

export async function fazerLike(comentarioID: string, utilizadorId : string){

    if(!utilizadorId)
        throw Error("Deve especificar quem fez o like.");

    var likeAnterior = await Comentario.find({_id: comentarioID, reacoes: {$elemMatch: {utilizadorId: utilizadorId, tipo: "LIKE"}}});

    if(likeAnterior.length > 0)
        throw Error("O utilizador já tem um like neste comentario.");
  
    var reacao = {utilizadorId : utilizadorId, data : Date.now(), tipo : "LIKE"};
    return await Comentario.findByIdAndUpdate(comentarioID, {$push: {reacoes : reacao}}, {new: true})
}

export async function fazerDislike(comentarioID : string, utilizadorId : string) {
    if(!utilizadorId)
        throw Error("Deve especificar quem fez o dislike.");

    var likeAnterior = await Comentario.find({_id: comentarioID, reacoes: {$elemMatch: {utilizadorId: utilizadorId, tipo: "DISLIKE"}}});

    if(likeAnterior.length > 0)
        throw Error("O utilizador já tem um dislike neste comentário.");
  
    var reacao = {utilizadorId : utilizadorId, data : Date.now(), tipo : "DISLIKE"};
    return await Comentario.findByIdAndUpdate(comentarioID, {$push: {reacoes : reacao}}, {new: true})
}

export async function tirarLike(comentarioID: string, utilizadorID: string){

    return await Comentario.findByIdAndUpdate(
        comentarioID, 
        {$pull : {"reacoes" : {utilizadorId: utilizadorID, tipo: "LIKE"}}}, 
        {new:true}
        )
}

export async function tirarDislike(comentarioID: string, utilizadorID: string){

    return await Comentario.findByIdAndUpdate(
        comentarioID, 
        {$pull : {"reacoes" : {utilizadorId: utilizadorID, tipo: "DISLIKE"}}}, 
        {new:true}
        )
}

export async function getLikesDoUtilizadorAemComentariosDoUtilizadorB(utilizadorA : string, utilizadorB: string){
    const posts = await Comentario.find({utilizadorId:utilizadorB, reacoes: {$elemMatch: {utilizadorId: utilizadorA, tipo: "LIKE"}}})
    return posts.length;
}

export async function getDislikesDoUtilizadorAemComentariosDoUtilizadorB(utilizadorA : string, utilizadorB: string){
    const posts = await Comentario.find({utilizadorId:utilizadorB, reacoes: {$elemMatch: {utilizadorId: utilizadorA, tipo: "DISLIKE"}}})
    return posts.length;
}

export async function getTagCloudNosComentariosByUtilizador(utilizador : string){
    var tags : string[] = [];
    const comentarios = await Comentario.find({utilizadorId:utilizador});
    comentarios.forEach(c => {
        tags = tags.concat(c.tags);
    })
    return tags;
}

export async function deleteReacoesComentariosByUtilizador(utilizador : string){
    return await Comentario.updateMany({}, {$pull : {"reacoes" : {utilizadorId: utilizador}}});
}


export async function deleteComentariosByUtilizador(utilizador : string){
    return await Comentario.deleteMany({utilizadorId: utilizador});
}



export async function deleteTodosComentarios(){
    return await Comentario.deleteMany();
}



