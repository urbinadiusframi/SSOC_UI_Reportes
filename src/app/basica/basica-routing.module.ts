import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  /*{
    path: 'detail/:radicado',
    component: DetailComponent,
  },*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class BasicaRoutingModule { }
