import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IPedido } from '../../interfaces/IPedido';
import { PedidosLigacaoService } from '../../services/pedidosLigacao/pedidos-ligacao.service';

@Component({
  selector: 'app-aceitar-pedido-ligacao',
  templateUrl: './aceitar-pedido-ligacao.component.html',
  styleUrls: ['./aceitar-pedido-ligacao.component.css']
})
export class AceitarPedidoLigacaoComponent implements OnInit {

  @Input()pedido!: IPedido;
  @Output() janelaAberta : EventEmitter<boolean> = new EventEmitter();

  formAceitarLigacao : FormGroup;

  aProcessarAceitacao: boolean;


  constructor(private fb : FormBuilder, private pedidosLigacaoService : PedidosLigacaoService, private router : Router) { 

    this.formAceitarLigacao = fb.group({
      'tags':[''],
      'forcaLigacao':['50']
    })

    this.aProcessarAceitacao = false;
  }

  ngOnInit(): void {
    
  }

  cancelar(){
    this.janelaAberta.emit(false);
  }

  aceitar(){

    if(!this.aProcessarAceitacao){
      this.aProcessarAceitacao = true;
      var tags : string = this.formAceitarLigacao.controls['tags'].value;
      const forca = this.formAceitarLigacao.controls['forcaLigacao'].value;
      tags = tags.replace(/\s/g, "");
      const tagsArray = tags.toString().split(",");
  
      this.pedidosLigacaoService.aceitarPedido(this.pedido.id, tagsArray, forca).subscribe(
        (sucesso) => {this.janelaAberta.emit(true);this.aProcessarAceitacao=false},
        (erro) => {       Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: erro.error.message,
          showConfirmButton: false,
          timer: 1500
        });this.aProcessarAceitacao=false;}
      )
    }
 
 
    
  }

}
