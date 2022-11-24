import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlRoutingModule } from './control-routing.module';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './clientes/editar-cliente/editar-cliente.component';
import { ConsultarClienteComponent } from './clientes/consultar-cliente/consultar-cliente.component';
import { EliminarClienteComponent } from './clientes/eliminar-cliente/eliminar-cliente.component';
import { CrearProductoComponent } from './producto/crear-producto/crear-producto.component';
import { ModificarProductoComponent } from './producto/modificar-producto/modificar-producto.component';
import { ConsultarProductoComponent } from './producto/consultar-producto/consultar-producto.component';
import { EliminarProductoComponent } from './producto/eliminar-producto/eliminar-producto.component';
import { CrearPedidoComponent } from './pedido/crear-pedido/crear-pedido.component';
import { ModificarPedidoComponent } from './pedido/modificar-pedido/modificar-pedido.component';
import { ConsultarPedidoComponent } from './pedido/consultar-pedido/consultar-pedido.component';
import { EliminarPedidoComponent } from './pedido/eliminar-pedido/eliminar-pedido.component';
import { CrearPuestocomidaComponent } from './puestocomidas/crear-puestocomida/crear-puestocomida.component';
import { ModificarPuestocomidaComponent } from './puestocomidas/modificar-puestocomida/modificar-puestocomida.component';
import { ConsultarPuestocomidaComponent } from './puestocomidas/consultar-puestocomida/consultar-puestocomida.component';
import { EliminarPuestocomidaComponent } from './puestocomidas/eliminar-puestocomida/eliminar-puestocomida.component';
import { CrearAtraccionComponent } from './atraccion/crear-atraccion/crear-atraccion.component';
import { ModificarAtraccionComponent } from './atraccion/modificar-atraccion/modificar-atraccion.component';
import { ConsultarAtraccionComponent } from './atraccion/consultar-atraccion/consultar-atraccion.component';
import { EliminarAtraccionComponent } from './atraccion/eliminar-atraccion/eliminar-atraccion.component';


@NgModule({
  declarations: [
    CrearClienteComponent,
    EditarClienteComponent,
    ConsultarClienteComponent,
    EliminarClienteComponent,
    CrearProductoComponent,
    ModificarProductoComponent,
    ConsultarProductoComponent,
    EliminarProductoComponent,
    CrearPedidoComponent,
    ModificarPedidoComponent,
    ConsultarPedidoComponent,
    EliminarPedidoComponent,
    CrearPuestocomidaComponent,
    ModificarPuestocomidaComponent,
    ConsultarPuestocomidaComponent,
    EliminarPuestocomidaComponent,
    CrearAtraccionComponent,
    ModificarAtraccionComponent,
    ConsultarAtraccionComponent,
    EliminarAtraccionComponent
  ],
  imports: [
    CommonModule,
    ControlRoutingModule
  ]
})
export class ControlModule { }
