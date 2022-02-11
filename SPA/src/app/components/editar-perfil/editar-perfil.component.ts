import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { IUtilizador } from '../../interfaces/IUtilizador';
import { UtilizadorService } from '../../services/utilizadores/utilizador.service';
import { EstadosEmocionaisService } from '../../services/estadosEmocionais/estados-emocionais.service';
import { AvataresService } from '../../services/avatares/avatares.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {


  @Output() atualizarUtilizador : EventEmitter<boolean> = new EventEmitter();

  utilizador! : IUtilizador;
  formInformacaoPrincipal : FormGroup;
  formInformacaoBasica: FormGroup;
  formTags: FormGroup;
  formLocalizacao : FormGroup;
  formContacto : FormGroup;
  formRedesSociais: FormGroup;
  formEstadoEmocional: FormGroup;
  estadosEmocionais : string[];

  avatar! : string;

  avatares : string[];

  email : string;

  tipoAvatar : string[];


  aProcessarAlteracoes : boolean;

  constructor(private estadosEmocionaisService : EstadosEmocionaisService,private avataresService : AvataresService, private fb : FormBuilder, private utilizadoresService : UtilizadorService) {
    this.estadosEmocionais = this.estadosEmocionaisService.getEstadosEmocionais();
    this.avatares = this.avataresService.getAvataresDisponiveis();
    this.email = "";
    this.aProcessarAlteracoes = false;
    this.tipoAvatar = ["avatar-nao-selecionado","avatar-nao-selecionado","avatar-nao-selecionado","avatar-nao-selecionado","avatar-nao-selecionado","avatar-nao-selecionado","avatar-nao-selecionado", "avatar-nao-selecionado" ]

    this.formInformacaoPrincipal = fb.group({
      'email':[''],
      'password':[''],
      'confirmarPassword':['']
    });

    this.formInformacaoBasica = fb.group({
      'nome':[''],
      'dataNascimento':[''],
      'descricao':['']
    });

    this.formTags = fb.group({
      'listaTags':['']
    })

    this.formLocalizacao = fb.group({
      'pais':[''],
      'cidade':['']
    })

    this.formContacto = fb.group({
      'indicativo':[''],
      'numero':['']
    })

    this.formRedesSociais = fb.group({
      'facebook':[''],
      'linkedIn':['']
    })

    this.formEstadoEmocional = fb.group({
      'emocao':['']
    })


    
  }

  ngOnInit(): void {
    this.carregarUtilizador();
  }

  private carregarUtilizador(){
    this.utilizadoresService.getUtilizadorAutenticado().subscribe(
      (uti) => {this.utilizador = uti;this.atualizarDados()}
    )
  }

  private atualizarDados(){
    this.formInformacaoPrincipal.patchValue({
      'email':this.utilizador.email,
      'password':this.utilizador.password,
      'confirmarPassword':this.utilizador.password
    });

    this.formInformacaoBasica.patchValue({
      'nome':this.utilizador.nome,
      'dataNascimento':this.utilizador.dataNascimento,
      'descricao':this.utilizador.descricao
    });

    this.formTags.patchValue({
      'listaTags':this.utilizador.tags
    });

    this.formLocalizacao.patchValue({
      'pais':this.utilizador.pais,
      'cidade':this.utilizador.cidade
    });

    this.formContacto.patchValue({
      'indicativo':this.utilizador.codigoPais,
      'numero':this.utilizador.numeroTelemovel
    })

    this.formRedesSociais.patchValue({
      'facebook':this.utilizador.facebook,
      'linkedIn':this.utilizador.linkedIn
    })

    this.formEstadoEmocional.setValue({'emocao':this.utilizador.estadoEmocional})
    this.avatar = this.utilizador.avatar;
    this.email = this.utilizador.email;
    this.atualizarAvatares();
  }

  private atualizarAvatares(){
    var i = 0;
    this.avatares.forEach(a => {
      if(a == this.avatar){
        this.tipoAvatar[i] = "avatar-selecionado";
      }else{
        this.tipoAvatar[i] = "avatar-nao-selecionado";
      }
      i++;
    })
  }



  escolherAvatar(avatar : string){
    this.avatar = avatar;
    this.atualizarAvatares();
  }

  cancelar(){
    this.carregarUtilizador();
  }

  guardar(){

    if(!this.aProcessarAlteracoes){
      this.aProcessarAlteracoes = true;
      var uti : IUtilizador = {id: "", nome:"", email:"", password:"", dataNascimento:"", estadoEmocional:"",dataEstadoEmocional:"", facebook:"", linkedIn:"", descricao:"", tags:[], cidade:"", pais:"",codigoPais:"", numeroTelemovel:"", avatar:""};
      const palavraPasse = this.formInformacaoPrincipal.controls['password'].value;
      const confirmarPalavraPasse = this.formInformacaoPrincipal.controls['confirmarPassword'].value;
  
      if(palavraPasse != confirmarPalavraPasse){
        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: 'As duas palavras-passe não coincidem.',
          showConfirmButton: false,
          timer: 1500
        });
        this.aProcessarAlteracoes = false;
      }else{
  
        uti.password = palavraPasse;
        uti.nome = this.formInformacaoBasica.controls['nome'].value;
        uti.dataNascimento = this.formInformacaoBasica.controls['dataNascimento'].value;
        uti.descricao = this.formInformacaoBasica.controls['descricao'].value;
      
        var tags :string  = this.formTags.controls['listaTags'].value;
        tags = tags.toString().replace(/\s/g, "");
        uti.tags = tags.toString().split(",");
        uti.estadoEmocional = this.formEstadoEmocional.controls['emocao'].value;
        uti.pais = this.formLocalizacao.controls['pais'].value;
        uti.cidade = this.formLocalizacao.controls['cidade'].value;
        uti.codigoPais = this.formContacto.controls['indicativo'].value;
        uti.numeroTelemovel = this.formContacto.controls['numero'].value;
        uti.facebook = this.formRedesSociais.controls['facebook'].value;
        uti.linkedIn = this.formRedesSociais.controls['linkedIn'].value;
        uti.avatar = this.avatar;
  
        this.utilizadoresService.alterarDadosUtilizador(uti).subscribe(
          (sucesso) => {   Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: 'As alterações foram guardadas.',
            showConfirmButton: false,
            timer: 1500
          });this.carregarUtilizador();this.aProcessarAlteracoes=false;this.atualizarUtilizador.emit(true)},
          (erro) => {   Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            title: erro.error.message,
            showConfirmButton: false,
            timer: 1500
          });this.aProcessarAlteracoes=false;}
        )
  
      }
    }

  }

  

}
