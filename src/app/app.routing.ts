import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Admin
import { InicioComponent} from './component/inicio/inicio.component';
import { LoginComponent} from './component/login/login.component';
import { ConsultaComponent } from './component/consulta/consulta.component';
import { ConsultaVerComponent } from './component/consulta-ver/consulta-ver.component';

import { LaboratorioComponent } from './component/laboratorio/laboratorio.component';
import { ProcedimientoComponent } from './component/procedimiento/procedimiento.component';
import { FarmaciaComponent } from './component/farmacia/farmacia.component';
import { HistorialComponent } from './component/historial/historial.component';
import { FisicoComponent } from './component/fisico/fisico.component';
import { AdminGuard } from './services/admin.guard';
import { PacienteComponent } from './component/paciente/paciente.component';
const appRoutes: Routes = [
	{path: '', component: LoginComponent},
	{path: '', redirectTo: 'login', pathMatch: 'full'},
	{path: 'login', component: LoginComponent},
	{path: 'inicio', component: ConsultaComponent, canActivate: [AdminGuard]},
	{path: 'consulta', component: ConsultaComponent, canActivate: [AdminGuard]},
	{path: 'paciente', component: PacienteComponent, canActivate: [AdminGuard]},
	{path: 'consulta/:id_cita', component: ConsultaVerComponent, canActivate: [AdminGuard]},
	{path: 'consulta/laboratorio/:id_cita', component: LaboratorioComponent, canActivate: [AdminGuard]},
	{path: 'consulta/procedimiento/:id_cita', component: ProcedimientoComponent, canActivate: [AdminGuard]},
	{path: 'consulta/farmacia/:id_cita', component: FarmaciaComponent, canActivate: [AdminGuard]},
	{path: 'consulta/historial/:id_cita', component: HistorialComponent, canActivate: [AdminGuard]},
	{path: 'consulta/fisico/:id_cita', component: FisicoComponent, canActivate: [AdminGuard]},
	{path: '**', component: LoginComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { enableTracing: false, useHash:true });