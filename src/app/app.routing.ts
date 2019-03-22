import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Admin
import { InicioComponent} from './component/inicio/inicio.component';
import { LoginComponent} from './component/login/login.component';
import { ConsultaComponent } from './component/consulta/consulta.component';
import { ConsultaVerComponent } from './component/consulta-ver/consulta-ver.component';

import { AdminGuard } from './services/admin.guard';

const appRoutes: Routes = [
	{path: '', component: LoginComponent},
	{path: '', redirectTo: 'login', pathMatch: 'full'},
	{path: 'login', component: LoginComponent},
	{path: 'inicio', component: InicioComponent, canActivate: [AdminGuard]},
	{path: 'consulta', component: ConsultaComponent, canActivate: [AdminGuard]},
	{path: 'consulta/:id_cita', component: ConsultaVerComponent, canActivate: [AdminGuard]},
	{path: '**', component: LoginComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { enableTracing: true, useHash:true });