
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILigacao } from 'src/app/interfaces/ILigacao';
import { IRede } from 'src/app/interfaces/IRede';
import { ITagCloud } from 'src/app/interfaces/ITagCloud';
import { IUtilizador } from 'src/app/interfaces/IUtilizador';
import { environment } from 'src/environments/environment';
import { IUniform } from 'three';
import { ISugestaoGrupo } from '../../interfaces/ISugestaoGrupo';

@Injectable({
  providedIn: 'root'
})
export class LigacoesService {
  
  url = environment.baseUrl +"/ligacoes";
  
  constructor(private http: HttpClient) { }

  getLigacoesDoUtilizadorAutenticado():Observable<ILigacao[]>{
    return this.http.get<ILigacao[]>(this.url);
  }

  getRedeDoUtilizadorAutenticado(nivel : number):Observable<ILigacao[][]>{
    return this.http.get<ILigacao[][]>(this.url+"/rede?nivel="+nivel);
  }

  getRedeByUtilizador(utilizadorId : string, nivel : number):Observable<ILigacao[][]>{
    return this.http.get<ILigacao[][]>(this.url+"/rede?utilizador="+utilizadorId+"&nivel="+nivel);
  }

  getDimensaoDaRedeDoUtilizadorAutenticado():Observable<number>{
    return this.http.get<number>(this.url+"/dimensao");
  }

  getFortalezaDaRedeDoUtilizadorAutenticado():Observable<number>{
    return this.http.get<number>(this.url+"/fortaleza");
  }

  getInformacoesRedeDoUtilizadorAutenticado():Observable<IRede>{
    return this.http.get<IRede>(this.url+"/rede/informacao");
  }

  editarLigacao(idLigacao : string, tags : string[], forcaLigacao : number):Observable<ILigacao>{
    return this.http.put<ILigacao>(this.url+"/"+idLigacao, {id: idLigacao, tags: tags, forcaLigacao : forcaLigacao});
  }
  getLigacoesByUtilizador(idUtilizador : string):Observable<ILigacao[]>{
    return this.http.get<ILigacao[]>(this.url+"?utilizador="+idUtilizador);
  }

  getAmigosEmComumCom(idUtilizador : string):Observable<IUtilizador[]>{
    return this.http.get<IUtilizador[]>(this.url+"/emComum?utilizadorB="+idUtilizador);
  }

  getSugestoes():Observable<IUtilizador[]>{
    return this.http.get<IUtilizador[]>(this.url+"/sugestoes");
  }

  getTagCloudDoAutenticado():Observable<ITagCloud[]>{
    const utilizador = localStorage.getItem('idUtilizador');
    return this.http.get<ITagCloud[]>(this.url+"/tagCloud?utilizador="+utilizador);
  }

  getTagCloud():Observable<ITagCloud[]>{
    return this.http.get<ITagCloud[]>(this.url+"/tagCloud");
  }

  getSugestoesGrupo(numeroUtilizadores: number, numeroTags: number, tagsObrigatorias: string):Observable<ISugestaoGrupo[]>{
    return this.http.get<ISugestaoGrupo[]>(this.url+"/sugestoesGrupos?numeroTags="+numeroTags+"&numeroUtilizadores="+numeroUtilizadores+"&tagsObrigatorias="+tagsObrigatorias)
  }

  getSugestoesUtilizadores(numeroTags:number):Observable<IUtilizador[]>{
    return this.http.get<IUtilizador[]>(this.url+"/sugestoesUtilizadores?numeroTags="+numeroTags);
  }

  apagarMinhasLigacoes():Observable<number>{
    return this.http.delete<number>(this.url);
  }
}
