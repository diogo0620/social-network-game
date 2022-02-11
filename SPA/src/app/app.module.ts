import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutenticacaoComponent } from './components/autenticacao/autenticacao.component';
import { PaginaUtilizadorComponent } from './components/pagina-utilizador/pagina-utilizador.component';
import { AuthInterceptor } from './auth/AuthInterceptor';
import { MiniSugestoesComponent } from './components/mini-sugestoes/mini-sugestoes.component';
import { MiniPerfilComponent } from './components/mini-perfil/mini-perfil.component';
import { MenuTopoUtilizadorComponent } from './components/menu-topo-utilizador/menu-topo-utilizador.component';
import { MiniPedidosComponent } from './components/mini-pedidos/mini-pedidos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import {LigacoesComponent } from './components/ligacoes/ligacoes.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PesquisarComponent } from './components/pesquisar/pesquisar.component';
import { UtilizadorComponent } from './components/utilizador/utilizador.component';
import { EditarLigacaoComponent } from './components/editar-ligacao/editar-ligacao.component';
import { FazerPedidoLigacaoComponent } from './components/fazer-pedido-ligacao/fazer-pedido-ligacao.component';
import { AceitarPedidoLigacaoComponent } from './components/aceitar-pedido-ligacao/aceitar-pedido-ligacao.component';
import { ListaAmigosComponent } from './components/lista-amigos/lista-amigos.component';
import { CaminhosComponent } from './components/caminhos/caminhos.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { FazerPedidoIntroducaoComponent } from './components/fazer-pedido-introducao/fazer-pedido-introducao.component';
import { ConsultarRedeComponent } from './components/consultar-rede/consultar-rede.component';
import { MiniClassificacaoComponent } from './components/mini-classificacao/mini-classificacao.component';
import { RpgdComponent } from './components/rpgd/rpgd.component';
import { FazerPostComponent } from './components/fazer-post/fazer-post.component';
import { FeedPostsComponent } from './components/feed-posts/feed-posts.component';
import { AmigosComumComponent } from './components/amigos-comum/amigos-comum.component';
import { ClassificacaoComponent } from './components/classificacao/classificacao.component';
import { InformacaoPerfilComponent } from './components/informacao-perfil/informacao-perfil.component';
import { CloudTagsComponent } from './components/cloud-tags/cloud-tags.component';
import { LigacaoComponent } from './components/ligacao/ligacao.component';
import { SugestoesComponent } from './components/sugestoes/sugestoes.component';
import { TagCloudModule } from 'angular-tag-cloud-module';

@NgModule({
  declarations: [
    AppComponent,
    AutenticacaoComponent,
    PaginaUtilizadorComponent,
    MiniSugestoesComponent,
    MiniPerfilComponent,
    MenuTopoUtilizadorComponent,
    MiniPedidosComponent,
    PedidosComponent,
    LigacoesComponent,
    PerfilComponent,
    PesquisarComponent,
    UtilizadorComponent,
    EditarLigacaoComponent,
    FazerPedidoLigacaoComponent,
    AceitarPedidoLigacaoComponent,
    ListaAmigosComponent,
    CaminhosComponent,
    EditarPerfilComponent,
    FazerPedidoIntroducaoComponent,
    ConsultarRedeComponent,
    MiniClassificacaoComponent,
    RpgdComponent,
    FazerPostComponent,
    FeedPostsComponent,
    AmigosComumComponent,
    ClassificacaoComponent,
    InformacaoPerfilComponent,
    CloudTagsComponent,
    LigacaoComponent,
    SugestoesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TagCloudModule,
    HttpClientModule,

  ],
  providers: [
    {    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
