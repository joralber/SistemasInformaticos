import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RegistrarProveedorComponent } from './compras/proveedor/registrar-proveedor/registrar-proveedor.component';
import { ListadoProveedorComponent } from './compras/proveedor/listado-proveedor/listado-proveedor.component';
import { EditarProveedorComponent } from './compras/proveedor/editar-proveedor/editar-proveedor.component';
import { RegistroMateriaComponent } from './inventarios/materiaprima/registro-materia/registro-materia.component';
import { ListadoMateriaComponent } from './inventarios/materiaprima/listado-materia/listado-materia.component';
import { CategoriaMateriaComponent } from './inventarios/materiaprima/categoria-materia/categoria-materia.component';

import { KardexMatPrimaComponent } from './kardex-mat-prima/kardex-mat-prima.component';

import { ColorMateriaComponent } from './inventarios/materiaprima/color-materia/color-materia.component';
import { MedidasMateriaComponent } from './inventarios/materiaprima/medidas-materia/medidas-materia.component';
import { RegresarService } from './inventarios/materiaprima/service/regresar.service';
import { EditarMateriaComponent } from './inventarios/materiaprima/editar-materia/editar-materia.component';

import { RegistroCompraComponent } from './compras/compras/registro-compra/registro-compra.component';
import { ListaOrdenCompraComponent } from './compras/compras/lista-orden-compra/lista-orden-compra.component';
import { RegistrarOrdenCompraComponent } from './compras/compras/registrar-orden-compra/registrar-orden-compra.component';
import { IntercambioService } from './compras/service/intercambio.service';

import { ReportespagosComponent } from './compras/cuentas-pagar/reportespagos/reportespagos.component';

import { DevSobCompraComponent } from './compras/dev-sob-compra/dev-sob-compra.component';

import { RegistroDsCompraComponent } from './compras/compras/registro-ds-compra/registro-ds-compra.component';
import { DevProduccionComponent } from './produccion/dev-produccion/dev-produccion.component';
import { RegistroDevProduccionComponent } from './produccion/registro-dev-produccion/registro-dev-produccion.component';
import { RegistarCostosProduccionComponent } from './inventarios/costosproduccion/registar-costos-produccion/registar-costos-produccion.component';
import { EditarCostosProduccionComponent } from './inventarios/costosproduccion/editar-costos-produccion/editar-costos-produccion.component';
import { ListadoCostosProduccionComponent } from './inventarios/costosproduccion/listado-costos-produccion/listado-costos-produccion.component';
import { FactorComponent } from './inventarios/materiaprima/factor/factor.component';
import { RegistrarEstilosComponent } from './inventarios/estilos/registrar-estilos/registrar-estilos.component';
import { ListadoEstilosComponent } from './inventarios/estilos/listado-estilos/listado-estilos.component';
import { EditarEstilosComponent } from './inventarios/estilos/editar-estilos/editar-estilos.component';
import { RegistrarPedidoComponent } from './inventarios/pedido/registrar-pedido/registrar-pedido.component';
import { ListadoPedidoComponent } from './inventarios/pedido/listado-pedido/listado-pedido.component';
import { EditarPedidoComponent } from './inventarios/pedido/editar-pedido/editar-pedido.component';

import { RegistroOrdenProduccionComponent } from './produccion/registro-orden-produccion/registro-orden-produccion.component';
import { RegistroOrdenProdEscolarComponent } from './produccion/registro-orden-prod-escolar/registro-orden-prod-escolar.component';
import { RegistroOrdenProdSinteticosComponent } from './produccion/registro-orden-prod-sinteticos/registro-orden-prod-sinteticos.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {DataTablesModule} from 'angular-datatables';
import { NgxMaskModule } from 'ngx-mask';

import { RegistroCateProdComponent } from './inventario_prod_final/categoria_prod_final/registro-cate-prod/registro-cate-prod.component';
import { RegistroColorProdComponent } from './inventario_prod_final/color_prod_final/registro-color-prod/registro-color-prod.component';
import { RegistroTallasProdComponent } from './inventario_prod_final/tallas_prod_final/registro-tallas-prod/registro-tallas-prod.component';
import { RegistroProdFinalComponent } from './inventario_prod_final/producto_final/registro-prod-final/registro-prod-final.component';
import { ListadoProdFinalComponent } from './inventario_prod_final/producto_final/listado-prod-final/listado-prod-final.component';
import { EditarProdFinalComponent } from './inventario_prod_final/producto_final/editar-prod-final/editar-prod-final.component';
import { KardexProdFinalComponent } from './inventario_prod_final/kardex_prod_final/kardex-prod-final/kardex-prod-final.component';


import { NgSelect2Module } from 'ng-select2';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService, ToastrConfig } from 'ngx-toastr';
import { ListaCompraComponent } from './compras/compras/lista-compra/lista-compra.component';
import { RegistrarCuentasPagarComponent } from './compras/registrar-cuentas-pagar/registrar-cuentas-pagar.component';
import { CortesComponent } from './inventarios/materiaprima/cortes/cortes.component';

import { RegistrarUsuariosComponent } from './administracion/usuarios/registrar-usuarios/registrar-usuarios.component';
import { InicioSesionComponent } from './administracion/usuarios/inicio-sesion/inicio-sesion.component';
import { RecuperarCorreoComponent } from './administracion/usuarios/recuperar-correo/recuperar-correo.component';
import { NuevosPasswordComponent } from './administracion/usuarios/nuevos-password/nuevos-password.component';
import { ListadoUsuariosComponent } from './administracion/usuarios/listado-usuarios/listado-usuarios.component';
import { EditarUsuariosComponent } from './administracion/usuarios/editar-usuarios/editar-usuarios.component';
import { AuthGuard } from '../guard/auth.guard';
import { RespaldoComponent } from './administracion/respaldo/respaldo.component';
import { BitacoraComponent } from './administracion/bitacora/bitacora.component';
//reporte
import { InventarioCatComponent } from './reportes/operativos/inventario-cat/inventario-cat.component';
import { OperativosComponent } from './reportes/operativos/operativos.component';
import { GerencialesComponent } from './reportes/gerenciales/gerenciales.component';
import { EgresosFechaComponent } from './reportes/gerenciales/egresos-fecha/egresos-fecha.component';
import { EstadisticosComponent } from './reportes/estadisticos/estadisticos.component';
import { TacticosComponent } from './reportes/tacticos/tacticos.component';
import { IngresosFechaComponent } from './reportes/gerenciales/ingresos-fecha/ingresos-fecha.component';
import { CompararEIComponent } from './reportes/estadisticos/comparar-ei/comparar-ei.component';
import { ProveedorFComponent } from './reportes/estadisticos/proveedor-f/proveedor-f.component';
import { ProductosMasVComponent } from './reportes/estadisticos/productos-mas-v/productos-mas-v.component';
import { ProductosMenVComponent } from './reportes/estadisticos/productos-men-v/productos-men-v.component';
///
import { RegistrarClienteComponent } from './facturacion/clientes/registrar-cliente/registrar-cliente.component';
import { ListarClienteComponent } from './facturacion/clientes/listar-cliente/listar-cliente.component';
import { EditarClienteComponent } from './facturacion/clientes/editar-cliente/editar-cliente.component';
import { RegistrarVentaComponent } from './facturacion/ventas/registrar-venta/registrar-venta.component';
import { ListaVentasComponent } from './facturacion/ventas/lista-ventas/lista-ventas.component';
import { RegistroDsVentaComponent } from './facturacion/ventas/registro-ds-venta/registro-ds-venta.component';
import { ListaDsVentaComponent } from './facturacion/ventas/lista-ds-venta/lista-ds-venta.component';
import { ControlCobrosComponent } from './facturacion/clientes/control-cobros/control-cobros.component';
import { ImpresionComponent } from './facturacion/ventas/impresion/impresion.component';
import { ProcdutoMasCComponent } from './reportes/estadisticos/procduto-mas-c/procduto-mas-c.component';
import { ProcdutoMasTComponent } from './reportes/estadisticos/procduto-mas-t/procduto-mas-t.component';
import { VentaMunicipioComponent } from './reportes/estadisticos/venta-municipio/venta-municipio.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    RegistrarProveedorComponent,
    ListadoProveedorComponent,
    EditarProveedorComponent,
    RegistroMateriaComponent,
    ListadoMateriaComponent,
    CategoriaMateriaComponent,

    KardexMatPrimaComponent,
    ColorMateriaComponent,
    MedidasMateriaComponent,
    EditarMateriaComponent,

    RegistroCompraComponent,
    ListaOrdenCompraComponent,
    RegistrarOrdenCompraComponent,

    ReportespagosComponent,

    ColorMateriaComponent,
    MedidasMateriaComponent,
    DevSobCompraComponent,
    

    RegistroDsCompraComponent,
    DevProduccionComponent,
    RegistroDevProduccionComponent,
    RegistarCostosProduccionComponent,
    EditarCostosProduccionComponent,
    ListadoCostosProduccionComponent,
    FactorComponent,
    RegistrarEstilosComponent,
    ListadoEstilosComponent,
    EditarEstilosComponent,
    RegistrarPedidoComponent,
    ListadoPedidoComponent,
    EditarPedidoComponent,

   
      RegistroOrdenProduccionComponent,
      RegistroOrdenProdEscolarComponent,
      RegistroOrdenProdSinteticosComponent,
      RegistroCateProdComponent,
      RegistroColorProdComponent,
      RegistroTallasProdComponent,
      RegistroProdFinalComponent,
      ListadoProdFinalComponent,
      EditarProdFinalComponent,
      KardexProdFinalComponent,
      ListaCompraComponent,
      RegistrarCuentasPagarComponent,
      CortesComponent,
            RegistrarUsuariosComponent,
      InicioSesionComponent,
      RecuperarCorreoComponent,
      NuevosPasswordComponent,
      ListadoUsuariosComponent,
      EditarUsuariosComponent,
      RespaldoComponent,
      BitacoraComponent,
      InventarioCatComponent,
      OperativosComponent,
      GerencialesComponent,
      EgresosFechaComponent,
      EstadisticosComponent,
      TacticosComponent,
      IngresosFechaComponent,
      CompararEIComponent,
      ProveedorFComponent,
      ProductosMasVComponent,
      ProductosMenVComponent,
      RegistrarClienteComponent,
      ListarClienteComponent,
      EditarClienteComponent,
      RegistrarVentaComponent,
      ListaVentasComponent,
      RegistroDsVentaComponent,
      ListaDsVentaComponent,
      ControlCobrosComponent,
      ImpresionComponent,
      ProcdutoMasCComponent,
      ProcdutoMasTComponent,
      VentaMunicipioComponent,   
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    SharedModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
DataTablesModule,
    NgxMaskModule.forRoot(),
        NgSelect2Module,
        NgSelectModule,
             BrowserAnimationsModule,
 ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      maxOpened: 2, // máximo de 5 notificaciones al mismo tiempo
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      tapToDismiss: false,
      timeOut: 30000,
      extendedTimeOut: 1000,
      easing: 'ease-in'
    }),

  ],
  exports: [
    DashboardComponent,
    RegistrarProveedorComponent,
    ListadoProveedorComponent,
    EditarProveedorComponent,
    RegistroMateriaComponent,
    ListadoMateriaComponent,
    CategoriaMateriaComponent,
    ColorMateriaComponent,
    MedidasMateriaComponent,
    ReportespagosComponent,
    RegistroCompraComponent
      ],
  providers: [RegresarService,
    IntercambioService,ToastrService, AuthGuard]
})
export class PagesModule { }
