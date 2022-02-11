import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUtilizador } from '../../interfaces/IUtilizador';
import { EstadosEmocionaisService } from '../../services/estadosEmocionais/estados-emocionais.service';
import { LoginService } from '../../services/login/login.service';
import { UtilizadorService } from '../../services/utilizadores/utilizador.service';
import Swal from 'sweetalert2';
import { AvataresService } from '../../services/avatares/avatares.service';


@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.css']
})
export class AutenticacaoComponent implements OnInit {


  formRegisto: FormGroup;
  formLogin: FormGroup;
  estadosEmocionais : string[];
  rgpd : boolean;
  utilizadoresCarregados: boolean;
  nrUtilizadores:number;

  aProcessarRegisto : boolean;

  
  constructor(private fb: FormBuilder,private router: Router, private utilizadorService:UtilizadorService, private estadosEmocionaisService:EstadosEmocionaisService,private avataresService:AvataresService, private loginService:LoginService) { 
    this.formRegisto = this.fb.group({
      'email':['',[Validators.email, Validators.required]],
      'password':['', [Validators.required]],
      'confirmarPassword':['',[Validators.required]],
      'estadoEmocional':['', [Validators.required]],
      'dataNascimento':['', [Validators.required]],
      'nome':[''],
      'tags':['', [Validators.required]],
      'gdprCheck': ['', [Validators.requiredTrue]]
    })

    this.formLogin = this.fb.group({
      'email':['', [Validators.email, Validators.required]],
      'password':['', [Validators.required]]
    })
    this.estadosEmocionais = estadosEmocionaisService.getEstadosEmocionais();
    this.rgpd=false;
    this.utilizadoresCarregados=false;
    this.nrUtilizadores=0;
    this.aProcessarRegisto = false;
  }

  ngOnInit(): void {
    let data : string = localStorage.getItem('expiracao')!;
    const expiracao : Date = new Date(data);
  
    if (localStorage.getItem('token') != null && new Date() < expiracao) {
      this.router.navigate(['/inicio']);
    }

    this.carregarUtilizadores();
    
  }
  carregarUtilizadores(){
    this.utilizadorService.getTodos().subscribe(
      (utis) => {this.nrUtilizadores = utis.length;
      this.utilizadoresCarregados=true;}
    )
  }
  fazerRegisto(){
    const utilizador : IUtilizador = this.formRegisto.value;
    var tags:string = this.formRegisto.value.tags;

    utilizador.avatar = this.avataresService.avatarPorDefeito();

    utilizador.tags =  tags.toString().split(",");
    this.registar(utilizador);
    
  }

  fazerLogin(){
    const utilizador = this.formLogin.value;
    this.login(utilizador);

  }

  registar(utilizador : IUtilizador){


    if(!this.aProcessarRegisto){
      this.aProcessarRegisto = true;
      if(this.formRegisto.get('confirmarPassword')?.value == this.formRegisto.get('password')?.value){
        this.utilizadorService.adicionarUtilizador(utilizador).subscribe(() => {
          this.carregarUtilizadores();
          this.formRegisto.reset();
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: 'Registado com sucesso!',
            showConfirmButton: false,
            timer: 1500
          });
          this.aProcessarRegisto = false;
        }, (error) => {
          console.error(error);
          if(error.status == 0){
            Swal.fire({
              position: 'bottom-end',
              icon: 'error',
              title: 'Não foi possivel contactar o servidor.',
              showConfirmButton: false,
              timer: 1500
            });
            this.aProcessarRegisto = false;
          }else{
            Swal.fire({
              position: 'bottom-end',
              icon: 'error',
              title: error.error.message,
              showConfirmButton: false,
              timer: 1500
            });
            this.aProcessarRegisto = false;
          }

          
        })


    }else{
      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: 'As duas passwords não coincidem!',
        showConfirmButton: false,
        timer: 1500
      });
      this.aProcessarRegisto = false;
    }
    }
    
    
  }

  login(utilizador: IUtilizador){
    this.loginService.login(utilizador).subscribe((recebido) => {
      localStorage.setItem('token', recebido.token);
      localStorage.setItem('idUtilizador', recebido.utilizador);
      localStorage.setItem('expiracao', recebido.expiracao);
      this.formLogin.reset();
      this.router.navigate(['/inicio']);
    }, (erro) => {
      console.error(erro);
      if(erro.status == 0){
        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: 'Não foi possivel contactar o servidor.',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: erro.error.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
  rpgd(){
    this.setJanela(true);
  }

  setJanela(aberta : boolean){
    this.rgpd = aberta;
  }

}
