import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRede } from '../../interfaces/IRede';
import { ClassificacaoService } from '../../services/classificacoes/classificacao.service';

@Component({
  selector: 'app-classificacao',
  templateUrl: './classificacao.component.html',
  styleUrls: ['./classificacao.component.css']
})
export class ClassificacaoComponent implements OnInit {
  opcaoDimensao : boolean;
  opcaoFortaleza: boolean;
  opcaoCloudTagsUtilizadores : boolean;
  opcaoCloudTagsLigacoes : boolean;
  classificacoes : IRede[];

  aCarregar : boolean;
  opcaoStyle : string[];
  classificacaoStyle : string[];

  constructor(private classificacaoService : ClassificacaoService, private router : Router) {
    this.opcaoStyle = ["", "opcao-selecionada", "opcao-nao-selecionada", "opcao-nao-selecionada", "opcao-nao-selecionada"];
    this.classificacaoStyle = [];
    this.opcaoDimensao = true;
    this.opcaoFortaleza = false;
    this.opcaoCloudTagsUtilizadores = false;
    this.opcaoCloudTagsLigacoes = false;
    this.classificacoes = [];
    this.aCarregar = true;
   }

  ngOnInit(): void {
    this.classificacaoService.getClassificacao().subscribe(
      (clss) => {this.classificacoes = clss;this.ordenar();this.aCarregar=false;}
    )
  }

  private ordenar(){
    if(this.opcaoDimensao){
      this.classificacoes = this.classificacaoService.ordenarPorDimensao(this.classificacoes);
    }else{
      this.classificacoes = this.classificacaoService.ordenarPorFortaleza(this.classificacoes);
    }

    this.verificarAutenticadoExiste();
  }

  private verificarAutenticadoExiste(){
    var index = 0;
    const utilizadorAutenticado = localStorage.getItem('idUtilizador');
    this.classificacoes.forEach(c => {
      if(c.utilizador.id === utilizadorAutenticado){
        this.classificacaoStyle[index] = "utilizador-autenticado";
      }else{
        this.classificacaoStyle[index] = "utilizador";
      }

      index++;
    })
  }

  opcao(opcao : number){
    this.opcaoDimensao = false;
    this.opcaoFortaleza = false;
    this.opcaoCloudTagsUtilizadores = false;
    this.opcaoCloudTagsLigacoes = false;

    this.opcaoStyle[1] = "opcao-nao-selecionada";
    this.opcaoStyle[2] = "opcao-nao-selecionada";
    this.opcaoStyle[3] = "opcao-nao-selecionada";
    this.opcaoStyle[4] = "opcao-nao-selecionada";
    
    switch(opcao){
      case 1:
        this.opcaoDimensao = true;
        this.opcaoStyle[1] = "opcao-selecionada";
        this.ordenar();
        break;
      case 2:
        this.opcaoFortaleza= true;
        this.opcaoStyle[2] = "opcao-selecionada";
        this.ordenar();
        break;
      case 3:
        this.opcaoCloudTagsUtilizadores = true; 
        this.opcaoStyle[3] = "opcao-selecionada";
        break;
      case 4:
        this.opcaoCloudTagsLigacoes = true; 
        this.opcaoStyle[4] = "opcao-selecionada";
        break;


    }

    
  }

  irParaPerfil(id : string){
    this.router.navigate(['/utilizador/'+id]);
  }

}
