import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstadosEmocionaisService } from 'src/app/services/estadosEmocionais/estados-emocionais.service';
import Swal from 'sweetalert2';
import { ICaminho } from '../../interfaces/ICaminho';
import { PlaneamentoService } from '../../services/planeamento/planeamento.service';
import { UtilizadorService } from '../../services/utilizadores/utilizador.service';

@Component({
  selector: 'app-caminhos',
  templateUrl: './caminhos.component.html',
  styleUrls: ['./caminhos.component.css']
})
export class CaminhosComponent implements OnInit {

  @Input() paraUtilizadorID! : string;

  tiposCaminho : string[];
  tipoCaminhoSelecionado : string;
  forcaMinimaLigacao : number;

  caminho: ICaminho;
  aCalcular: boolean;

  considerarForcaRelacao : boolean;
  considerarEstadosEmocionais:boolean;
  maximoLigacoes: number;

  definicoes: boolean;

  opcoesAtuaisForca : boolean;
  opcoesAtuaisEmocao : boolean;
  maximoLigacoesAtual : number;
  dfsAtual : boolean;
  aStarAtual : boolean;
  bestFSAtual : boolean;


  dfs : boolean;
  aStar : boolean;
  bestFS : boolean;

  emocoes : string[];

  emocaoProibida : boolean[];


  constructor(private planeamentoService : PlaneamentoService,private router: Router, private emocoesService : EstadosEmocionaisService) { 
    this.tiposCaminho = ["Mais Curto", "Mais Forte", "Mais Seguro", "Primeira Solucao"];
    this.tipoCaminhoSelecionado = this.tiposCaminho[0];
    this.forcaMinimaLigacao = 1;
    this.maximoLigacoes = 10;
    this.aCalcular = false;
    this.considerarEstadosEmocionais = false;
    this.considerarForcaRelacao = false;
    this.caminho = {ligacoes : [], numeroNos:0, forcaLigacaoTotal:0,forcaRelacaoTotal:0,custoMinimo:0,custoTotal:0};
    this.definicoes = false;
    this.emocoes = emocoesService.getEstadosEmocionais();
    this.emocaoProibida = [false,false,false,false,false,false,false,false,false,false];
    this.dfs = true;
    this.aStar = false;
    this.bestFS = false;
    this.opcoesAtuaisEmocao = false;
    this.opcoesAtuaisForca = false;
    this.dfsAtual = true;
    this.aStarAtual = false;
    this.bestFSAtual = false;
    this.maximoLigacoesAtual = 10;
  }

  ngOnInit(): void {
    this.carregarCaminho();
  }

  irParaPerfil(id: string){
    this.router.navigate(['/utilizador/'+id]);
  }

  fecharDefinicoes(){
    this.definicoes = false;
    this.maximoLigacoes = this.maximoLigacoesAtual;
    this.considerarEstadosEmocionais = this.opcoesAtuaisEmocao;
    this.considerarForcaRelacao = this.opcoesAtuaisForca;
    this.dfs = this.dfsAtual;
    this.aStar = this.aStarAtual;
    this.bestFS = this.bestFSAtual;
  }

  guardarDefinicoes(){
    if(this.maximoLigacoes < 1){
      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: 'O valor máximo de ligações é inválido.',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      this.definicoes = false;
      if(this.dfs){
        this.tiposCaminho = ["Mais Curto", "Mais Forte", "Mais Seguro", "Primeira Solucao"];
      }else{
        this.tiposCaminho = ["Primeira Solucao"];
        this.tipoCaminhoSelecionado = this.tiposCaminho[0];
      }
      this.carregarCaminho();
    }
 
  }

  janelaDefinicoes(){
    var deveAbrir = !this.definicoes;
    if(deveAbrir){
      this.opcoesAtuaisForca = this.considerarForcaRelacao;
      this.opcoesAtuaisEmocao = this.considerarEstadosEmocionais;
      this.maximoLigacoesAtual = this.maximoLigacoes;
      this.dfsAtual = this.dfs;
      this.aStarAtual = this.aStar;
      this.bestFSAtual = this.bestFS;
    }
    this.definicoes = deveAbrir;
  }

  private carregarCaminho(){
  
    this.caminho.ligacoes = [];
    this.aCalcular = true;

    var emocoesProib = "";
    if(this.considerarEstadosEmocionais){
      emocoesProib = this.fazerStringComEmocoesProibidas();
      
    }

    
    if(this.tipoCaminhoSelecionado == this.tiposCaminho[0]){

      if(!this.considerarForcaRelacao){
        this.planeamentoService.caminhoMaisCurto(this.paraUtilizadorID,this.maximoLigacoes,emocoesProib).subscribe(
          (sucesso) => {this.caminho = sucesso;this.aCalcular=false},
          (erro) => {this.aCalcular = false;}
        )
      }else{
        this.planeamentoService.caminhoMaisCurtoMulticriterio(this.paraUtilizadorID,this.maximoLigacoes, emocoesProib).subscribe(
          (sucesso) => {this.caminho = sucesso;this.aCalcular=false},
          (erro) => {this.aCalcular = false;}
        )
      }
    
    }else{
      if(this.tipoCaminhoSelecionado == this.tiposCaminho[1]){


        if(!this.considerarForcaRelacao){
          this.planeamentoService.caminhoMaisForte(this.paraUtilizadorID,this.maximoLigacoes, emocoesProib).subscribe(
            (sucesso) => {this.caminho = sucesso; this.aCalcular= false;},
            (erro) => {this.aCalcular = false;}
          )
        }else{
          this.planeamentoService.caminhoMaisForteMulticriterio(this.paraUtilizadorID,this.maximoLigacoes, emocoesProib).subscribe(
            (sucesso) => {this.caminho = sucesso; this.aCalcular= false;},
            (erro) => {this.aCalcular = false;}
          )
        }
     
      }else{
        if(this.tipoCaminhoSelecionado == this.tipoCaminhoSelecionado[2]){

        if(!this.considerarForcaRelacao){
          this.planeamentoService.caminhoMaisSeguro(this.paraUtilizadorID,this.maximoLigacoes, this.forcaMinimaLigacao, emocoesProib).subscribe(
            (sucesso) => {this.caminho = sucesso, this.aCalcular= false;},
            (erro) => {this.aCalcular = false;}
          )
        }else{
          this.planeamentoService.caminhoMaisSeguroMulticriterio(this.paraUtilizadorID,this.maximoLigacoes, this.forcaMinimaLigacao, emocoesProib).subscribe(
            (sucesso) => {this.caminho = sucesso, this.aCalcular= false;},
            (erro) => {this.aCalcular = false;}
          )
        }
      
      }else{
        
        if(this.dfs){
          if(!this.considerarForcaRelacao){
            this.planeamentoService.caminhoDfs(this.paraUtilizadorID, this.maximoLigacoes, emocoesProib).subscribe(
              (sucesso) => {this.caminho = sucesso; this.aCalcular = false},
              (erro) => {this.aCalcular = false;}
            )
          }else{
            this.planeamentoService.caminhoDfsMulticriterio(this.paraUtilizadorID, this.maximoLigacoes, emocoesProib).subscribe(
              (sucesso) => {this.caminho = sucesso; this.aCalcular = false},
              (erro) => {this.aCalcular = false;}
            )
          }
        }else{
          if(this.aStar){
            if(!this.considerarForcaRelacao){
              this.planeamentoService.caminhoAstar(this.paraUtilizadorID, this.maximoLigacoes, emocoesProib).subscribe(
                (sucesso) => {this.caminho = sucesso; this.aCalcular = false},
                (erro) => {this.aCalcular = false;}
              )
            }else{
              this.planeamentoService.caminhoAstarMulticriterio(this.paraUtilizadorID, this.maximoLigacoes, emocoesProib).subscribe(
                (sucesso) => {this.caminho = sucesso; this.aCalcular = false},
                (erro) => {this.aCalcular = false;}
              )
            }


          }else{
            if(!this.considerarForcaRelacao){
              this.planeamentoService.caminhoBestFirst(this.paraUtilizadorID, this.maximoLigacoes, emocoesProib).subscribe(
                (sucesso) => {this.caminho = sucesso; this.aCalcular = false},
                (erro) => {this.aCalcular = false;}
              )
            }else{
              this.planeamentoService.caminhoBestFirstMulticriterio(this.paraUtilizadorID, this.maximoLigacoes, emocoesProib).subscribe(
                (sucesso) => {this.caminho = sucesso; this.aCalcular = false},
                (erro) => {this.aCalcular = false;}
              )
            }

          }
        }






      }
    }
    }
  
  }


  alterarTipoCaminho(tipoCaminho : string){
    this.tipoCaminhoSelecionado = tipoCaminho;
    this.carregarCaminho();
  }

  alterarForcaMinimaLigacao(forcaMinima : number){
      this.forcaMinimaLigacao = forcaMinima;
      this.carregarCaminho();
  }

  private fazerStringComEmocoesProibidas():string{
    var emocoesProibidas = "";
    var index = 0;

    this.emocaoProibida.forEach(e => {
      
      if(e){
        if(emocoesProibidas.length == 0){
          emocoesProibidas = this.emocoes[index];
        }else{
          emocoesProibidas = emocoesProibidas + ","+this.emocoes[index];
        }
        
      }
      index++;
    })

    return emocoesProibidas;
  }

  alterarAlgoritmo(selecionado : number){
    this.dfs = false;
    this.bestFS = false;
    this.aStar = false;
    switch(selecionado){
      case 1:
        this.dfs = true;
        break;
      case 2:
        this.aStar = true;
        break;
      case 3:
        this.bestFS = true; 
    }
  }
  

 

}
