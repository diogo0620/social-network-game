import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ILigacao } from '../../interfaces/ILigacao';
import { LigacoesService } from '../../services/ligacoes/ligacoes.service';

@Component({
  selector: 'app-editar-ligacao',
  templateUrl: './editar-ligacao.component.html',
  styleUrls: ['./editar-ligacao.component.css']
})
export class EditarLigacaoComponent implements OnInit {

  @Input()ligacao!: ILigacao;
  @Output() janelaAberta : EventEmitter<boolean> = new EventEmitter();

  formEditarLigacao : FormGroup;

  forcaLigacao : number;

  aProcessarAlteracoes : boolean;

  constructor(private fb : FormBuilder, private ligacoesService : LigacoesService, private router : Router) { 
    this.forcaLigacao = 40;
    this.formEditarLigacao = fb.group({
      'tags':[''],
      'forcaLigacao':[''],
      
    })

    this.aProcessarAlteracoes = false;
  }

  ngOnInit(): void {
    this.formEditarLigacao.patchValue({
      tags: this.ligacao.tags,
      forcaLigacao: this.ligacao.forcaLigacao,
    })

    this.forcaLigacao = this.ligacao.forcaLigacao;
  }

  cancelar(){
    this.janelaAberta.emit(false);
  }

  guardar(){

    if(!this.aProcessarAlteracoes){
      this.aProcessarAlteracoes = true;
      var tags : string = this.formEditarLigacao.controls['tags'].value;
      const forca = this.formEditarLigacao.controls['forcaLigacao'].value;

      tags = tags.toString().replace(/\s/g, "");
      const tagsArray = tags.toString().split(",");
   
      this.ligacoesService.editarLigacao(this.ligacao.id, tagsArray, forca).subscribe(
        (sucesso) => {       Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'A ligação foi editada!',
          showConfirmButton: false,
          timer: 1500
        });this.cancelar();this.aProcessarAlteracoes=false;}, 
        (erro) => {       Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: erro.error.message,
          showConfirmButton: false,
          timer: 1500
        });this.aProcessarAlteracoes=false;})
    }
 
  }

}
