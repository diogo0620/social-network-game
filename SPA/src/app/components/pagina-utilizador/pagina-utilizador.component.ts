import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login/login.service';
import { FazerPostComponent } from '../fazer-post/fazer-post.component';
import { FeedPostsComponent } from '../feed-posts/feed-posts.component';
import { MiniClassificacaoComponent } from '../mini-classificacao/mini-classificacao.component';
import { MiniPedidosComponent } from '../mini-pedidos/mini-pedidos.component';
import { MiniPerfilComponent } from '../mini-perfil/mini-perfil.component';
import { MiniSugestoesComponent } from '../mini-sugestoes/mini-sugestoes.component';

@Component({
  selector: 'app-pagina-utilizador',
  templateUrl: './pagina-utilizador.component.html',
  styleUrls: ['./pagina-utilizador.component.css']
})
export class PaginaUtilizadorComponent implements OnInit {


  @ViewChild('fazerPost') fazerPost! : FazerPostComponent;
  @ViewChild('feedPosts') feedPosts! : FeedPostsComponent;
  @ViewChild('pedidos') pedidos! : MiniPedidosComponent;
  @ViewChild('perfil') perfil! : MiniPerfilComponent;
  @ViewChild('sugestoes') sugestoes! : MiniSugestoesComponent;
  @ViewChild('classificacao') classificacoes! : MiniClassificacaoComponent;

  constructor(private loginService : LoginService) {
  
  }

  ngOnInit(): void {
    this.loginService.redirecionarParaLoginSeNaoAutenticado();

    console.log("O utilizado autenticado é o "+localStorage.getItem('idUtilizador'));    
  }

  feitoPost(event : any){
    this.feedPosts.atualizarFeed(true);
  }

  feedAtualizado(event : any){
    this.fazerPost.resetCampos();
    this.fazerPost.aEsperaDeResposta = false;
    Swal.fire({
      position: 'bottom-end',
      icon: 'success',
      title: 'O post foi criado!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  novoAmigo(event : any){
    this.perfil.atualizarDadosLigacoes();
    this.sugestoes.carregarSugestoes();
    this.classificacoes.carregarClassificacoes();
    this.feedPosts.atualizarFeed(false);
    this.pedidos.carregarPedidosLigacao();

    Swal.fire({
      position: 'bottom-end',
      icon: 'success',
      title: 'O pedido foi aceite!',
      showConfirmButton: false,
      timer: 1500
    })
  }
}


