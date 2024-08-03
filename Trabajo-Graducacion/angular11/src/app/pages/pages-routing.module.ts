import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrarOrdenCompraComponent } from './compras/compras/registrar-orden-compra/registrar-orden-compra.component';
import { ListaOrdenCompraComponent } from './compras/compras/lista-orden-compra/lista-orden-compra.component';
import { RegistroCompraComponent } from './compras/compras/registro-compra/registro-compra.component';
import { RegistrarProveedorComponent } from './compras/proveedor/registrar-proveedor/registrar-proveedor.component';
import { ListadoProveedorComponent } from './compras/proveedor/listado-proveedor/listado-proveedor.component';
import { EditarProveedorComponent } from './compras/proveedor/editar-proveedor/editar-proveedor.component';
import { RegistroDsCompraComponent } from './compras/compras/registro-ds-compra/registro-ds-compra.component';

import { RegistroMateriaComponent } from './inventarios/materiaprima/registro-materia/registro-materia.component';
import { ListadoMateriaComponent } from './inventarios/materiaprima/listado-materia/listado-materia.component';
import { KardexMatPrimaComponent } from './kardex-mat-prima/kardex-mat-prima.component';

import { CategoriaMateriaComponent } from './inventarios/materiaprima/categoria-materia/categoria-materia.component';
import { ColorMateriaComponent } from './inventarios/materiaprima/color-materia/color-materia.component';
import { MedidasMateriaComponent } from './inventarios/materiaprima/medidas-materia/medidas-materia.component';
import { EditarMateriaComponent } from './inventarios/materiaprima/editar-materia/editar-materia.component';
import { ReportespagosComponent } from './compras/cuentas-pagar/reportespagos/reportespagos.component';


import { DevSobCompraComponent } from './compras/dev-sob-compra/dev-sob-compra.component';
import { ListaCompraComponent } from './compras/compras/lista-compra/lista-compra.component';
import { RegistrarCuentasPagarComponent } from './compras/registrar-cuentas-pagar/registrar-cuentas-pagar.component';
import { DevProduccionComponent } from './produccion/dev-produccion/dev-produccion.component';
import { RegistroDevProduccionComponent } from './produccion/registro-dev-produccion/registro-dev-produccion.component';
import { RegistroOrdenProduccionComponent } from './produccion/registro-orden-produccion/registro-orden-produccion.component';
import { RegistroOrdenProdEscolarComponent } from './produccion/registro-orden-prod-escolar/registro-orden-prod-escolar.component';
import { RegistroOrdenProdSinteticosComponent } from './produccion/registro-orden-prod-sinteticos/registro-orden-prod-sinteticos.component';



//costos
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


//Inventario producto Final
import { KardexProdFinalComponent } from './inventario_prod_final/kardex_prod_final/kardex-prod-final/kardex-prod-final.component';
import { ListadoProdFinalComponent } from './inventario_prod_final/producto_final/listado-prod-final/listado-prod-final.component';
import { RegistroProdFinalComponent } from './inventario_prod_final/producto_final/registro-prod-final/registro-prod-final.component';
import { RegistroCateProdComponent } from './inventario_prod_final/categoria_prod_final/registro-cate-prod/registro-cate-prod.component';
import { RegistroColorProdComponent } from './inventario_prod_final/color_prod_final/registro-color-prod/registro-color-prod.component';
import { RegistroTallasProdComponent } from './inventario_prod_final/tallas_prod_final/registro-tallas-prod/registro-tallas-prod.component';
import { EditarProdFinalComponent } from './inventario_prod_final/producto_final/editar-prod-final/editar-prod-final.component';
import { CortesComponent } from './inventarios/materiaprima/cortes/cortes.component';

//administracion
import { RegistrarUsuariosComponent } from './administracion/usuarios/registrar-usuarios/registrar-usuarios.component';
import { InicioSesionComponent } from './administracion/usuarios/inicio-sesion/inicio-sesion.component';
import { RecuperarCorreoComponent } from './administracion/usuarios/recuperar-correo/recuperar-correo.component';
import { NuevosPasswordComponent } from './administracion/usuarios/nuevos-password/nuevos-password.component';
import { ListadoUsuariosComponent } from './administracion/usuarios/listado-usuarios/listado-usuarios.component';
import { EditarUsuariosComponent } from './administracion/usuarios/editar-usuarios/editar-usuarios.component';

import { AuthGuard } from '../guard/auth.guard';
import { RespaldoComponent } from './administracion/respaldo/respaldo.component';
import { BitacoraComponent } from './administracion/bitacora/bitacora.component';
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
//
import { ListarClienteComponent } from './facturacion/clientes/listar-cliente/listar-cliente.component';
import { RegistrarClienteComponent } from './facturacion/clientes/registrar-cliente/registrar-cliente.component';
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
const routes:Routes=[{

  path:'dashboard', component:PagesComponent, canActivate:[AuthGuard],
  children:[
    {path:'', component:DashboardComponent,data:{titulo:'Dashboard'}},
    {path:'registrar-orden-compra', component:RegistrarOrdenCompraComponent},
    {path:'lista-orden-compra', component:ListaOrdenCompraComponent},
    {path:'registro-compra/:id_ordencompra', component:RegistroCompraComponent},
    {path:'registrar-proveedor', component:RegistrarProveedorComponent},
    {path:'listado-proveedor', component:ListadoProveedorComponent},
    {path:'editar-proveedor/:id_proveedor', component:EditarProveedorComponent},
    {path:'registro-ds-compra', component:RegistroDsCompraComponent},
    {path:'registrar-cuentas-pagar/:id_compra', component:RegistrarCuentasPagarComponent},

    {path:'registro-materia', component:RegistroMateriaComponent},
    {path:'listado-materia', component:ListadoMateriaComponent},
    {path:'kardex-mat-prima',component:KardexMatPrimaComponent},

    {path:'categoria-materia', component:CategoriaMateriaComponent},
    {path:'color-materia', component:ColorMateriaComponent},
    {path:'medidas-materia', component:MedidasMateriaComponent},
    {path:'editar-materia/:id_mp', component:EditarMateriaComponent},
    {path:'reportespagos/:id_proveedor', component:ReportespagosComponent},
    {path:'registro-orden-produccion', component:RegistroOrdenProduccionComponent},
    {path:'registro-orden-prod-escolar', component:RegistroOrdenProdEscolarComponent},
    {path:'registro-orden-prod-sinteticos', component:RegistroOrdenProdSinteticosComponent},



    {path:'dev_sob_compra',component:DevSobCompraComponent},
    { path: 'lista-compra', component: ListaCompraComponent },
    
    //devolucion de produccion
    {path:'dev-produccion',component:DevProduccionComponent},
    {path:'registro-dev-produccion',component:RegistroDevProduccionComponent},

//costos de prduccion
  {path:'registrar-costo', component:RegistarCostosProduccionComponent},
{path:'listado-costo', component:ListadoCostosProduccionComponent},
{path:'editar-costo/:id_costo_produccion', component:EditarCostosProduccionComponent},
{path:'factor/:id_mp', component:FactorComponent},

//estilos
{path:'registrar-estilo', component:RegistrarEstilosComponent},
{path:'listado-estilo', component:ListadoEstilosComponent},
{path:'editar-estilo/:idcodigo_estilo', component:EditarEstilosComponent},

//pedidos
{path:'registrar-pedido', component:RegistrarPedidoComponent},
{path:'listado-pedido', component:ListadoPedidoComponent},
{path:'editar-pedido', component:EditarPedidoComponent},

//inventario producto final|
{path:'kardex-prod-final', component:KardexProdFinalComponent},
{path:'listado-prod-final', component:ListadoProdFinalComponent},
{path:'registro-prod-final', component:RegistroProdFinalComponent},
{path:'registro-cate-prod', component:RegistroCateProdComponent},
{path:'registro-color-prod', component:RegistroColorProdComponent},
{path:'registro-tallas-prod', component:RegistroTallasProdComponent},
{path:'editar-prod-final/:id_producto', component:EditarProdFinalComponent},

{path:'cortes/:id_mp', component:CortesComponent, data:{titulo:'Cortes'}},

//administracion
{path:'registro-usuario', component:RegistrarUsuariosComponent},
{path:'inicio-sesion', component:InicioSesionComponent},
{path:'nuevos-password', component:NuevosPasswordComponent},
{path:'listado-usuarios', component:ListadoUsuariosComponent},
{path:'editar-usuarios/:id', component:EditarUsuariosComponent},
{path:'respaldo', component:RespaldoComponent},
{path:'bitacora', component:BitacoraComponent},

//reportes
{path:'operativos', component:OperativosComponent},
{path:'invCate', component:InventarioCatComponent},
{path:'gerenciales', component:GerencialesComponent},
{path:'egresoF', component:EgresosFechaComponent},
{path:'estadisticos', component:EstadisticosComponent},
{path:'tactico', component:TacticosComponent},
{path:'ingresoF', component:IngresosFechaComponent},
{path:'comparacion', component:CompararEIComponent},
{path:'proveedorF', component:ProveedorFComponent},
{path:'productoMasF', component:ProductosMasVComponent},
{path:'productoMenF', component:ProductosMenVComponent},
//
{path:'listar-cliente', component:ListarClienteComponent},
{path:'listar-cliente', component:RegistrarClienteComponent},
{path:'registrar-cliente', component:RegistrarClienteComponent},
{path:'editar-cliente/:id_cliente', component:EditarClienteComponent},
{path:'registrar-venta', component:RegistrarVentaComponent},
{path:'lista-ventas', component:ListaVentasComponent},
{path:'registro-ds-venta', component:RegistroDsVentaComponent},
{path:'lista-ds-venta', component:ListaDsVentaComponent},
{path:'control-cobros/:id_cliente', component:ControlCobrosComponent},
{path:'impresion/:id_venta', component:ImpresionComponent},
{path:'productoMC', component:ProcdutoMasCComponent},
{path:'productoMT', component:ProcdutoMasTComponent},
{path:'ventaMuni', component:VentaMunicipioComponent},
      ]}
]


@NgModule({
 
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class PagesRoutingModule { }
