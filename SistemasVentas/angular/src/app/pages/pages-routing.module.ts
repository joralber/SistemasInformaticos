import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { CategoriasComponent } from './inventarios/categorias/categorias.component';
import { ColoresComponent } from './inventarios/colores/colores.component';
import { TallasComponent } from './inventarios/tallas/tallas.component';

import { RegistrarProductosComponent } from './inventarios/productos/registrar-productos/registrar-productos.component';
import { ModificarProductosComponent } from './inventarios/productos/modificar-productos/modificar-productos.component';
import { ListarProductosComponent } from './inventarios/productos/listar-productos/listar-productos.component';
import { KardexComponent } from './inventarios/kardexP/kardex/kardex.component';
import { RegistrarVentasComponent } from './ventas/registrar-ventas/registrar-ventas.component'; // Importa NgSelectModule
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

const routes: Routes = [{
 
  path:'dashboard', component:PagesComponent, 
  children:[
    {
    path: '',
    component: DashboardComponent,
  },
     {path:'registrar-cliente', component:RegistrarclientesComponent},
    {path:'listar-cliente', component:ListadoclientesComponent},
    {path:'modificar-cliente/:id_cliente', component:ModificarclientesComponent},
   
//administracion
{
  path:'registro-usuario', 
  component:RegistrarUsuariosComponent,
  canActivate: [AuthGuard],
  data: { expectedRole: 'ADMINISTRADOR' },
},
{
    path:'nuevos-password',
     component:NuevosPasswordComponent,
 canActivate: [AuthGuard],
  data: { expectedRole: 'VENDEDOR' },
},
{
    path:'listado-usuarios',
    component:ListadoUsuariosComponent,
canActivate: [AuthGuard],
  data: { expectedRole: 'ADMINISTRADOR' },
},
{
    path:'editar-usuarios/:id', 
    component:EditarUsuariosComponent,
canActivate: [AuthGuard],
  data: { expectedRole: 'ADMINISTRADOR' },
  },
{
    path:'respaldo',
     component:RespaldoComponent,
     canActivate: [AuthGuard],
  data: { expectedRole: 'ADMINISTRADOR' },
 },
{
    path:'bitacora',
    component:BitacoraComponent,
canActivate: [AuthGuard],
  data: { expectedRole: 'ADMINISTRADOR' },
},

//cate
{
    path:'registro-cate', 
    component:CategoriasComponent,
canActivate: [AuthGuard],
  data: { expectedRole: 'ADMINISTRADOR' },
  },
{
    path:'registro-col',
     component:ColoresComponent,
canActivate: [AuthGuard],
  data: { expectedRole: 'ADMINISTRADOR' },
 },
{
    path:'registro-tall',
     component:TallasComponent,
 canActivate: [AuthGuard],
  data: { expectedRole: 'ADMINISTRADOR' },
},
//producto
    {path:'registrar-productos', component:RegistrarProductosComponent,canActivate: [AuthGuard],
  data: { expectedRole: 'ADMINISTRADOR' },},
    {path:'listar-productos', component:ListarProductosComponent,canActivate: [AuthGuard],
  data: { expectedRole: 'ADMINISTRADOR' },},
    {path:'modificar-productos/:id_producto', component:ModificarProductosComponent,canActivate: [AuthGuard],
  data: { expectedRole: 'ADMINISTRADOR' },},
    {path:'kardex', component:KardexComponent,canActivate: [AuthGuard],
  data: { expectedRole: 'ADMINISTRADOR' },},
    //ventas
    {path:'registrar-ventas', component:RegistrarVentasComponent},
    {path:'listar-ventas', component:ListarVentasComponent},
    {path:'tiket', component:TiketComponent},
//reportes
          {path:'principal', component:PrincipalComponent,canActivate: [AuthGuard],
  data: { expectedRole: 'ADMINISTRADOR' },},
    //reportes Operativos
        {path:'ingresos', component:VentasfechaComponent,canActivate: [AuthGuard],
  data: { expectedRole: 'ADMINISTRADOR' },},
        {path:'prodmv', component:ProductomvComponent,canActivate: [AuthGuard],
  data: { expectedRole: 'ADMINISTRADOR' },},
        {path:'clieN', component:ClienteNuevoComponent,canActivate: [AuthGuard],
  data: { expectedRole: 'ADMINISTRADOR' },},
        {path:'ventaCat', component:VentasCategComponent,canActivate: [AuthGuard],
  data: { expectedRole: 'ADMINISTRADOR' },},
//tacticos
        {path:'ventaEmp', component:VentasEmpleComponent,canActivate: [AuthGuard],
  data: { expectedRole: 'ADMINISTRADOR' },},
        {path:'ventaMuni', component:VentaMunicipioComponent,canActivate: [AuthGuard],
  data: { expectedRole: 'ADMINISTRADOR' },},
        {path:'clienteMF', component:ClienteMasFrecComponent,canActivate: [AuthGuard],
  data: { expectedRole: 'ADMINISTRADOR' },},
    

      ]}
]

@NgModule({
  imports: [
CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
