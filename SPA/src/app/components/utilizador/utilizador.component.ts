import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ILigacao } from '../../interfaces/ILigacao';
import { IPedido } from '../../interfaces/IPedido';
import { IUtilizador } from '../../interfaces/IUtilizador';
import { LigacoesService } from '../../services/ligacoes/ligacoes.service';
import { PedidosLigacaoService } from '../../services/pedidosLigacao/pedidos-ligacao.service';
import { UtilizadorService } from '../../services/utilizadores/utilizador.service';

@Component({
  selector: 'app-utilizador',
  templateUrl: './utilizador.component.html',
  styleUrls: ['./utilizador.component.css']
})
export class UtilizadorComponent implements OnInit {


  utilizador!: IUtilizador;
  pedido! : IPedido;
  ligacao! : ILigacao;


  pretendeEnviarPedidoLigacao : boolean;
  pretendeEditarLigacao : boolean;
  pretendeAceitarPedido : boolean;
  pretendeEnviarPedidoIntroducao: boolean;



  saoAmigos : boolean;
  temPedido : boolean;
  enviouPedido : boolean;

  carregouUtilizador: boolean;

  opcao_feed : boolean;
  opcao_informacao : boolean;
  opcao_caminhos : boolean;
  opcao_amigos_comum : boolean;
  opcao_ligacao: boolean;

  opcaoStyle : string[];

  verificouAmizade : boolean;
  verificouPedidoRecebido : boolean;
  verificouPedidoEnviado : boolean;


  constructor(private fb : FormBuilder, private utilizadoresService : UtilizadorService,private ligacoesService : LigacoesService,private pedidosService : PedidosLigacaoService, private route : ActivatedRoute, private router : Router) {
    this.pretendeEnviarPedidoLigacao = false;
    this.pretendeEditarLigacao = false;
    this.pretendeAceitarPedido = false;
    this.pretendeEnviarPedidoIntroducao = false;
    this.saoAmigos = false;
    this.temPedido = false;
    this.enviouPedido = false;
    this.opcao_feed = true;
    this.opcao_informacao = false;
    this.opcao_caminhos = false;
    this.opcao_amigos_comum = false;
    this.opcao_ligacao = false;
    this.carregouUtilizador = false;
    this.verificouAmizade = false;
    this.verificouPedidoEnviado = false;
    this.verificouPedidoRecebido = false;
    this.opcaoStyle = ["", "opcao-selecionada", "opcao-nao-selecionada", "opcao-nao-selecionada","opcao-nao-selecionada", "opcao-nao-selecionada"];


  }

  ngOnInit(): void {

    this.carregarInformacoes();
  }

  private carregarInformacoes(){
    this.route.params.subscribe((params) => {
      if(params['idUtilizador'] == localStorage.getItem('idUtilizador')){
        this.router.navigate(['/perfil']);
      }else{


      this.utilizadoresService.getUtilizadorByID(params['idUtilizador']).subscribe((uti) => {
        this.utilizador = uti;
        this.carregouUtilizador = true;
        this.ligacoesService.getLigacoesDoUtilizadorAutenticado().subscribe((ligacoes) => {
          this.saoAmigos = false;
          for(var l of ligacoes){
            if(l.utilizadorB.id== this.utilizador.id){
              this.ligacao = l;
              this.saoAmigos = true;
              break;
            }
          }

          this.verificouAmizade = true;


        
          if(!this.saoAmigos){
            this.verificouPedidoRecebido = true;
            this.pedidosService.getPedidosPendentesDoUtilizadorAutenticado().subscribe((pedidos) => {
              this.temPedido = false;
              for(var p of pedidos){
                if(p.deUtilizador.id == this.utilizador.id && p.estado == "PENDENTE"){
                  this.temPedido = true;
                  this.pedido = p;
                  break;
                }
              }

              this.verificouPedidoRecebido = true;

            })
          }else{
            this.verificouPedidoRecebido = true;
          }

          

          if(!this.temPedido){
            this.pedidosService.getPedidosEnviadosDoUtilizadorAutenticado().subscribe(
              (pedidos) => {
                for(var p of pedidos){
                  if(p.paraUtilizador.id == this.utilizador.id && p.estado == 'PENDENTE'){
                    this.enviouPedido = true;
                  }
                }

                this.verificouPedidoEnviado = true;
              }
            )
          }else{
            this.verificouPedidoEnviado = true;
          }

        })
      })}
    })
  
  

  }

  private atualizarLigacao(){
    this.ligacoesService.getLigacoesDoUtilizadorAutenticado().subscribe((ligacoes) => {
      for(var l of ligacoes){
        if(l.utilizadorB.id== this.utilizador.id){
          this.ligacao = l;
          break;
        }
      }
    })
  }

  opcao(opcao : number){
    if(this.opcao_feed){
      this.atualizarLigacao();
    }


    this.opcao_feed = false;
    this.opcao_informacao = false;
    this.opcao_caminhos = false;
    this.opcao_amigos_comum = false;
    this.opcao_ligacao = false;
    this.opcaoStyle[1] = "opcao-nao-selecionada";
    this.opcaoStyle[2] = "opcao-nao-selecionada";
    this.opcaoStyle[3] = "opcao-nao-selecionada";
    this.opcaoStyle[4] = "opcao-nao-selecionada";
    this.opcaoStyle[5] = "opcao-nao-selecionada";
    switch(opcao){
      case 1:
        this.opcao_feed = true;
        this.opcaoStyle[1] = "opcao-selecionada";
        break;
      case 2:
        this.opcao_informacao = true;
        this.opcaoStyle[2] = "opcao-selecionada";
        break;
      case 3:
        this.opcao_caminhos = true;
        this.opcaoStyle[3] = "opcao-selecionada";
        break;  
      case 4:
        this.opcao_amigos_comum = true;
        this.opcaoStyle[4] = "opcao-selecionada";
        break; 
      case 5:
        this.opcao_ligacao = true;
        this.opcaoStyle[5] = "opcao-selecionada";
        break;
    }
  }


  recusarPedido(){
    this.pedidosService.recusarPedido(this.pedido.id).subscribe(
      (sucesso) => {this.temPedido=false;Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'O pedido foi recusado.',
        showConfirmButton: false,
        timer: 1500
      })},
      (erro) => {console.log(erro)},
    )
  }

  aceitarPedido(){
    this.janelaAceitarLigacao(true);
  }

  editarLigacao(){
    this.janelaEditarLigacao(true);
  }

  pedidoFeito(feito : boolean){
    this.pretendeEnviarPedidoLigacao = false;
    if(feito){
      this.saoAmigos = false;
      this.temPedido = false;
      this.enviouPedido = true;
    }
  }

  respostaAoPedidoLigacao(feito : boolean){
    this.pretendeAceitarPedido = false;
    if(feito){
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'O pedido foi aceite!',
        showConfirmButton: false,
        timer: 1500
      })
      this.saoAmigos = true;
      this.temPedido = false;
      this.enviouPedido = false;
    }
  }

  janelaPedidoLigacao(deveAparecer : boolean){
    this.pretendeEnviarPedidoLigacao = deveAparecer;
    if(!this.pretendeEnviarPedidoLigacao){
      this.saoAmigos = false;
      this.temPedido = false;
      this.enviouPedido = false;
      this.carregarInformacoes();
    }
  }

  janelaPedidoIntroducao(deveAparecer : boolean){
    this.pretendeEnviarPedidoIntroducao = deveAparecer;
  }

  janelaEditarLigacao(deveAparecer : boolean){
    this.pretendeEditarLigacao = deveAparecer;
    if(!this.pretendeEditarLigacao){
      this.carregarInformacoes();
    }
  }

  janelaAceitarLigacao(deveAparecer : boolean){
    this.pretendeAceitarPedido = deveAparecer;
    if(!this.pretendeAceitarPedido){
      this.saoAmigos = false;
      this.temPedido = false;
      this.enviouPedido = false;
      this.carregarInformacoes();
    }
  }


}
