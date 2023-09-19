import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'basica', loadChildren: () => import('./basica/basica.module').then(m => m.BasicaModule) },
  { path: 'avanzada', loadChildren: () => import('./avanzada/avanzada.module').then(m => m.AvanzadaModule) },
  { path: 'completa', loadChildren: () => import('./completa/completa.module').then(m => m.CompletaModule) },
  {
    path: '',
    redirectTo: 'basica',
    pathMatch: 'full'
  }
  // { path: 'avanzada', loadChildren: () => import('./avanzada/avanzada.module').then(m => m.AuthModule) },

  /*{
    path: 'detail/:radicado',
    component: DetailComponent,
  },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
