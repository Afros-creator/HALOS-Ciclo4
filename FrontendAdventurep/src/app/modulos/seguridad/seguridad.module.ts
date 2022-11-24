import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { LoginComponent } from './general/login/login.component';
import { RecuperarPasswordComponent } from './general/recuperar-password/recuperar-password.component';
import { AsignarPasswordComponent } from './general/asignar-password/asignar-password.component';
import { CrearUserComponent } from './usuarios/crear-user/crear-user.component';
import { EditarUserComponent } from './usuarios/editar-user/editar-user.component';
import { ConsultarUserComponent } from './usuarios/consultar-user/consultar-user.component';
import { EliminarUserComponent } from './usuarios/eliminar-user/eliminar-user.component';
import { RolGerenteComponent } from './rol-gerente/rol-gerente.component';
import { RolAdministrativoComponent } from './rol-administrativo/rol-administrativo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    RecuperarPasswordComponent,
    AsignarPasswordComponent,
    CrearUserComponent,
    EditarUserComponent,
    ConsultarUserComponent,
    EliminarUserComponent,
    RolGerenteComponent,
    RolAdministrativoComponent
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SeguridadModule { }
