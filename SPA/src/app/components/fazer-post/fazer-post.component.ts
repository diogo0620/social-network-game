import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUtilizador } from '../../interfaces/IUtilizador';
import { IPost } from '../../interfaces/IPost';
import { PostsService } from '../../services/posts/posts.service';
import { UtilizadorService } from '../../services/utilizadores/utilizador.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-fazer-post',
  templateUrl: './fazer-post.component.html',
  styleUrls: ['./fazer-post.component.css']
})
export class FazerPostComponent implements OnInit {

  @Output() emitEvent = new EventEmitter();

  utilizador! : IUtilizador;
  utilizadorCarregado : boolean;

  texto : string;
  tags : string;
  aEsperaDeResposta: boolean;

  constructor(private utilizadorService : UtilizadorService, private postsService : PostsService) {
    this.utilizadorCarregado = false;
    this.texto = "";
    this.tags = "";
    this.aEsperaDeResposta = false;
   }

  ngOnInit(): void {
    this.utilizadorService.getUtilizadorAutenticado().subscribe(
      (uti) => {this.utilizador = uti;this.utilizadorCarregado=true;}
    )
  }

  resetCampos(){
    this.texto = "";
    this.tags = "";
  }

  publicar(){
      this.aEsperaDeResposta = true;
      this.tags = this.tags.replace(/\s/g, "");


      const tagsArray  = this.tags.length > 0 ? this.tags.toString().split(","): [];
      const post : IPost = {utilizador : this.utilizador,id: "", texto: this.texto, tags: tagsArray, data!: "" , mostrarComentarios: false, aPublicarComentario:false, comentarios: [], temComentarioDoAutenticado:false, reacoes: [], temLikeDoAutenticado: false, temDislikeDoAutenticado: false, likes: [], dislikes: []}
      this.postsService.novoPost(post).subscribe(
        (sucesso) => {this.emitEvent.next("post feito")},
        (erro) => {Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: erro.error,
          showConfirmButton: false,
          timer: 1500
        }), this.aEsperaDeResposta = false;}
      )
    



  
  }

}
