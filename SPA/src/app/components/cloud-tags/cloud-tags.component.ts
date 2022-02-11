import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ITagCloud } from 'src/app/interfaces/ITagCloud';
import { LigacoesService } from 'src/app/services/ligacoes/ligacoes.service';
import { UtilizadorService } from 'src/app/services/utilizadores/utilizador.service';
import { CloudData, CloudOptions, ZoomOnHoverOptions } from 'angular-tag-cloud-module';

@Component({
  selector: 'app-cloud-tags',
  templateUrl: './cloud-tags.component.html',
  styleUrls: ['./cloud-tags.component.css']
})
export class CloudTagsComponent implements OnInit {

  @ViewChild('cloudWindow') pagina!: ElementRef;

  /*
  1 - Tags do própio.
  2 - Tags de todos os utilizadores.
  3 - Tags das ligações do própio.
  4 - Tags de todas as ligações.
  */
  @Input() tipoDeTags : number;

  cloud! : ITagCloud[];
  tagsCarregadas : boolean;

  left: string[];
  top: string[];
  size: string[];

  larguraPagina! : number;
  alturaPagina! : number;

  dadosCloud : CloudData[] = [];

  zoomOnHoverOptions: ZoomOnHoverOptions = {
    scale: 1.5, // Elements will become 130 % of current zize on hover
    transitionTime: 1.2, // it will take 1.2 seconds until the zoom level defined in scale property has been reached
    delay: 0.2 // Zoom will take affect after 0.8 seconds
  };


  constructor(private utilizadoresService : UtilizadorService, private ligacoesService : LigacoesService) {
    this.tipoDeTags = 1;
    this.cloud = [];
    this.tagsCarregadas = false;
    this.left =[];
    this.top = [];
    this.size = [];
   }

  ngOnInit(): void {
    this.carregarTagCloud();
  }

  ngAfterViewInit(): void {
    this.larguraPagina = this.pagina.nativeElement.offsetWidth;
    this.alturaPagina = this.pagina.nativeElement.offsetHeight;
  }

  

  carregarTagCloud(){
    switch(this.tipoDeTags){
      case 1:
        this.carregarTagsDoPropioUtilizador();
        break;
      case 2:
        this.carregarTagsDeTodosOsUtilizadores();
        break;
      case 3: 
        this.carregarTagsDasLigacoesDoPropioUtilizador();
        break;
      case 4: 
        this.carregarTagsDeTodasAsLigacoes();
        break; 
    }
  }

  private carregarTagsDoPropioUtilizador(){
    this.utilizadoresService.getTagsCloudDoUtilizadorAutenticado().subscribe(
      (suc) => {this.cloud=suc;this.posicionarTags()},
      (err) => {console.log(err)}
    )
  }

  private carregarTagsDeTodosOsUtilizadores(){
    this.utilizadoresService.getTagsCloud().subscribe(
      (suc) => {this.cloud=suc;this.posicionarTags()}
    )
  }

  private carregarTagsDasLigacoesDoPropioUtilizador(){
    this.ligacoesService.getTagCloudDoAutenticado().subscribe(
      (suc) => {this.cloud=suc;this.posicionarTags()}
    )
  }

  private carregarTagsDeTodasAsLigacoes(){
    this.ligacoesService.getTagCloud().subscribe(
      (suc) => {this.cloud=suc;this.posicionarTags()}
    )
  }

  private posicionarTags(){
    for(var i = 0; i < this.cloud.length; i++){
      const cor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
      this.dadosCloud.push({text: this.cloud[i].tag, weight: this.cloud[i].quantidade, tooltip:''+this.cloud[i].quantidade, color: cor});
    }
    this.tagsCarregadas = true;
  }

 






}
