import { Component, OnInit } from '@angular/core';
import { IUtilizador } from '../../interfaces/IUtilizador';
import { Router } from '@angular/router';
import { LigacoesService } from '../../services/ligacoes/ligacoes.service';
import { ISugestao } from 'src/app/interfaces/ISugestao';

@Component({
  selector: 'app-mini-sugestoes',
  templateUrl: './mini-sugestoes.component.html',
  styleUrls: ['./mini-sugestoes.component.css']
})
export class MiniSugestoesComponent implements OnInit {

  sugestoes : ISugestao[];
  utilizadorAadicionar!: IUtilizador;

  pretendeEnviarPedidoLigacao : boolean;


  aCalcularSugestoes : boolean;

  constructor(private ligacoesService : LigacoesService, private router : Router) { 
    this.sugestoes = [];
    this.pretendeEnviarPedidoLigacao = false;
    this.aCalcularSugestoes = true;
  }

  ngOnInit(): void {
    this.carregarSugestoes();
  }
  
  carregarSugestoes() : void{
    this.aCalcularSugestoes = true;
    this.sugestoes = [];
    this.ligacoesService.getSugestoes().subscribe(
      (sug) => {this.obterRestantesDados(sug);},
      (erro) => {this.aCalcularSugestoes=false;}
    )
  }

  private obterRestantesDados(utilizadores : IUtilizador[]){
    if(utilizadores.length == 0){
      this.aCalcularSugestoes = false;
    }

    utilizadores.forEach(u => {
      var sugestao : ISugestao = {utilizador:u, amigosEmComum : 0, tagsEmComum : 0}
      var amigosEmComumCalculados : boolean = false;
      var tagsEmComumCalculados : boolean = true;
      
      this.ligacoesService.getAmigosEmComumCom(u.id).subscribe(
        (amigos) => {sugestao.amigosEmComum = amigos.length;amigosEmComumCalculados=true;this.verificarSugestaoCarregada(amigosEmComumCalculados, tagsEmComumCalculados, sugestao, utilizadores.length)},
        () => {amigosEmComumCalculados=true;this.verificarSugestaoCarregada(amigosEmComumCalculados, tagsEmComumCalculados, sugestao, utilizadores.length)}
      )

    })
  }

  private verificarSugestaoCarregada(amigosEmComumCalculados : boolean, tagsEmComumCalculados : boolean, sugestao: ISugestao, numeroSugestoes : number){
    if(amigosEmComumCalculados && tagsEmComumCalculados){
      this.sugestoes.push(sugestao);
      if(this.sugestoes.length == numeroSugestoes){
        this.aCalcularSugestoes = false;
      }
    }
  }

  fazerPedidoLigacao(utilizador : IUtilizador){
    this.utilizadorAadicionar = utilizador;
    this.janelaPedidoLigacao(true);
  }

  irParaPerfil(id: string){
      this.router.navigate(['/utilizador/'+id]);
  }

  janelaPedidoLigacao(aberta : boolean){
    this.pretendeEnviarPedidoLigacao = aberta;
    if(!this.pretendeEnviarPedidoLigacao){
      this.carregarSugestoes();
      this.utilizadorAadicionar = null!;
    }
  }

  private removerSugestaoDaLista(utilizador : IUtilizador){
    this.sugestoes = this.sugestoes.filter(s => !(s.utilizador.id === utilizador.id));
  }

  pedidoFeito(feito : boolean){
    this.pretendeEnviarPedidoLigacao = false;
    if(feito){
      this.removerSugestaoDaLista(this.utilizadorAadicionar);
    }
  }





}
