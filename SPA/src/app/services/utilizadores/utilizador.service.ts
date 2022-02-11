import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { IUtilizador } from 'src/app/interfaces/IUtilizador';
import { Observable } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';
import { environment } from 'src/environments/environment';
import { ITagCloud } from 'src/app/interfaces/ITagCloud';

var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})
export class UtilizadorService {

  url = environment.baseUrl +"/utilizadores";

  
  constructor(private http: HttpClient) { 

  }

  adicionarUtilizador(utilizador:IUtilizador):Observable<IUtilizador>{
    return this.http.post<IUtilizador>(this.url, utilizador, httpOptions);
  }

  getTodos():Observable<IUtilizador[]>{
    return this.http.get<IUtilizador[]>(this.url);
  }

  getUtilizadoresPorParametros(nome: string, email : string, pais : string, cidade : string):Observable<IUtilizador[]>{
    var query;
    if(nome != "" || email != "" || pais != "" || cidade != ""){
      query = "?";
      if(nome != "")
        query = query+"nome="+nome;

      if(email != "")
        query = query+(query.length > 1?"&&email="+email:"email="+email);
        
      if(pais != "")
        query = query+(query.length > 1?"&&pais="+pais:"pais="+pais);

      if(cidade != "")
        query = query+(query.length > 1?"&&cidade="+cidade:"cidade="+cidade);
    }
    return this.http.get<IUtilizador[]>(this.url+""+query);
  }

  getUtilizadorAutenticado():Observable<IUtilizador>{
    return this.http.get<IUtilizador>(this.url+"/"+localStorage.getItem('idUtilizador'));
  }

  getUtilizadorByID(id: string):Observable<IUtilizador>{
    return this.http.get<IUtilizador>(this.url+"/"+id);
  }

 
  alterarDadosUtilizador(utilizador:IUtilizador):Observable<IUtilizador>{
    return this.http.put<IUtilizador>(this.url+"/"+localStorage.getItem('idUtilizador'),{password: utilizador.password,nome:utilizador.nome,tags:utilizador.tags,facebook:utilizador.facebook==""?null:utilizador.facebook, linkedIn:utilizador.linkedIn==""?null:utilizador.linkedIn, estadoEmocional:utilizador.estadoEmocional, dataNascimento:utilizador.dataNascimento, descricao:utilizador.descricao==""?null:utilizador.descricao,pais:utilizador.pais==""?null:utilizador.pais,cidade:utilizador.cidade==""?null:utilizador.cidade, codigoPaisTelefone: utilizador.codigoPais==""?null:utilizador.codigoPais, numeroTelefone:utilizador.numeroTelemovel==""?null:utilizador.numeroTelemovel, avatar: utilizador.avatar });
  }

  getTagsCloud():Observable<ITagCloud[]>{
    return this.http.get<ITagCloud[]>(this.url+"/tagCloud");
  }

  getTagsCloudDoUtilizadorAutenticado():Observable<ITagCloud[]>{
    return this.http.get<ITagCloud[]>(this.url+"/tagCloud?utilizador="+localStorage.getItem('idUtilizador'));
  }

  apagarMeuUtilizador():Observable<IUtilizador>{
    return this.http.delete<IUtilizador>(this.url);
  }






}
