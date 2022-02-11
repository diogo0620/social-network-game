import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ILigacao } from '../../interfaces/ILigacao';
import { IUtilizador } from '../../interfaces/IUtilizador';
import { LigacoesService } from '../../services/ligacoes/ligacoes.service';
import { UtilizadorService } from '../../services/utilizadores/utilizador.service';
import { PlaneamentoService } from '../../services/planeamento/planeamento.service';

@Component({
  selector: 'app-amigos-comum',
  templateUrl: './amigos-comum.component.html',
  styleUrls: ['./amigos-comum.component.css']
})
export class AmigosComumComponent implements OnInit {

  @Input() paraUtilizadorID! : string;
 
  amigosEmComum:IUtilizador[];
  aProcurar: boolean;
  
  constructor(private ligacoesService : LigacoesService) {
    this.amigosEmComum=[];
    this.aProcurar=false;
   }

  ngOnInit(): void {
    this.carregarAmigosEmComum();
  }
  
  private carregarAmigosEmComum(){
    this.aProcurar=true;
    this.ligacoesService.getAmigosEmComumCom(this.paraUtilizadorID).subscribe(
      (lista) => {this.amigosEmComum = lista;this.aProcurar=false},
      () => {this.aProcurar = false;}
    )
  }
  
 

}
