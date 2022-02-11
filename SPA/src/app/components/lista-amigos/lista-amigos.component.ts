import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ILigacao } from '../../interfaces/ILigacao';
import { LigacoesService } from '../../services/ligacoes/ligacoes.service';

@Component({
  selector: 'app-lista-amigos',
  templateUrl: './lista-amigos.component.html',
  styleUrls: ['./lista-amigos.component.css']
})
export class ListaAmigosComponent implements OnInit {

  janelaEditarLigacao : boolean;
  ligacaoParaEditar! : ILigacao;

  amigos! : ILigacao[];

  constructor(private ligacoesService : LigacoesService,private router : Router) {

    this.janelaEditarLigacao = false;
 
   }

  ngOnInit(): void {
    this.carregarAmigos();
  }

  carregarAmigos(){
    this.ligacoesService.getLigacoesDoUtilizadorAutenticado().subscribe(
      (sucesso) => {this.amigos = sucesso;this.ordenarPorOrdemAlfabetica()},
      (erro) => {       Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: 'Não foi possivel contactar o servidor.',
        showConfirmButton: false,
        timer: 1500
      })}
    )
  }

  private ordenarPorOrdemAlfabetica(){
    this.amigos.sort((a1, a2) => {
      if(a1.utilizadorB.nome > a2.utilizadorB.nome){
        return 1;
      }

      if(a1.utilizadorB.nome < a2.utilizadorB.nome){
        return -1;
      }

      return 0;
      
    })
  }

  irParaPerfil(idUtilizador : string){
    this.router.navigate(['/utilizador/'+idUtilizador]);
  }

  editarLigacao(ligacao : ILigacao){
    this.ligacaoParaEditar = ligacao;
    this.setJanelaEditarLigacao(true);
  }

  setJanelaEditarLigacao(aberta : boolean){
    this.janelaEditarLigacao = aberta;
    if(!this.janelaEditarLigacao){
      this.carregarAmigos();
    }
  }

}
