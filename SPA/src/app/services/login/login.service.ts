import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ISessao } from 'src/app/interfaces/ISessao';
import { IUtilizador } from 'src/app/interfaces/IUtilizador';
import { environment } from 'src/environments/environment';

var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})


export class LoginService {

  url = environment.baseUrl +"/autenticacao";

  constructor(private http: HttpClient, private router : Router) { }


  redirecionarParaLoginSeNaoAutenticado(){
    let data : string = localStorage.getItem('expiracao')!;
    const expiracao : Date = new Date(data);
  
    if (localStorage.getItem('token') == null || localStorage.getItem('expiracao') == null ||  new Date() > expiracao) {
      this.router.navigate(['/']);
    }
  }

  login(utilizador: IUtilizador):Observable<ISessao>{
    return this.http.post<ISessao>(this.url, utilizador, httpOptions)
  }




}
