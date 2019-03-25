import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-consulta-ver',
  templateUrl: './consulta-ver.component.html',
  styleUrls: ['./consulta-ver.component.css']
})
export class ConsultaVerComponent implements OnInit {
	public id_cita;
	public cargar_inicio:boolean;
	public anamnesis;
	public antecedentes;
	public cargar_antecedentes;
	public cargar_anamnesis;
	public agregar_ante;
	public agregar_ana;
	public eliminar_antecedentes;
	public eliminar_anam;
  	constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _router: Router, private route:ActivatedRoute) {
  		this.route.params.forEach(x => this.id_cita = x['id_cita']);
  		this.cargar_inicio = true;
  		this.eliminar_antecedentes = true;
  		this.eliminar_anam = true;
   	}
   	showSuccess(titulo,mensaje) {
    	this.toastr.success(mensaje, titulo);
   	}
   	showError(titulo,mensaje) {
   		this.toastr.error(mensaje, titulo);
   	}
  	ngOnInit() {
  		this.obtenerAnteAnamComponent();
  	}
  	obtenerAnteAnamComponent(){
  		this.cargar_inicio = false;
	  	this._usuarioService.obtenerAnteAnamService(this.id_cita).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].antecedentes){
						this.antecedentes = res["mensaje"].antecedentes;
						this.anamnesis = res["mensaje"].anamnesis;
						this.cargar_inicio = true;
						this.cargar_anamnesis = true;
						this.cargar_antecedentes = true;
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
	agregarAntecedentesController(descripcion){
		if(descripcion.length > 1){
			this.cargar_antecedentes = false;
		  	this._usuarioService.agregarAntecedentesService(this.id_cita,descripcion).subscribe(
		  		res => {
					if(res["mensaje"].terminar){
						localStorage.clear();
						this._router.navigate(['/login']);
					}else{
						if(res["mensaje"].codigo == 'success'){
							this.obtenerAnteAnamComponent();
							this.agregar_ante = "";
						}else{
							this.showError("Alerta","No hay Productos Agregados");
							this.cargar_antecedentes = true;
						}
					}
		  		},
		  		error => {
		  			this.showError("Alerta","Error de Internet");
		  			this.cargar_antecedentes = true;
		  		}
		  	);
		}else{
			this.agregar_ante = "";
			this.showError("Alerta","No se puede dejar el campo vacío");
			this.obtenerAnteAnamComponent();
		}
	}
	agregarAnamnesisController(descripcion){
		if(descripcion.length > 1){
			this.cargar_anamnesis = false;
		  	this._usuarioService.agregarAnamnesisService(this.id_cita,descripcion).subscribe(
		  		res => {
					if(res["mensaje"].terminar){
						localStorage.clear();
						this._router.navigate(['/login']);
					}else{
						if(res["mensaje"].codigo == 'success'){
							this.obtenerAnteAnamComponent();
							this.agregar_ana = "";
						}else{
							this.showError("Alerta","No hay Productos Agregados");
							this.cargar_anamnesis = true;
						}
					}
		  		},
		  		error => {
		  			this.cargar_anamnesis = true;
		  			this.showError("Alerta","Error de Internet");
		  		}
		  	);
		}else{
			this.agregar_ana = "";
			this.showError("Alerta","No se puede dejar el campo vacío");
			this.obtenerAnteAnamComponent();
		}
	}
	actualizarAntecedentesController(id,descripcion){
		this.cargar_inicio = false;
	  	this._usuarioService.actualizarAntecedentesService(id,descripcion).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.showSuccess("Alerta","Actualizado Finalizado");
						this.obtenerAnteAnamComponent();
					}else{
						this.showError("Alerta","Internet Lento - Volver a Intentarlo");
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  		}
	  	);
	}
	actualizarAnamnesisController(id,descripcion){
		this.cargar_inicio = false;
	  	this._usuarioService.actualizarAnamnesisService(id,descripcion).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.showSuccess("Alerta","Actualizado Finalizado");
						this.obtenerAnteAnamComponent();
					}else{
						this.showError("Alerta","Internet Lento - Volver a Intentarlo");
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  		}
	  	);
	}
	eliminarAnteController(codex){
		this.eliminar_antecedentes = false;
	  	this._usuarioService.eliminarAntecedentesService(codex).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.eliminar_antecedentes = true;
						this.obtenerAnteAnamComponent();
						this.showSuccess("Alerta","Eliminado");
					}else{
						this.showError("Alerta","Internet Lento - Volver a Intentarlo");
						this.eliminar_antecedentes = true;
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  			this.eliminar_antecedentes = true;
	  		}
	  	);
	}
	eliminarAnamController(codex){
		this.eliminar_anam = false;
	  	this._usuarioService.eliminarAnamnesisService(codex).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.eliminar_anam = true;
						this.obtenerAnteAnamComponent();
						this.showSuccess("Alerta","Eliminado");
					}else{
						this.showError("Alerta","Internet Lento - Volver a Intentarlo");
						this.eliminar_anam = true;
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  			this.eliminar_anam = true;
	  		}
	  	);
	}
}
