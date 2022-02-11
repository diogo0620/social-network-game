import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPedido } from 'src/app/interfaces/IPedido';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PedidosLigacaoService {

  url = environment.baseUrl +"/pedidosLigacao";
  
  constructor(private http: HttpClient) { }

  getTodosPedidosDoUtilizadorAutenticado():Observable<IPedido[]>{
    return this.http.get<IPedido[]>(this.url);
  }

  getPedidosPendentesDoUtilizadorAutenticado():Observable<IPedido[]>{
    return this.http.get<IPedido[]>(this.url+"?estado=pendente");
  }

  getPedidosAceitesDoUtilizadorAutenticado():Observable<IPedido[]>{
    return this.http.get<IPedido[]>(this.url+"?estado=aceite");
  }

  getPedidosRecusadosDoUtilizadorAutenticado():Observable<IPedido[]>{
    return this.http.get<IPedido[]>(this.url+"?estado=recusado");
  }

  getPedidosEnviadosDoUtilizadorAutenticado():Observable<IPedido[]>{
    return this.http.get<IPedido[]>(this.url+"/enviados");
  }

  enviarPedido(paraQuem : string, mensagem : string, tags : string[], forcaLigacao : number):Observable<IPedido>{
    return this.http.post<IPedido>(this.url, {paraUtilizadorId:paraQuem, mensagem: mensagem, tags: tags, forcaLigacao: forcaLigacao});
  }

  aceitarPedido(id : string, tags: string[], forca: number):Observable<IPedido>{
    return this.http.put<IPedido>(this.url+"/"+id,{id:id, estado:"Aceite", tags: tags, forcaLigacao: forca});
  }

  recusarPedido(id : string):Observable<IPedido>{
    return this.http.put<IPedido>(this.url+"/"+id,{id:id, estado:"Recusado"});
  }




}
