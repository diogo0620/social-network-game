import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadosEmocionaisService {


  private estadosDisponiveis: string[];

  constructor() {
    this.estadosDisponiveis = ["Alegre", "Angustiado", "Esperancoso", "Medroso", "Aliviado", "Desapontado", "Orgulhoso", "Com_Remorso", "Agradecido", "Zangado"];
   }

   getEstadosEmocionais():string[]{
     return this.estadosDisponiveis;
   }

}
