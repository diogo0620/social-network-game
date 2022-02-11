import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IUtilizador } from '../../interfaces/IUtilizador';
import { LoginService } from '../../services/login/login.service';
import { UtilizadorService } from '../../services/utilizadores/utilizador.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.css']
})
export class PesquisarComponent implements OnInit {

  formFiltragem : FormGroup;
  utilizadores : IUtilizador[];

  aProcurarResultados : boolean;

  constructor(private route : ActivatedRoute,private router: Router, private loginService : LoginService, private fb : FormBuilder, private utilizadoresService:UtilizadorService) { 
    this.utilizadores = [];
    this.formFiltragem = this.fb.group({
      'email':[''],
      'nome':[''],
      'pais':[''],
      'cidade':['']
    })
    this.aProcurarResultados = true;
    
  }


  ngOnInit(): void {

    this.loginService.redirecionarParaLoginSeNaoAutenticado();

    this.route.params.subscribe((params => {
      this.formFiltragem.patchValue({nome:params['pesquisa']});
      this.filtrarResultados();
    }))
  }

  filtrarResultados(){
    
    const email = this.formFiltragem.controls['email'].value;
    const nome = this.formFiltragem.controls['nome'].value;
    const pais = this.formFiltragem.controls['pais'].value;
    const cidade = this.formFiltragem.controls['cidade'].value;

    if(email == "" && nome == "" && pais == "" && cidade == ""){
      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: 'Pelo menos um campo deve ser especificado!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      this.aProcurarResultados = true;
      this.utilizadoresService.getUtilizadoresPorParametros(nome, email, pais, cidade).subscribe((utis) => {
        this.utilizadores = utis;
        this.aProcurarResultados = false;
      })
    }
  }



 

  irParaPerfil(id: string){
    this.router.navigate(['/utilizador/'+id]);
  }
  

}
