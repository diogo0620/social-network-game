import sinon from "sinon";
import Comentario from "../../src/model/comentario.model";
import Post from "../../src/model/post.model";

export class Mocking{
    public static post1 : any = { 
        "utilizadorId": "8ecc1fc0-2cfb-451d-87ee-c7164bbf2ab2",
        "texto":"hello",
        "tags": ["AAA"],
        "data":"2012-04-23T18:25:43.511Z"
    
      };
      
    public static post2 : any ={
        "utilizadorId": "000c0-2cfb-451d-87ee-c7164bbf2ab2",
        "texto":"hello world",
        "tags": ["AAA,CCC"],
        "data":"2018-04-23T18:25:43.511Z"
    };

    public static comentario1 : any ={
        "utilizadorId": "000c0-2cfb-451d-87ee-c7164bbf2ab2",
        "texto":"hello world",
        "tags": ["AAA,CCC"],
        "data":"2018-04-23T18:25:43.511Z",
        "postId":"1"
    };

    public static comentario2 : any = { 
        "utilizadorId": "8ecc1fc0-2cfb-451d-87ee-c7164bbf2ab2",
        "texto":"hello",
        "tags": ["AAA"],
        "data":"2012-04-23T18:25:43.511Z",
        "postId":"2"
      };

    
    public static posts = [Mocking.post1, Mocking.post2];
    public static comentarios = [Mocking.comentario1, Mocking.comentario2];
    
    private static semResultados : any = null;

    private static jaIniciou = false;
    
    
    static iniciarMocking(){
        if(!this.jaIniciou){

            const criarPost = sinon.stub(Post, 'create');
            const findPostById = sinon.stub(Post, "findById");
            const findPost = sinon.stub(Post, 'find');
            const findAllPostsResultado : any = {sort: function(){return Mocking.posts;}}
            const findPostByUtilizadorResultado : any = { sort: function(){return Mocking.post1;}}

            const criarComentario = sinon.stub(Comentario, 'create');
            const findComentarioById = sinon.stub(Comentario, "findById");
            const findComentario = sinon.stub(Comentario, 'find');
            const findWithSortResultado1 : any = {sort: function(){return Mocking.comentario1;}}
            const findWithSortResultado2 : any = {sort: function(){return Mocking.comentario2;}}

            criarPost.returns(this.post1);
            findPostById.withArgs("1").returns(this.post1);
            findPostById.withArgs("2").returns(this.post2);
            findPostById.withArgs("3").returns(this.semResultados);
            findPost.returns(findAllPostsResultado);
            findPost.withArgs({utilizadorId:"8ecc1fc0-2cfb-451d-87ee-c7164bbf2ab2"}).returns(findPostByUtilizadorResultado);
            findPost.withArgs({_id:"1"}).returns(findPostByUtilizadorResultado);

            criarComentario.returns(this.comentario1);
            findComentarioById.withArgs("1").returns(this.comentario1);
            findComentarioById.withArgs("2").returns(this.comentario2);
            findComentarioById.withArgs("3").returns(this.semResultados);
            findComentario.withArgs({postId:"1"}).returns(findWithSortResultado1);
            findComentario.withArgs({postId:"2"}).returns(findWithSortResultado2);


            this.jaIniciou = true;
        }
  
    }
    
}






