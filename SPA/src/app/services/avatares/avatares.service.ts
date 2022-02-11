import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvataresService {

  private avatares : string[];

  constructor() {
    this.avatares = ["avatar-1.png", "avatar-2.png", "avatar-3.png", "avatar-4.png", "avatar-5.png", "avatar-6.png", "avatar-7.png", "avatar-8.png"];
  }

  getAvataresDisponiveis():string[]{
    return this.avatares;
  }

  avatarPorDefeito():string{
    return this.avatares[0];
  }
}
