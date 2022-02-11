import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComentario } from 'src/app/interfaces/IComentario';
import { environment } from 'src/environments/environment';

var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  url = environment.baseUrl +"/comentarios";

  constructor(private http: HttpClient) { }

  novoComentario(comentario : IComentario):Observable<IComentario>{
    return this.http.post<IComentario>(this.url, comentario, httpOptions);
  }

  getComentariosByPost(postId : string):Observable<IComentario[]>{
    return this.http.get<IComentario[]>(this.url+"?post="+postId);
  }

  like(comentarioId : string):Observable<IComentario>{
    return this.http.put<IComentario>(this.url+"/"+comentarioId+"/like", comentarioId);
  }

  tirarLike(comentarioID: string):Observable<IComentario>{
    return this.http.delete<IComentario>(this.url+"/"+comentarioID+"/like");
  }

  dislike(comentarioID : string):Observable<IComentario>{
    return this.http.put<IComentario>(this.url+"/"+comentarioID+"/dislike", comentarioID);
  }

  tirarDislike(comentarioID: string):Observable<IComentario>{
    return this.http.delete<IComentario>(this.url+"/"+comentarioID+"/dislike");
  }

}
