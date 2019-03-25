import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-fisico',
  templateUrl: './fisico.component.html',
  styleUrls: ['./fisico.component.css']
})
export class FisicoComponent implements OnInit {
	public id_cita;
	public cargar_inicio:boolean;
	public cargar_fisico:boolean;
	public cargar_diagnostico:boolean;
	public fisico;
	public diagnostico;
	public lista_fisico;
	public lista_diagnostico;
  	constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _router: Router, private route:ActivatedRoute) { 
  		this.route.params.forEach(x => this.id_cita = x['id_cita']);
  		this.cargar_inicio = true;
  	}
   	showSuccess(titulo,mensaje) {
    	this.toastr.success(mensaje, titulo);
   	}
   	showError(titulo,mensaje) {
   		this.toastr.error(mensaje, titulo);
   	}
  	ngOnInit() {
  		this.obtenerFisDiag();
  	}
  	obtenerFisDiag(){
  		this.cargar_inicio = false;
	  	this._usuarioService.obtenerFisiDiagService(this.id_cita).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].fisico){
						this.fisico = res["mensaje"].fisico;
						this.diagnostico = res["mensaje"].diagnostico;
						this.cargar_inicio = true;
						this.cargar_fisico = true;
						this.cargar_diagnostico = true;
					}else{
						this.showError("Alerta","Error de Internet - Volver a Intentarlo");
						this.cargar_inicio = true;
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  			this.cargar_inicio = true;
	  		}
	  	);
  	}
	buscarFisicoComponent(buscar){
		$('#fisico_modal').modal('show');
		this.cargar_fisico = false;
	  	this._usuarioService.buscarFisicoService(buscar).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].busqueda.length > 0){
						this.lista_fisico = res["mensaje"].busqueda;
						this.cargar_fisico = true;
					}else{
						this.showError("Alerta","Volver a Intentarlo");
						this.cargar_fisico = false;
						$('#fisico_modal').modal('hide');
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  			this.cargar_fisico = false;
	  			$('#fisico_modal').modal('hide');
	  		}
	  	);
	}
	buscarDiagnosticoComponent(buscar){
		$('#diagnostico_modal').modal('show');
		this.cargar_diagnostico = false;
	  	this._usuarioService.buscarDiagnosticoService(buscar).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].busqueda.length > 0){
						this.lista_diagnostico = res["mensaje"].busqueda;
						this.cargar_diagnostico = true;
					}else{
						this.showError("Alerta","Volver a Intentarlo");
						this.cargar_diagnostico = false;
						$('#diagnostico_modal').modal('hide');
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  			this.cargar_diagnostico = false;
	  			$('#diagnostico_modal').modal('hide');
	  		}
	  	);
	}
}
