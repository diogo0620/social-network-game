import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilizadorService } from 'src/app/services/utilizadores/utilizador.service';
import { IRede } from '../../interfaces/IRede';
import { ClassificacaoService } from '../../services/classificacoes/classificacao.service';

@Component({
  selector: 'app-mini-classificacao',
  templateUrl: './mini-classificacao.component.html',
  styleUrls: ['./mini-classificacao.component.css']
})
export class MiniClassificacaoComponent implements OnInit {

  tipoClassificacao : string[];
  tipoClassificacaoSelecionada : string;
  dados : IRede[];
  classificacao: IRede[];
  aCarregar : boolean;

  opcaoStyle : string[];

  constructor(private classificaoService : ClassificacaoService, private router : Router) {
    this.opcaoStyle = [];
    this.tipoClassificacao = ["Dimensão", "Fortaleza"];
    this.tipoClassificacaoSelecionada = this.tipoClassificacao[0];
    this.classificacao = [];
    this.dados = [];
    this.aCarregar = true;
   }

  ngOnInit(): void {
   this.carregarClassificacoes();
  }

  carregarClassificacoes(){
    this.classificaoService.getClassificacao().subscribe(
      (res) => {this.dados = res;this.aCarregar=false;this.ordenarPorTipoClassificacao()},
      (err) => {this.aCarregar=false}
    )
  }


  private ordenarPorTipoClassificacao(){
    if(this.tipoClassificacaoSelecionada == this.tipoClassificacao[0]){
      this.classificacao = this.classificaoService.ordenarPorDimensao(this.dados).slice(0, 5);
      
    }else{
      this.classificacao = this.classificaoService.ordenarPorFortaleza(this.dados).slice(0,5);
    }
    this.verificarAutenticadoExiste();
  }

  verificarAutenticadoExiste(){
    var index = 0;
    const utilizadorAutenticado = localStorage.getItem('idUtilizador');
    this.classificacao.forEach(c => {
      if(c.utilizador.id === utilizadorAutenticado){
        this.opcaoStyle[index] = "utilizador-autenticado";
      }else{
        this.opcaoStyle[index] = "utilizador";
      }

      index++;
    })
  }

  alterarTipoClassificacao(tipo : string){
    this.tipoClassificacaoSelecionada = tipo;
    this.ordenarPorTipoClassificacao();
  }

  irParaPerfil(id: string){
    this.router.navigate(['/utilizador/'+id]);
  }

}
