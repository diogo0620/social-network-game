import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPedido } from 'src/app/interfaces/IPedido';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidosIntroducaoService {

  url = environment.baseUrl +"/pedidosIntroducao";

  constructor(private http: HttpClient) { }

  getTodosPedidosDoUtilizadorAutenticado():Observable<IPedido[]>{
    return this.http.get<IPedido[]>(this.url);
  }

  enviarPedido(intermediario: string, paraQuem : string, mensagemLigacao : string,mensagemIntroducao: string, tags : string[], forcaLigacao : number):Observable<IPedido>{
    return this.http.post<IPedido>(this.url, {paraUtilizadorId:intermediario, utilizadorObjetivoId: paraQuem, mensagemLigacao: mensagemLigacao,mensagemIntroducao: mensagemIntroducao, tags: tags, forcaLigacao: forcaLigacao});
  }

  aceitarPedido(id : string):Observable<IPedido>{
    return this.http.put<IPedido>(this.url+"/"+id,{id:id, estado:"Aceite"});
  }

  recusarPedido(id : string):Observable<IPedido>{
    return this.http.put<IPedido>(this.url+"/"+id,{id:id, estado:"Recusado"});
  }
}
