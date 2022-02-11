import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IUtilizador } from '../../interfaces/IUtilizador';
import { PedidosLigacaoService } from '../../services/pedidosLigacao/pedidos-ligacao.service';

@Component({
  selector: 'app-fazer-pedido-ligacao',
  templateUrl: './fazer-pedido-ligacao.component.html',
  styleUrls: ['./fazer-pedido-ligacao.component.css']
})
export class FazerPedidoLigacaoComponent implements OnInit {

  @Input()utilizador!: IUtilizador;
  @Output() janelaAberta : EventEmitter<boolean> = new EventEmitter();


  formPedirLigacao : FormGroup;

  aProcessarEnvio : boolean;



  constructor(private pedidosLigacaoService : PedidosLigacaoService, private fb : FormBuilder) { 
    this.formPedirLigacao = this.fb.group({
      'mensagem':[''],
      'tags':[''],
      'forcaLigacao':['50']
    })

    this.aProcessarEnvio = false;
  }

  ngOnInit(): void {
  }

  cancelar(){
    this.janelaAberta.emit(false);
  }

  enviarPedido(){

    if(!this.aProcessarEnvio){
      this.aProcessarEnvio = true;
      const mensagem = this.formPedirLigacao.controls['mensagem'].value;
      const tags = this.formPedirLigacao.controls['tags'].value;
      const forca = this.formPedirLigacao.controls['forcaLigacao'].value;
      const tagsArray = tags.toString().split(",");
  
      this.pedidosLigacaoService.enviarPedido(this.utilizador.id, mensagem, tagsArray, forca).subscribe(
        (enviado) => {       Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'O pedido foi enviado!',
          showConfirmButton: false,
          timer: 1500
        });this.janelaAberta.emit(true);this.aProcessarEnvio=false;},
        (erro) => {       Swal.fire({
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
