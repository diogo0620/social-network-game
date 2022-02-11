import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ITagCloud } from 'src/app/interfaces/ITagCloud';
import { LigacoesService } from 'src/app/services/ligacoes/ligacoes.service';
import { UtilizadorService } from 'src/app/services/utilizadores/utilizador.service';

import { CloudTagsComponent } from './cloud-tags.component';

describe('CloudTagsComponent', () => {
  let component: CloudTagsComponent;
  let fixture: ComponentFixture<CloudTagsComponent>;
  let html : any;

  let utilizadoresService : UtilizadorService;
  let ligacoesService : LigacoesService;

  let tagsTodosUtilizadores : ITagCloud[] = [{tag:"Netflix", quantidade: 1}, {tag:"Cinema", quantidade:2}, {tag:"Futebol", quantidade:2}, {tag:"TV", quantidade:2}];
  let tagsTodasLigacoes : ITagCloud[] = [{tag:"Netflix", quantidade: 1}, {tag:"Cinema", quantidade:2}, {tag:"Futebol", quantidade:2} ,{tag:"TV", quantidade:1} , {tag:"Java", quantidade:2}];
  let tagsLigacao : ITagCloud[] = [{tag:"Netflix", quantidade: 1}, {tag:"Futebol", quantidade:2}];
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CloudTagsComponent ],
      providers: [UtilizadorService, LigacoesService]
    })
    .compileComponents();

    utilizadoresService = TestBed.inject(UtilizadorService);
    ligacoesService = TestBed.inject(LigacoesService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudTagsComponent);
    component = fixture.componentInstance;
    html = fixture.debugElement.nativeElement;


    spyOn(utilizadoresService, 'getTagsCloud').and.returnValue(of(tagsTodosUtilizadores));
    spyOn(ligacoesService, 'getTagCloudDoAutenticado').and.returnValue(of(tagsLigacao));
    spyOn(ligacoesService, 'getTagCloud').and.returnValue(of(tagsTodasLigacoes));

    
    fixture.detectChanges();
  });

  it('Deve criar componente', () => {
    expect(component).toBeTruthy();
  });

  it('Por omissao, deve carregar as tags do própio utilizador.', () => {
    expect(component.tipoDeTags).toEqual(1);
  })



});
