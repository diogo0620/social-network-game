import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-ligacoes',
  templateUrl: './ligacoes.component.html',
  styleUrls: ['./ligacoes.component.css']
})
export class LigacoesComponent implements OnInit {

  listaAmigos : boolean;
  consultarRede : boolean;
  tagsCloud : boolean;
  sugestoes: boolean;

  opcaoStyle : string[];

  constructor(private authService : LoginService) { 
    this.opcaoStyle = ["", "opcao-selecionada", "opcao-nao-selecionada", "opcao-nao-selecionada", "opcao-nao-selecionada"]
    this.listaAmigos = true;
    this.consultarRede = false;
    this.tagsCloud = false;
    this.sugestoes = false;
  }


  ngOnInit(): void {
    this.authService.redirecionarParaLoginSeNaoAutenticado();
  }

  opcao(opcao : number){
    this.listaAmigos = false;
    this.consultarRede = false;
    this.tagsCloud = false;
    this.sugestoes = false;

    this.opcaoStyle[1] = "opcao-nao-selecionada";
    this.opcaoStyle[2] = "opcao-nao-selecionada";
    this.opcaoStyle[3] = "opcao-nao-selecionada";
    this.opcaoStyle[4] = "opcao-nao-selecionada";
    
    switch(opcao){
      case 1:
        this.listaAmigos = true;
        this.opcaoStyle[1] = "opcao-selecionada";
        break;
      case 2:
        this.consultarRede = true;
        this.opcaoStyle[2] = "opcao-selecionada";
        break;
      case 3:
        this.tagsCloud = true;
        this.opcaoStyle[3] = "opcao-selecionada";
        break;
      case 4:
        this.sugestoes = true;
        this.opcaoStyle[4] = "opcao-selecionada";  
    }
  }


 
}
