import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { VentasComponent } from './ventas/ventas.component';
import { VentasCrearComponent } from './ventas-crear/ventas-crear.component';
import { ModificarVentasComponent } from './ventas/modificar-ventas/modificar-ventas.component';
import { ConsultarVentasComponent } from './ventas/consultar-ventas/consultar-ventas.component';
import { EliminarVentasComponent } from './ventas/eliminar-ventas/eliminar-ventas.component';
import { CrearFacturaComponent } from './factura/crear-factura/crear-factura.component';
import { ModificarFacturaComponent } from './factura/modificar-factura/modificar-factura.component';
import { ConsultarFacturaComponent } from './factura/consultar-factura/consultar-factura.component';
import { ElimiarFacturaComponent } from './factura/elimiar-factura/elimiar-factura.component';


@NgModule({
  declarations: [
    VentasComponent,
    VentasCrearComponent,
    ModificarVentasComponent,
    ConsultarVentasComponent,
    EliminarVentasComponent,
    CrearFacturaComponent,
    ModificarFacturaComponent,
    ConsultarFacturaComponent,
    ElimiarFacturaComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule
  ]
})
export class ReportesModule { }
