import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './extras/pages/home/home.component';
import { PagenotFoundComponent } from './extras/pages/pagenot-found/pagenot-found.component';

const routes: Routes = [
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"",
    pathMatch:"full",
    redirectTo:"/home"
  },
  {
    path:"**",
    component:PagenotFoundComponent
  },
  {
    path:"seguridad",
    loadChildren:()=>import("./modulos/seguridad/seguridad.module").then(x=>x.SeguridadModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
