import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacaoComponent } from './components/autenticacao/autenticacao.component';
import { PaginaUtilizadorComponent } from './components/pagina-utilizador/pagina-utilizador.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { LigacoesComponent } from './components/ligacoes/ligacoes.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PesquisarComponent } from './components/pesquisar/pesquisar.component';
import { UtilizadorComponent } from './components/utilizador/utilizador.component';
import { RpgdComponent } from './components/rpgd/rpgd.component';
import { ClassificacaoComponent } from './components/classificacao/classificacao.component';

const routes: Routes = [
  { path: 'inicio', component: PaginaUtilizadorComponent},
  { path: '', component: AutenticacaoComponent},
  { path: 'autenticacao', component:AutenticacaoComponent},
  { path: 'pedidos', component : PedidosComponent},
  { path: 'pesquisar', component: PesquisarComponent},
  { path: 'pesquisar/:pesquisa', component: PesquisarComponent},
  { path: 'ligacoes', component : LigacoesComponent},
  { path: 'perfil', component : PerfilComponent},
  { path: 'utilizador/:idUtilizador', component: UtilizadorComponent},
  { path: 'rpgd', component: RpgdComponent},
  { path: 'classificacao', component: ClassificacaoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
