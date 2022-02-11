import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICaminho } from 'src/app/interfaces/ICaminho';
import { IUtilizador } from 'src/app/interfaces/IUtilizador';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaneamentoService {

  url = environment.baseUrl +"/planeamento";
  
  constructor(private http: HttpClient) { }

  caminhoMaisCurto(para:string,maxLigacoes:number, emocoesProibidas:string):Observable<ICaminho>{
    return this.http.get<ICaminho>(this.url+"/caminhoMaisCurto?para="+para+"&maxLigacoes="+maxLigacoes+"&emocoesProibidas="+emocoesProibidas);
  }

  caminhoMaisCurtoMulticriterio(para:string,maxLigacoes:number,emocoesProibidas:string):Observable<ICaminho>{
    return this.http.get<ICaminho>(this.url+"/caminhoMaisCurtoMulticriterio?para="+para+"&maxLigacoes="+maxLigacoes+"&emocoesProibidas="+emocoesProibidas);
  }

  caminhoMaisForte(para:string,maxLigacoes:number,emocoesProibidas:string):Observable<ICaminho>{
    return this.http.get<ICaminho>(this.url+"/caminhoMaisForte?para="+para+"&maxLigacoes="+maxLigacoes+"&emocoesProibidas="+emocoesProibidas);
  }

  caminhoMaisForteMulticriterio(para:string,maxLigacoes:number,emocoesProibidas:string):Observable<ICaminho>{
    return this.http.get<ICaminho>(this.url+"/caminhoMaisForteMulticriterio?para="+para+"&maxLigacoes="+maxLigacoes+"&emocoesProibidas="+emocoesProibidas);
  }

  caminhoMaisSeguro(para:string,maxLigacoes:number, forcaMinima: number,emocoesProibidas:string):Observable<ICaminho>{
    return this.http.get<ICaminho>(this.url+"/caminhoMaisSeguro?para="+para+"&forcaMinima="+forcaMinima+"&maxLigacoes="+maxLigacoes+"&emocoesProibidas="+emocoesProibidas);
  }

  caminhoMaisSeguroMulticriterio(para:string,maxLigacoes:number, forcaMinima: number,emocoesProibidas:string):Observable<ICaminho>{
    return this.http.get<ICaminho>(this.url+"/caminhoMaisSeguroMulticriterio?para="+para+"&forcaMinima="+forcaMinima+"&maxLigacoes="+maxLigacoes+"&emocoesProibidas="+emocoesProibidas);
  }

  caminhoDfs(para:string,maxLigacoes:number,emocoesProibidas:string):Observable<ICaminho>{
    return this.http.get<ICaminho>(this.url+"/dfs?para="+para+"&maxLigacoes="+maxLigacoes+"&emocoesProibidas="+emocoesProibidas);
  }

  caminhoDfsMulticriterio(para:string,maxLigacoes:number,emocoesProibidas:string):Observable<ICaminho>{
    return this.http.get<ICaminho>(this.url+"/dfsMulticriterio?para="+para+"&maxLigacoes="+maxLigacoes+"&emocoesProibidas="+emocoesProibidas);
  }

  caminhoAstar(para:string,maxLigacoes:number,emocoesProibidas:string):Observable<ICaminho>{
    return this.http.get<ICaminho>(this.url+"/aStar?para="+para+"&maxLigacoes="+maxLigacoes+"&emocoesProibidas="+emocoesProibidas);
  }

  caminhoAstarMulticriterio(para:string,maxLigacoes:number,emocoesProibidas:string):Observable<ICaminho>{
    return this.http.get<ICaminho>(this.url+"/aStarMulticriterio?para="+para+"&maxLigacoes="+maxLigacoes+"&emocoesProibidas="+emocoesProibidas);
  }

  caminhoBestFirst(para:string,maxLigacoes:number,emocoesProibidas:string):Observable<ICaminho>{
    return this.http.get<ICaminho>(this.url+"/bestFirst?para="+para+"&maxLigacoes="+maxLigacoes+"&emocoesProibidas="+emocoesProibidas);
  }

  caminhoBestFirstMulticriterio(para:string,maxLigacoes:number,emocoesProibidas:string):Observable<ICaminho>{
    return this.http.get<ICaminho>(this.url+"/bestFirstMulticriterio?para="+para+"&maxLigacoes="+maxLigacoes+"&emocoesProibidas="+emocoesProibidas);
  }

  




}
