import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IPost } from 'src/app/interfaces/IPost';
import { IUtilizador } from 'src/app/interfaces/IUtilizador';
import { PostsService } from 'src/app/services/posts/posts.service';
import { UtilizadorService } from 'src/app/services/utilizadores/utilizador.service';

import { FazerPostComponent } from './fazer-post.component';

describe('FazerPostComponent', () => {
  let component: FazerPostComponent;
  let fixture: ComponentFixture<FazerPostComponent>;
  let html : any;

  let utilizadorService : UtilizadorService;
  let postsService : PostsService;
  
  let utilizador : IUtilizador = {id: "1", avatar: "avatar-1",cidade: "Porto", codigoPais:"351", dataNascimento:"2020-01-01", dataEstadoEmocional:"2020-01-01", descricao:"", email:"utilizadorA@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador A", numeroTelemovel:"915181111", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["aaa", "bb"] };
  let comentario = "Quero fazer um comentário.";
  let tags = "Cinema, Netflix";
  let post : IPost = {utilizador : utilizador,id: "", texto: comentario, tags: ['Cinema', 'Netflix'], data!: "" , mostrarComentarios: false, aPublicarComentario:false, comentarios: [], temComentarioDoAutenticado:false, reacoes: [], temDislikeDoAutenticado: false, temLikeDoAutenticado : false, likes: [], dislikes: []};


  beforeEach(async () => {


    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ FazerPostComponent ], 
      providers: [UtilizadorService, PostsService]    
    })
    .compileComponents();

    utilizadorService = TestBed.inject(UtilizadorService);
    postsService = TestBed.inject(PostsService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FazerPostComponent);
    component = fixture.componentInstance;
    html = fixture.debugElement.nativeElement;
    spyOn(utilizadorService, 'getUtilizadorAutenticado').and.returnValue(of(utilizador));

    spyOn(postsService, 'novoPost').withArgs(post).and.returnValue(of(post));
    
    fixture.detectChanges();
  });

  it('Deve criar componente.', () => {
    expect(component).toBeTruthy();
  });

  it('No inicio não se encontra á espera de resposta.', () => {
    expect(component.aEsperaDeResposta).toBeFalse();
  })

  it('No início os campos <texto> e <tags> encontram-se vazios.', () => {
    expect(component.texto).toEqual('');
    expect(component.tags).toEqual('');
  })

  it('O utilizado autenticado é carregado.',() => {
    expect(component.utilizador).toEqual(utilizador);
    expect(component.utilizadorCarregado).toBeTrue();
  })

  it('Após fazer um post, os campos devem ficar novamente vazios.', () => {
    expect(component.texto).toEqual('');
    expect(component.tags).toEqual('');
    component.texto = comentario;
    component.tags = tags;
    expect(component.texto).toEqual(comentario);
    expect(component.tags).toEqual(tags);
  })

 


});
