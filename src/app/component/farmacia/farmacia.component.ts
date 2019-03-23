import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-farmacia',
  templateUrl: './farmacia.component.html',
  styleUrls: ['./farmacia.component.css']
})
export class FarmaciaComponent implements OnInit {

	public id_cita;
	public producto_modal;
	public producto_farmacia;
	public via_ingresado;
	public dia_ingresado;
	public hora_ingresado;
	public indicacion_ingresado;
  	constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _router: Router, private route:ActivatedRoute) {
  		this.route.params.forEach(x => this.id_cita = x['id_cita']);
   	}

  	ngOnInit(){
  		this.obtenerProducFarmacia();
  	}
 	showSuccess(titulo,mensaje) {
    	this.toastr.success(mensaje, titulo);
  	}
  	showError(titulo,mensaje) {
    	this.toastr.error(mensaje, titulo);
  	}
  	obtenerProducFarmacia(){
	  	this._usuarioService.obtenerProductoFarmaciarMedico(this.id_cita).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].producto_farmacia){
						this.producto_farmacia = res["mensaje"].producto_farmacia;
					}else{
						this.showError("Alerta","No hay Productos Agregados");
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  		}
	  	);
  	}
	buscarProductoAgregar(nombre){
	  	this._usuarioService.buscarProductoModal(nombre).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].producto_modal){
						this.producto_modal = res["mensaje"].producto_modal;
						$("#farmacia").modal("show");
					}else{
						this.producto_modal = "No hay productos...";
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  		}
	  	);
	}
  	cerrarModalProducto(){
  		this.producto_modal = [];
  		$("#farmacia").modal('hide');
  	}
  	agergarCantidadFarmacia(codex,cantidad){
	  	this._usuarioService.agregarFarmacia(this.id_cita,codex,cantidad).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.obtenerProducFarmacia();
					}else{
						this.showError("Alerta","Internet lento - Volver a Intentarlo");
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  		}
	  	);
  	}
  	actualizarProductoFarm(codex,via,dia,hora,indicaciones){
  		this._usuarioService.actualizarFarmaciaProducto(codex,via,dia,hora,indicaciones).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.obtenerProducFarmacia();
						this.showSuccess("Alerta","Actualizado");
					}else{
						this.showError("Alerta","Internet lento - Volver a Intentarlo");
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  		}
	  	);
  	}
}
