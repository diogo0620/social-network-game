import { Component, Input, OnInit } from '@angular/core';
import { ILigacao } from 'src/app/interfaces/ILigacao';

@Component({
  selector: 'app-ligacao',
  templateUrl: './ligacao.component.html',
  styleUrls: ['./ligacao.component.css']
})
export class LigacaoComponent implements OnInit {

  @Input() ligacao! : ILigacao;


  barraLikes : number;
  barraDislikes: number;

  constructor() {
    this.barraLikes = 100;
    this.barraDislikes = 100;
  }

  ngOnInit(): void {


    if(this.ligacao.numeroLikes > this.ligacao.numeroDislikes){
      this.barraDislikes = (this.ligacao.numeroDislikes / this.ligacao.numeroLikes * 100) + 1;
    }else if(this.ligacao.numeroLikes < this.ligacao.numeroDislikes){
      this.barraLikes = (this.ligacao.numeroLikes / this.ligacao.numeroDislikes * 100) + 1;
    }




  }

}
