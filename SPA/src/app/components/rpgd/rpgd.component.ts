import { Component, OnInit,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-rpgd',
  templateUrl: './rpgd.component.html',
  styleUrls: ['./rpgd.component.css']
})
export class RpgdComponent implements OnInit {
  @Output() janelaAberta : EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  fechar(){
    this.janelaAberta.emit(false);
  }

}
