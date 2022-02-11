import { Component, OnInit } from '@angular/core';
import { IUtilizador } from '../../interfaces/IUtilizador';
import { UtilizadorService } from '../../services/utilizadores/utilizador.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LigacoesService } from '../../services/ligacoes/ligacoes.service';
import { ILigacao } from 'src/app/interfaces/ILigacao';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  utilizador! : IUtilizador;
  carregouUtilizador: boolean;
  ligacoes!:ILigacao[];

  opcao_feed : boolean;
  opcao_informacao : boolean;
  opcao_cloud_tags : boolean;
  opcao_editar_perfil: boolean;
  opcao_apagar_conta: boolean;

  opcaoStyle : string[];
  amigos! : ILigacao[];

  aProcessarApagarConta : boolean;

  constructor(private utilizadoresService : UtilizadorService,private router: Router) {
    this.opcaoStyle = ["", "opcao-selecionada", "opcao-nao-selecionada", "opcao-nao-selecionada"];
    this.opcao_feed = true;
    this.opcao_informacao = false;
    this.opcao_editar_perfil = false;
    this.opcao_apagar_conta = false;
    this.carregouUtilizador = false;
    this.opcao_cloud_tags = false;
    this.aProcessarApagarConta = false;
  }

  ngOnInit(): void {
    this.carregarInformacoes(true);
  }

  carregarInformacoes(deveAtualizar : boolean){
      if(deveAtualizar){
        this.utilizadoresService.getUtilizadorAutenticado().subscribe((uti) => {
          this.utilizador = uti;
          this.carregouUtilizador = true;
        })
      }
  }

  opcao(opcao : number){
    this.opcao_feed = false;
    this.opcao_informacao = false;
    this.opcao_editar_perfil = false;
    this.opcao_apagar_conta = false;
    this.opcao_cloud_tags = false;
    this.opcaoStyle[1] = "opcao-nao-selecionada";
    this.opcaoStyle[2] = "opcao-nao-selecionada";
    this.opcaoStyle[3] = "opcao-nao-selecionada";
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
        this.opcao_editar_perfil = true;
        break;
      case 4:
        this.opcao_apagar_conta = true;
        break;
      case 5:
        this.opcao_cloud_tags = true;
        this.opcaoStyle[3] = "opcao-selecionada";
        break;

    }
  }

  apagarConta(){
    if(!this.aProcessarApagarConta){
      this.aProcessarApagarConta = true;
      this.utilizadoresService.apagarMeuUtilizador().subscribe(
        (suc) => {this.aProcessarApagarConta=false;localStorage.clear();this.router.navigate(['/']);}
      )
    }
     
  }

  fecharApagarConta(){
    this.opcao_apagar_conta = false;
  }

  
 
  
      
    



}