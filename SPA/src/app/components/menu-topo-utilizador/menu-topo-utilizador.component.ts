import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-topo-utilizador',
  templateUrl: './menu-topo-utilizador.component.html',
  styleUrls: ['./menu-topo-utilizador.component.css']
})
export class MenuTopoUtilizadorComponent implements OnInit {


  pesquisa : string = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }


  irParaInicio(){
    this.router.navigate(['/inicio']);
  }

  irParaPedidos(){
    this.router.navigate(['/pedidos']);
  }
  irParaLigacoes(){
    this.router.navigate(['/ligacoes']);
  }
  irParaPerfil(){
    this.router.navigate(['/perfil']);
  }

  irParaClassificacao(){
    this.router.navigate(['/classificacao']);
  }

  especificarPesquisa(pesquisa : string){
    this.pesquisa = pesquisa;
  }

  pesquisar(){
    this.router.navigate(['/pesquisar/'+this.pesquisa])
  }


}
