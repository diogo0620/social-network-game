import { Component, OnInit } from '@angular/core';
import { UtilizadorService } from '../../services/utilizadores/utilizador.service';
import { LigacoesService } from '../../services/ligacoes/ligacoes.service';
import { Router } from '@angular/router';
import { IUtilizador } from '../../interfaces/IUtilizador';

@Component({
  selector: 'app-mini-perfil',
  templateUrl: './mini-perfil.component.html',
  styleUrls: ['./mini-perfil.component.css']
})
export class MiniPerfilComponent implements OnInit {

  utilizador! : IUtilizador;
  nrAmigos : number;
  dimensao : number;
  fortaleza : number;

  dadosCarregados : boolean;
 


  constructor(private utilizadorService : UtilizadorService,private ligacoesService : LigacoesService,private router: Router) { 
     this.dimensao = -1;
     this.fortaleza = -1;
     this.nrAmigos = -1;
     this.dadosCarregados = false;

  }

  ngOnInit(): void {
    this.utilizadorService.getUtilizadorAutenticado().subscribe(
      (uti) => {this.utilizador = uti;}
    );

    this.atualizarDadosLigacoes();
  }

  atualizarDadosLigacoes(){

    var dimTem = -1;
    var fortTem = -1;
    var amiTem = -1;
    
    this.ligacoesService.getInformacoesRedeDoUtilizadorAutenticado().subscribe(
      (rede) => {dimTem = rede.dimensao;fortTem=rede.fortaleza;this.verificarCarregamento(dimTem, fortTem, amiTem)}
    )

    this.ligacoesService.getLigacoesDoUtilizadorAutenticado().subscribe(
      (ligs) => {amiTem = ligs.length;this.verificarCarregamento(dimTem, fortTem, amiTem)}
    )
  }

  // Garantir que todos os valores são atualizado ao mesmo tempo.
  private verificarCarregamento(dimensao : number, fortaleza : number, amigos : number){
    if(dimensao > -1 && fortaleza > -1 && amigos > -1){
      this.dimensao = dimensao;
      this.fortaleza = fortaleza;
      this.nrAmigos = amigos;
      this.dadosCarregados = true;
    }
  }

  irParaPerfil(){
    this.router.navigate(['/perfil']);
  }
}
