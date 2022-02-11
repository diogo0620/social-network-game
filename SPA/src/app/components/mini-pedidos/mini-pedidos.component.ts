import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IPedido } from '../../interfaces/IPedido';
import { PedidosIntroducaoService } from '../../services/pedidosIntroducao/pedidos-introducao.service';
import { PedidosLigacaoService } from '../../services/pedidosLigacao/pedidos-ligacao.service';


@Component({
  selector: 'app-mini-pedidos',
  templateUrl: './mini-pedidos.component.html',
  styleUrls: ['./mini-pedidos.component.css']
})
export class MiniPedidosComponent implements OnInit {

  @Output() emitEvent = new EventEmitter();

  tiposPedido = ["Ligação","Introdução" ];
  tipoPedidoSelecionado : string;
  pedidos! : IPedido[];

  pretendeAceitarPedidoLigacao : boolean;
  pedidoParaAceitar!: IPedido;

  aCarregarPedidos : boolean;

  constructor(private pedidosLigacaoService : PedidosLigacaoService, private pedidosIntroducaoService: PedidosIntroducaoService, private router : Router) { 
    this.tipoPedidoSelecionado = "Ligação";
    this.pretendeAceitarPedidoLigacao = false;
    this.aCarregarPedidos = true;
    
  }

  ngOnInit(): void {
    this.carregarPedidosLigacao();
  }

  alterarTipoPedido(tipo: string){
    this.tipoPedidoSelecionado = tipo;

    if(this.tipoPedidoSelecionado == "Ligação"){
      this.carregarPedidosLigacao();
    }else{
      this.carregarPedidosIntroducao();
    }
  }


  carregarPedidosLigacao() : void{
    this.aCarregarPedidos = true;
      this.pedidosLigacaoService.getPedidosPendentesDoUtilizadorAutenticado().subscribe((pedidos) => {
        this.pedidos = pedidos;
        this.pedidos.forEach(p => p.tipo = "Ligação");
        this.aCarregarPedidos = false;
      });
  }

  private carregarPedidosIntroducao():void{
    this.aCarregarPedidos = true;
    this.pedidosIntroducaoService.getTodosPedidosDoUtilizadorAutenticado().subscribe((pedidos) => {
      this.pedidos = pedidos.filter(p => p.estado == "PENDENTE");
      this.pedidos.forEach(p => p.tipo = "Introdução");
      this.aCarregarPedidos = false;
    });
  }

  irParaPerfil(idUtilizador : string){
    this.router.navigate(['/utilizador/'+idUtilizador]);
  }



  aceitarPedido(pedido : IPedido){
    if(pedido.tipo == "Ligação"){
      this.pedidoParaAceitar = pedido;
      this.janelaAceitarLigacao(true);
    }else{
      this.pedidosIntroducaoService.aceitarPedido(pedido.id).subscribe(
        (sucesso) => {this.carregarPedidosIntroducao();       Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'O pedido foi aceite!',
          showConfirmButton: false,
          timer: 1500
        })},
        (erro) => {console.log(erro);}
      )
    }
  }


  recusarPedido(pedido : IPedido){
    if(pedido.tipo == "Ligação"){
      this.pedidosLigacaoService.recusarPedido(pedido.id).subscribe(
        (sucesso) => {this.carregarPedidosLigacao();       Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'O pedido foi recusado!',
          showConfirmButton: false,
          timer: 1500
        })},
        (erro) => {console.log(erro)}
      )
    }else{
      this.pedidosIntroducaoService.recusarPedido(pedido.id).subscribe(
        (sucesso) => {this.carregarPedidosIntroducao();       Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'O pedido foi recusado!',
          showConfirmButton: false,
          timer: 1500
        })},
        (erro) => {console.log(erro)}
      )
    }
  }

  janelaAceitarLigacao(aberta : boolean){
    this.pretendeAceitarPedidoLigacao = aberta;
  }

  respostaAoPedidoLigacao(aceitou : boolean){
    this.pretendeAceitarPedidoLigacao = false;
    if(aceitou){
      this.emitEvent.next("novo amigo.");
    }
  }

  
}


  




