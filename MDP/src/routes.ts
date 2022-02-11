import { Express, Request, Response } from "express";
import { criarComentarioHandler,deleteComentariosHandler,fazerDislikeComentarioHandler,fazerLikeComentarioHandler,getTodosComentariosHandler, tirarDislikeComentarioHandler, tirarLikeComentarioHandler } from "./controller/comentario.controller";
import { tagCloudByUtilizadorHandler, tagCloudHandler, criarPostHandler, deletePostsHandler,  fazerDislikeHandler,  fazerLikeHandler, getPostByIdHandler, getTodosPostsHandler, tirarDislikeHandler, tirarLikeHandler } from "./controller/post.controller";
import { deleteTudoByUtilizadorHandler, diferencaDeLikesDislikesEntreUtilizadores } from "./controller/sistema.controller";
import validateRequest from "./middleware/validateRequest";
import { criarComentarioSchema } from "./schemas/comentario.schema";
import { criarPostSchema } from "./schemas/post.schema";


export default function(app : Express){
    app.get('/teste', (req:Request, res:Response) => {
        return res.sendStatus(200);
    });

    app.post("/api/posts", validateRequest(criarPostSchema), criarPostHandler);
    app.get("/api/posts", getTodosPostsHandler);
    app.get("/api/posts/tags", tagCloudHandler);
    app.get("/api/posts/tags/:idUtilizador", tagCloudByUtilizadorHandler);
    app.get("/api/posts/:id", getPostByIdHandler);
    app.delete("/api/posts", deletePostsHandler);
    app.put("/api/posts/:id/like", fazerLikeHandler);
    app.put("/api/posts/:id/dislike", fazerDislikeHandler);
    app.delete("/api/posts/:idPost/:idUtilizador/like", tirarLikeHandler);
    app.delete("/api/posts/:idPost/:idUtilizador/dislike", tirarDislikeHandler);
    //app.get("/api/posts/tags/:idUtilizador", tagCloudByUtilizadorHandler);
    


    app.get("/api/comentarios", getTodosComentariosHandler);
    app.post("/api/comentarios", validateRequest(criarComentarioSchema), criarComentarioHandler);
    app.delete("/api/comentarios", deleteComentariosHandler);
    app.put("/api/comentarios/:id/like", fazerLikeComentarioHandler);
    app.put("/api/comentarios/:id/dislike", fazerDislikeComentarioHandler);
    app.delete("/api/comentarios/:idComentario/:idUtilizador/like", tirarLikeComentarioHandler);
    app.delete("/api/comentarios/:idComentario/:idUtilizador/dislike", tirarDislikeComentarioHandler);

    app.delete("/api/all/:idUtilizador", deleteTudoByUtilizadorHandler);
    app.get("/api/diferencaReacoes", diferencaDeLikesDislikesEntreUtilizadores);


}





