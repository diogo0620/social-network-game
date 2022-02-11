import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IPedido } from '../../interfaces/IPedido';
import { LoginService } from '../../services/login/login.service';
import { PedidosIntroducaoService } from '../../services/pedidosIntroducao/pedidos-introducao.service';
import { PedidosLigacaoService } from '../../services/pedidosLigacao/pedidos-ligacao.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {


  ligacaoPendentes : boolean;
  ligacaoAceites : boolean;
  ligacaoRecusados: boolean;

  introducaoPendentes : boolean;
  introducaoAceites : boolean;
  introducaoRecusados : boolean;

  pedidos : IPedido[];

  pretendeAceitarPedidoLigacao : boolean;
  pedidoLigacaoParaAceitar!: IPedido;


  constructor(private pedidosLigacaoService: PedidosLigacaoService, private pedidosIntroducaoService: PedidosIntroducaoService, private loginService : LoginService, private router : Router) {
    this.ligacaoPendentes = true;
    this.ligacaoAceites = false;
    this.ligacaoRecusados = false;
    this.introducaoPendentes = true;
    this.introducaoAceites = false;
    this.introducaoRecusados = false;
    this.pedidos = [];
    this.pretendeAceitarPedidoLigacao = false;
  }


  ngOnInit(): void {
    this.loginService.redirecionarParaLoginSeNaoAutenticado();
    this.carregarPedidos();
  }


  carregarPedidos(){

    this.pedidos = [];

    var aceites : IPedido[] = [];
    var recusados : IPedido[] = [];
    var pendentes : IPedido[] = [];
    if(this.ligacaoAceites || this.ligacaoPendentes || this.ligacaoRecusados){
        this.pedidosLigacaoService.getTodosPedidosDoUtilizadorAutenticado().subscribe((res) => {
          aceites = res.filter(p => p.estado === "ACEITE");
          recusados = res.filter(p => p.estado === "RECUSADO");
          pendentes = res.filter(p => p.estado === "PENDENTE");

          if(this.ligacaoAceites){
           aceites.forEach(a => this.pedidos.push(a));
          }

          if(this.ligacaoPendentes){
            pendentes.forEach(p => this.pedidos.push(p));
          }

          if(this.ligacaoRecusados){
            recusados.forEach(r => this.pedidos.push(r));
          }

          this.pedidos.sort((p1, p2) => {
            if(p1.data < p2.data){
              return 1;
            }else{
              if(p1.data > p2.data){
                return -1;
              }
              return 0;
            }
          })

          res.forEach(p => p.tipo = "Ligação");



        })
    }


    if(this.introducaoAceites || this.introducaoPendentes || this.introducaoRecusados){
      this.pedidosIntroducaoService.getTodosPedidosDoUtilizadorAutenticado().subscribe((res) => {
        res.forEach(p => p.tipo = "Introdução")

        aceites = res.filter(p => p.estado == "ACEITE");
        recusados = res.filter(p => p.estado == "RECUSADO");
        pendentes = res.filter(p => p.estado == "PENDENTE");

        if(this.introducaoAceites){
          aceites.forEach(a => this.pedidos.push(a));
        }

        if(this.introducaoPendentes){
          pendentes.forEach(p => this.pedidos.push(p));
        }

        if(this.introducaoRecusados){
          recusados.forEach(r => this.pedidos.push(r));
        }

        this.pedidos.sort((p1, p2) => {
          if(p1.data < p2.data){
            return 1;
          }else{
            if(p1.data > p2.data){
              return -1;
            }
            return 0;
          }
        })
      })
    }


  }

  checkBoxAlterada(index: number, values:any):void {

    switch(index){
      case 1:
        this.ligacaoPendentes = values.currentTarget.checked;
        break;
      case 2:
        this.ligacaoAceites = values.currentTarget.checked;
        break;
      case 3:
        this.ligacaoRecusados = values.currentTarget.checked;
        break;
      case 4:
        this.introducaoPendentes = values.currentTarget.checked;
        break; 
      case 5:
        this.introducaoAceites = values.currentTarget.checked;
        break;
      case 6:
        this.introducaoRecusados = values.currentTarget.checked;
        break;
    }

    this.carregarPedidos();
   
  }

  irParaPerfil(idUtilizador : string){
    this.router.navigate(['/utilizador/'+idUtilizador]);
  }



  aceitarPedido(pedido : IPedido){

    if(pedido.tipo == 'Ligação'){
      this.pedidoLigacaoParaAceitar = pedido;
      this.janelaAceitarLigacao(true);
    }else{
      this.pedidosIntroducaoService.aceitarPedido(pedido.id).subscribe(
        (sucesso) => {this.carregarPedidos(); Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'O pedido foi aceite!',
          showConfirmButton: false,
          timer: 1500
        })},
        (erro) => {console.log(erro)}
      )
    }
      

    
  }

  recusarPedido(pedido : IPedido){
    if(pedido.tipo == 'Ligação'){
      this.pedidosLigacaoService.recusarPedido(pedido.id).subscribe(
        (sucesso) => {this.carregarPedidos(); Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'O pedido foi recusado!',
          showConfirmButton: false,
          timer: 1500
        })},
        (erro) => {console.log(erro);}
      )
    }else{
      this.pedidosIntroducaoService.recusarPedido(pedido.id).subscribe(
        (sucesso) => {this.carregarPedidos(); Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'O pedido foi recusado!',
          showConfirmButton: false,
          timer: 1500
        })},
        (erro) => {console.log(erro);}
      )
    }
  }

  janelaAceitarLigacao(aberta : boolean){
    this.pretendeAceitarPedidoLigacao = aberta;
    if(!this.pretendeAceitarPedidoLigacao){
      this.carregarPedidos();
    }
  }




}
