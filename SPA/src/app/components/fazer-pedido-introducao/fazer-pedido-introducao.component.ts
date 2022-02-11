import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { IUtilizador } from '../../interfaces/IUtilizador';
import { LigacoesService } from '../../services/ligacoes/ligacoes.service';
import { PedidosIntroducaoService } from '../../services/pedidosIntroducao/pedidos-introducao.service';

@Component({
  selector: 'app-fazer-pedido-introducao',
  templateUrl: './fazer-pedido-introducao.component.html',
  styleUrls: ['./fazer-pedido-introducao.component.css']
})
export class FazerPedidoIntroducaoComponent implements OnInit {

  @Input()utilizador!: IUtilizador;
  @Output() janelaAberta : EventEmitter<boolean> = new EventEmitter();

  aPesquisarAmigosEmComum : boolean;
  intermediarios : IUtilizador[];
  formPedirLigacao : FormGroup;

  aProcessarEnvio : boolean;


  constructor(private pedidosIntroducaoService : PedidosIntroducaoService, private fb : FormBuilder, private ligacoesService : LigacoesService) { 
    this.formPedirLigacao = fb.group({
      'intermediario':[''],
      'mensagemIntroducao':[''],
      'mensagemLigacao':[''],
      'tags':[''],
      'forcaLigacao':['50']
    })
    this.intermediarios = [];
    this.aPesquisarAmigosEmComum = true;

    this.aProcessarEnvio = false;
  }

  ngOnInit(): void {
    this.ligacoesService.getAmigosEmComumCom(this.utilizador.id).subscribe(
      (amgs) => {this.intermediarios = amgs;
        if(this.intermediarios.length == 0){
          this.cancelar();
          Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            title: 'Não é possivel enviar pedido introdução (não tem amigos em comum).',
            showConfirmButton: false,
            timer: 1500
          });
        };this.aPesquisarAmigosEmComum=false;
      },
      (erro) => {console.error(erro);this.cancelar()}
    )
  }

  cancelar(){
    this.janelaAberta.emit(false);
  }

  enviarPedido(){

    if(!this.aProcessarEnvio){
      this.aProcessarEnvio = true;
      const intermediario = this.formPedirLigacao.controls['intermediario'].value;
      const mensagemIntroducao = this.formPedirLigacao.controls['mensagemIntroducao'].value;
      const mensagemLigacao = this.formPedirLigacao.controls['mensagemLigacao'].value;
      const tags = this.formPedirLigacao.controls['tags'].value;
      const forca = this.formPedirLigacao.controls['forcaLigacao'].value;
      const tagsArray = tags.toString().split(",");
  
      this.pedidosIntroducaoService.enviarPedido(intermediario, this.utilizador.id, mensagemLigacao, mensagemIntroducao, tagsArray, forca).subscribe(
        (sucesso) => {            Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'O pedido de introdução foi enviado.',
          showConfirmButton: false,
          timer: 1500
        });this.cancelar();this.aProcessarEnvio=false;},
        (erro) => {console.log(erro);            Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: erro.error.message,
          showConfirmButton: false,
          timer: 1500
        });this.aProcessarEnvio=false;}
      )
    }
 


  }


}
