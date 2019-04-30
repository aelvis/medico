import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AdminGuard } from './services/admin.guard';
import { UsuarioService } from './services/usuario.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { InicioComponent} from './component/inicio/inicio.component';
import { NavAdminComponent} from './component/partial/partial.component';
import { ConsultaComponent } from './component/consulta/consulta.component';
import { ConsultaVerComponent } from './component/consulta-ver/consulta-ver.component';
import { LaboratorioComponent } from './component/laboratorio/laboratorio.component';
import { ProcedimientoComponent } from './component/procedimiento/procedimiento.component';
import { FarmaciaComponent } from './component/farmacia/farmacia.component';
import { HistorialComponent } from './component/historial/historial.component';
import { FisicoComponent } from './component/fisico/fisico.component';
import { PacienteComponent } from './component/paciente/paciente.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    NavAdminComponent,
    ConsultaComponent,
    ConsultaVerComponent,
    LaboratorioComponent,
    ProcedimientoComponent,
    FarmaciaComponent,
    HistorialComponent,
    FisicoComponent,
    PacienteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    appRoutingProviders,
    UsuarioService,
    AdminGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
