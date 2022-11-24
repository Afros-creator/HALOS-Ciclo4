import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './general/login/login.component';
import { CrearUserComponent } from './usuarios/crear-user/crear-user.component';

const routes: Routes = [
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"registro",
    component:CrearUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
