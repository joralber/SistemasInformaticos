import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import {DataTablesModule} from 'angular-datatables';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrarProductosComponent } from './inventarios/productos/registrar-productos/registrar-productos.component';
import { ModificarProductosComponent } from './inventarios/productos/modificar-productos/modificar-productos.component';
import { ListarProductosComponent } from './inventarios/productos/listar-productos/listar-productos.component';
import { CategoriasComponent } from './inventarios/categorias/categorias.component';
import { ColoresComponent } from './inventarios/colores/colores.component';
import { TallasComponent } from './inventarios/tallas/tallas.component';
import { RegistrarclientesComponent } from './ventas/clientes/registrarclientes/registrarclientes.component';
import { ListadoclientesComponent } from './ventas/clientes/listadoclientes/listadoclientes.component';
import { ModificarclientesComponent } from './ventas/clientes/modificarclientes/modificarclientes.component';

import { RegistrarUsuariosComponent } from './administracion/usuarios/registrar-usuarios/registrar-usuarios.component';
import { NuevosPasswordComponent } from './administracion/usuarios/nuevos-password/nuevos-password.component';
import { ListadoUsuariosComponent } from './administracion/usuarios/listado-usuarios/listado-usuarios.component';
import { EditarUsuariosComponent } from './administracion/usuarios/editar-usuarios/editar-usuarios.component';
import { AuthGuard } from '../guard/auth.guard';
import { RespaldoComponent } from './administracion/respaldo/respaldo.component';
import { BitacoraComponent } from './administracion/bitacora/bitacora.component';
import { KardexComponent } from './inventarios/kardexP/kardex/kardex.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { RegistrarVentasComponent } from './ventas/registrar-ventas/registrar-ventas.component';
import { ListarVentasComponent } from './ventas/listar-ventas/listar-ventas.component';
import { VentasfechaComponent } from './reportes/ventasfecha/ventasfecha.component';
import { PrincipalComponent } from './reportes/principal/principal.component';
import { ProductomvComponent } from './reportes/productomv/productomv.component';
import { ClienteNuevoComponent } from './reportes/cliente-nuevo/cliente-nuevo.component';
import { VentasCategComponent } from './reportes/ventas-categ/ventas-categ.component';
import { VentasEmpleComponent } from './reportes/ventas-emple/ventas-emple.component';
import { VentaMunicipioComponent } from './reportes/venta-municipio/venta-municipio.component';
import { ClienteMasFrecComponent } from './reportes/cliente-mas-frec/cliente-mas-frec.component';
import { TiketComponent } from './ventas/tiket/tiket.component';
import { DecimalOnlyDirective } from './ventas/decimal-only.directive';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    RegistrarProductosComponent,
    ModificarProductosComponent,
    ListarProductosComponent,
    CategoriasComponent,
    ColoresComponent,
    TallasComponent,
    RegistrarclientesComponent,
    ListadoclientesComponent,
    ModificarclientesComponent,
          RegistrarUsuariosComponent,
      NuevosPasswordComponent,
      ListadoUsuariosComponent,
      EditarUsuariosComponent,
      RespaldoComponent,
      BitacoraComponent,
      KardexComponent,
      RegistrarVentasComponent,
      ListarVentasComponent,
      VentasfechaComponent,
      PrincipalComponent,
      ProductomvComponent,
      ClienteNuevoComponent,
      VentasCategComponent,
      VentasEmpleComponent,
      VentaMunicipioComponent,
      ClienteMasFrecComponent,
      TiketComponent,
      DecimalOnlyDirective,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    BrowserModule,
SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
            NgxMaskModule.forRoot(),
            DataTablesModule,
            NgSelectModule,

  ],
  providers: [AuthGuard]
})
export class PagesModule { }
