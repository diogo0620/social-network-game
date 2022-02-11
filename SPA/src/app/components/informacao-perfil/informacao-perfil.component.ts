import { Component, Input, OnInit } from '@angular/core';
import { IUniform } from 'three';
import { IUtilizador } from '../../interfaces/IUtilizador';

@Component({
  selector: 'app-informacao-perfil',
  templateUrl: './informacao-perfil.component.html',
  styleUrls: ['./informacao-perfil.component.css']
})
export class InformacaoPerfilComponent implements OnInit {

  @Input() uti! : IUtilizador;

  constructor() { }

  ngOnInit(): void {
    
  }

  abrirPagina(url : string){
    window.open(url, "_blank");
  }

}
