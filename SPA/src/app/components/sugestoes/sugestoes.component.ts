import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUtilizador } from 'src/app/interfaces/IUtilizador';
import { ISugestaoGrupo } from '../../interfaces/ISugestaoGrupo';
import { LigacoesService } from '../../services/ligacoes/ligacoes.service';

@Component({
  selector: 'app-sugestoes',
  templateUrl: './sugestoes.component.html',
  styleUrls: ['./sugestoes.component.css']
})
export class SugestoesComponent implements OnInit {


  tiposSugestao : string[];
  tipoSugestaoSelecionada : string;
  numeroTagsUtilizadores : number;

  numeroUtilizadoresGrupo : number;
  numeroTagsGrupo : number;
  tagsObrigatoriasGrupo: string;

  sugestoesGrupos : ISugestaoGrupo[];
  aProcurarSugestoesGrupos : boolean;

  sugestoesUtilizadores : IUtilizador[];
  aProcurarSugestoesUtilizador : boolean;

  constructor(private ligacoesService : LigacoesService, private router : Router) {
    this.tiposSugestao = ["Utilizadores", "Grupos"];
    this.tipoSugestaoSelecionada = this.tiposSugestao[0];
    this.numeroTagsUtilizadores = 1;
    this.numeroTagsGrupo = 1;
    this.numeroUtilizadoresGrupo = 1;
    this.tagsObrigatoriasGrupo = "";
    this.sugestoesGrupos = [];
    this.aProcurarSugestoesGrupos = false;
    this.sugestoesUtilizadores = [];
    this.aProcurarSugestoesUtilizador = false;
   }

  ngOnInit(): void {
    this.procurarSugestoes();
  }

  private procurarSugestoes(){
    if(this.tipoSugestaoSelecionada == this.tiposSugestao[0]){
      this.procurarSugestoesUtilizadores();
    }else{
      this.procurarSugestoesGrupo();
    }
  }

  private procurarSugestoesUtilizadores(){
    this.aProcurarSugestoesUtilizador = true;
    this.ligacoesService.getSugestoesUtilizadores(this.numeroTagsUtilizadores).subscribe(
      (suc) => {this.sugestoesUtilizadores = suc;this.aProcurarSugestoesUtilizador=false},
      (erro) => {this.aProcurarSugestoesUtilizador=false}
    )
  }

  private procurarSugestoesGrupo(){
    this.aProcurarSugestoesGrupos = true;
    this.ligacoesService.getSugestoesGrupo(this.numeroUtilizadoresGrupo, this.numeroTagsGrupo, this.tagsObrigatoriasGrupo).subscribe(
      (suc) => {this.sugestoesGrupos = suc;this.aProcurarSugestoesGrupos=false},
      (erro) => {this.aProcurarSugestoesGrupos=false}
    )
  }

  alterarTipoSugestao(tipo: any){

    if(this.tipoSugestaoSelecionada != tipo){
      this.tipoSugestaoSelecionada = tipo;
      this.procurarSugestoes();
    }
    
  }
  
  
  
  alterarNumeroTagsEmComumUtilizador(numero: any){
    if(this.numeroTagsUtilizadores != numero){
      this.numeroTagsUtilizadores = numero;
      this.procurarSugestoesUtilizadores();
    }
    
  }

  alterarNumeroUtilizadoresGrupo(numero: any){
    if(this.numeroUtilizadoresGrupo != numero){
      this.numeroUtilizadoresGrupo = numero;
      this.procurarSugestoesGrupo();
    }
  }

  alterarNumeroTagsEmComumGrupo(numero: any){
    if(this.numeroTagsGrupo != numero){
      this.numeroTagsGrupo = numero;
      this.procurarSugestoesGrupo();
    }
  }

  alterarTagsObrigatoriasGrupo(tags: any){
    this.tagsObrigatoriasGrupo = tags.toString();
    this.procurarSugestoesGrupo();
  }

  verDetalhes(sugestaoGrupo : ISugestaoGrupo){
    sugestaoGrupo.verDetalhes = !sugestaoGrupo.verDetalhes;
  }

  irParaPerfil(id: string){
    this.router.navigate(['/utilizador/'+id]);
}

}
