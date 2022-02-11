import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRede } from 'src/app/interfaces/IRede';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassificacaoService {

  url = environment.baseUrl +"/classificacao";

  constructor(private http: HttpClient) { }

  getClassificacao():Observable<IRede[]>{
    return this.http.get<IRede[]>(this.url);
  }

  ordenarPorDimensao(classficacao : IRede[]):IRede[]{
    classficacao.sort((c1, c2) => {
        if(c1.dimensao > c2.dimensao){
          return -1;
        }else{
          if(c1.dimensao < c2.dimensao){
            return 1
          }else{
            if(c1.fortaleza > c2.fortaleza){
              return -1;
            }else{
              return 1;
            }
          }
        }
    })

    return classficacao;
  }

  ordenarPorFortaleza(classificacao: IRede[]):IRede[]{
    classificacao.sort((c1, c2) => {
      if(c1.fortaleza > c2.fortaleza){
        return -1;
      }else{
        if(c1.fortaleza < c2.fortaleza){
          return 1
        }else{
          if(c1.dimensao > c2.dimensao){
            return -1;
          }else{
            return 1;
          }
        }
      }
  })

  return classificacao;
  }


  

  

}



