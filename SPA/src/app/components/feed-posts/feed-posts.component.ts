import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IComentario } from '../../interfaces/IComentario';
import { IPost } from '../../interfaces/IPost';
import { IUtilizador } from '../../interfaces/IUtilizador';
import { ComentariosService } from '../../services/comentarios/comentarios.service';
import { PostsService } from '../../services/posts/posts.service';
import { UtilizadorService } from '../../services/utilizadores/utilizador.service';

@Component({
  selector: 'app-feed-posts',
  templateUrl: './feed-posts.component.html',
  styleUrls: ['./feed-posts.component.css']
})
export class FeedPostsComponent implements OnInit {

  @Output() emitEvent = new EventEmitter();
  @Input() utilizador! : IUtilizador;
  autenticado! : IUtilizador;

  posts : IPost[];
  aCarregarPosts: boolean;
  comentario: string;
  tags: string;

  aProcessarLikePost: boolean;
  aProcessarDislikePost : boolean;

  aProcessarLikeComentario : boolean;
  aProcessarDislikeComentario : boolean;


  constructor(private router : Router,private utilizadoresService : UtilizadorService ,private postsService : PostsService, private comentariosService : ComentariosService) {
    this.posts = [];
    this.aCarregarPosts = true;
    this.comentario = "",
    this.tags = "";

    this.aProcessarLikePost = false;
    this.aProcessarDislikePost = false;

    this.aProcessarLikeComentario = false;
    this.aProcessarDislikeComentario = false;
   }

  ngOnInit(): void {
    this.utilizadoresService.getUtilizadorAutenticado().subscribe(
      (suc) => {this.autenticado = suc;}
    )

    if(this.utilizador){
      this.postsService.getPostsByUtilizador(this.utilizador.id).subscribe(
        (listaPosts) => {this.posts = listaPosts;this.carregarNumeroReacoes()},
        () => {this.aCarregarPosts=false;}
      )
    }else{
      this.atualizarFeed(false);
    }

 
  }

  irParaPerfil(id: string){
    this.router.navigate(['/utilizador/'+id]);
  }

  atualizarFeed(depoisDePostPoublicado : boolean){
    this.postsService.getPostsDosAmigosDoUtilizadorAutenticado().subscribe(
      (listaPosts) => {this.posts = listaPosts;this.carregarNumeroReacoes();if(depoisDePostPoublicado){this.emitEvent.next("feed atualizado")}},
      () => this.aCarregarPosts = false
    )
  }


  like(post : IPost){

    if(!this.aProcessarLikePost){
      this.aProcessarLikePost = true;
      this.postsService.like(post.id).subscribe(
        (suc) => {post.reacoes = suc.reacoes; this.carregarLikesDislikes(post);this.aProcessarLikePost=false;},
        (err) => {console.log(err), Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: err.error,
          showConfirmButton: false,
          timer: 1500
        });this.aProcessarLikePost=false;}
      )
    }

  }

  likeNoComentario(comentario : IComentario){

    if(!this.aProcessarLikeComentario){
      this.aProcessarLikeComentario = true;
      this.comentariosService.like(comentario.id).subscribe(
        (suc) => {comentario.reacoes = suc.reacoes, this.carregarLikesDislikesComentario(comentario);this.aProcessarLikeComentario=false;},
        (err) => {console.log(err), Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: err.error,
          showConfirmButton: false,
          timer: 1500
        });this.aProcessarLikeComentario=false;}
      )
    }

  }

  tirarLike(post : IPost){

    if(!this.aProcessarLikePost){
      this.aProcessarLikePost = true;
      this.postsService.tirarLike(post.id).subscribe(
        (suc) => {post.reacoes = suc.reacoes; this.carregarLikesDislikes(post);this.aProcessarLikePost=false;},
        (err) => {console.log(err);this.aProcessarLikePost=false;}
      )
    }
 
  }

  tirarLikeNoComentario(comentario : IComentario){

    if(!this.aProcessarLikeComentario){
      this.aProcessarLikeComentario = true;
      this.comentariosService.tirarLike(comentario.id).subscribe(
        (suc) => {comentario.reacoes = suc.reacoes; this.carregarLikesDislikesComentario(comentario);this.aProcessarLikeComentario=false},
        (err) => {console.log(err);this.aProcessarLikeComentario=false}
      )
    }
 
  }



  dislike(post : IPost){

    if(!this.aProcessarDislikePost){
      this.aProcessarDislikePost = true;
      this.postsService.dislike(post.id).subscribe(
        (suc) => {post.reacoes = suc.reacoes; this.carregarLikesDislikes(post);this.aProcessarDislikePost=false;},
        (err) => {console.log(err), Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: err.error,
          showConfirmButton: false,
          timer: 1500
        });this.aProcessarDislikePost=false;}
      )
    }
  
  }

  dislikeNoComentario(comentario : IComentario){

    if(!this.aProcessarDislikeComentario){
      this.aProcessarDislikeComentario = true;
      this.comentariosService.dislike(comentario.id).subscribe(
        (suc) => {comentario.reacoes = suc.reacoes; this.carregarLikesDislikesComentario(comentario);this.aProcessarDislikeComentario = false;},
        (err) => {console.log(err), Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: err.error,
          showConfirmButton: false,
          timer: 1500
        });this.aProcessarDislikeComentario = false;}
      )
    }
 
  }

  tirarDislike(post : IPost){

    if(!this.aProcessarDislikePost){
      this.aProcessarDislikePost = true;
      this.postsService.tirarDislike(post.id).subscribe(
        (suc) => {post.reacoes = suc.reacoes; this.carregarLikesDislikes(post);this.aProcessarDislikePost = false;},
        (err) => {console.log(err);this.aProcessarDislikePost = false;}
      )
    }
 
  }

  tirarDislikeNoComentario(comentario : IComentario){

    if(!this.aProcessarDislikeComentario){
      this.aProcessarDislikeComentario = true;
      this.comentariosService.tirarDislike(comentario.id).subscribe(
        (suc) => {comentario.reacoes = suc.reacoes; this.carregarLikesDislikesComentario(comentario);this.aProcessarDislikeComentario = false;},
        (err) => {console.log(err);this.aProcessarDislikeComentario = false;}
      )
    }
  
  }

  comentarios(post : IPost){
    post.mostrarComentarios = !post.mostrarComentarios;
    if(post.mostrarComentarios){
      this.carregarComentarios(post, false);
    } 
  }

  private verificarCarregamento(numeroCarregamentos : number){
    if(numeroCarregamentos == this.posts.length){
      this.aCarregarPosts = false;
    }
  }

  private carregarNumeroReacoes(){
    var numeroReacoes = 0;

    if(this.posts.length == 0){
      this.aCarregarPosts = false;
    }
    
    this.posts.forEach(p => {
      this.carregarLikesDislikes(p);

      this.comentariosService.getComentariosByPost(p.id).subscribe(
        (suc) => {p.comentarios = suc;this.verificarSeJáComentou(p), numeroReacoes++;p.comentarios.forEach(c => this.carregarLikesDislikesComentario(c));;this.verificarCarregamento(numeroReacoes)}
      )
    })
  }

  private carregarLikesDislikes(post : IPost){
    post.likes = post.reacoes.filter(p => p.tipo === "LIKE");
    post.dislikes = post.reacoes.filter(p => p.tipo === "DISLIKE");

    var temLike = post.likes.find(l => l.utilizador.id === this.autenticado.id);
    var temDislike = post.dislikes.find(l => l.utilizador.id === this.autenticado.id);

    if(temLike){
      post.temLikeDoAutenticado = true;
    }else{
      post.temLikeDoAutenticado = false;
    }
      
    if(temDislike){
      post.temDislikeDoAutenticado = true;  
    }else{
      post.temDislikeDoAutenticado = false;
    }

   
      
  }

  private verificarSeJáComentou(post : IPost){
    const r = post.comentarios.find(c => c.utilizador.id === this.autenticado.id);
 
    if(r){
      post.temComentarioDoAutenticado = true;
    }else{
      post.temComentarioDoAutenticado = false;
    }
  }

  private carregarLikesDislikesComentario(c : IComentario){
    c.likes = c.reacoes.filter(p => p.tipo === "LIKE");
    c.dislikes = c.reacoes.filter(p => p.tipo === "DISLIKE");

    var temLike = c.likes.find(l => l.utilizador.id === this.autenticado.id);
    var temDislike = c.dislikes.find(l => l.utilizador.id === this.autenticado.id);

    if(temLike){
      c.temLikeDoAutenticado = true;
    }else{
      c.temLikeDoAutenticado = false;
    }
      
    if(temDislike){
      c.temDislikeDoAutenticado = true;  
    }else{
      c.temDislikeDoAutenticado = false;
    }

  
  }

  private carregarComentarios(post : IPost, depoisDePublicado: boolean){
    this.comentariosService.getComentariosByPost(post.id).subscribe(
      (suc) => {post.comentarios = suc;
        post.comentarios.forEach(c => this.carregarLikesDislikesComentario(c));
        
        if(depoisDePublicado){
        this.comentarioPublicado(post);
      }},
      (err) => {console.log(err)}
    )
  }

  private comentarioPublicado(post: IPost){
    Swal.fire({
      position: 'bottom-end',
      icon: 'success',
      title: 'O comentário foi publicado!',
      showConfirmButton: false,
      timer: 1500
    });
    post.temComentarioDoAutenticado = true;
    this.comentario = "";
    this.tags = "";
    post.aPublicarComentario=false;
  }

  publicar(post : IPost){
    post.aPublicarComentario = true;
    const tgs = this.tags.replace(/\s/g, "");

   
    const tagsArray  = tgs.length > 0 ? tgs.toString().split(",") : [] ;
    var comentario : IComentario = {idPost: post.id,data:"",id:"",tags:tagsArray, texto:this.comentario, utilizador:this.utilizador, reacoes: [], likes: [], dislikes: [], temDislikeDoAutenticado: false, temLikeDoAutenticado: false};
    this.comentariosService.novoComentario(comentario).subscribe(
      (sucesso) => {this.carregarComentarios(post, true)},
      (erro) => {console.log(erro)
        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: erro.error,
          showConfirmButton: false,
          timer: 1500
        });post.aPublicarComentario=false;

      }
    )

  }

}
