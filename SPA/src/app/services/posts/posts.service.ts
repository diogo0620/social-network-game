import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/interfaces/IPost';
import { environment } from 'src/environments/environment';

var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  url = environment.baseUrl +"/posts";

  constructor(private http: HttpClient) { }

  novoPost(post : IPost):Observable<IPost>{
    return this.http.post<IPost>(this.url, post, httpOptions);
  }

  getPostsByUtilizador(idUtilizador : string):Observable<IPost[]>{
    return this.http.get<IPost[]>(this.url+"?utilizador="+idUtilizador);
  }

  getPostsDoUtilizadorAutenticado():Observable<IPost[]>{
    const id = localStorage.getItem('idUtilizador');
    return this.http.get<IPost[]>(this.url+"?utilizador="+id);
  }

  getPostsDosAmigosDoUtilizadorAutenticado():Observable<IPost[]>{
    const id = localStorage.getItem('idUtilizador');
    return this.http.get<IPost[]>(this.url+"/amigos?utilizador="+id);
  }

  like(postId : string):Observable<IPost>{
    return this.http.put<IPost>(this.url+"/"+postId+"/like", postId);
  }

  tirarLike(postId: string):Observable<IPost>{
    return this.http.delete<IPost>(this.url+"/"+postId+"/like");
  }

  dislike(postId : string):Observable<IPost>{
    return this.http.put<IPost>(this.url+"/"+postId+"/dislike", postId);
  }

  tirarDislike(postId: string):Observable<IPost>{
    return this.http.delete<IPost>(this.url+"/"+postId+"/dislike");
  }





}
