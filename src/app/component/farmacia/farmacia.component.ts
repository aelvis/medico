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
	public agregar_far:boolean;
	public eliminar_far:boolean;
	public cargar_inicio:boolean;
  	constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _router: Router, private route:ActivatedRoute) {
  		this.route.params.forEach(x => this.id_cita = x['id_cita']);
  		this.agregar_far = true;
  		this.eliminar_far = true;
  		this.cargar_inicio = true;
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
  		this.cargar_inicio = false;
	  	this._usuarioService.obtenerProductoFarmaciarMedico(this.id_cita).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].producto_farmacia){
						this.producto_farmacia = res["mensaje"].producto_farmacia;
						this.agregar_far = true;
						this.cargar_inicio = true;
					}else{
						this.showError("Alerta","No hay Productos Agregados");
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
  		this.agregar_far = false;
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
						this.agregar_far = true;
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  			this.agregar_far = true;
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
  	eliminarProdFar(id){
  		this.eliminar_far = false;
	  	this._usuarioService.eliminarProdFarService(id).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.obtenerProducFarmacia();
						this.eliminar_far = true;
					}else{
						this.showError("Alerta","Internet lento - Volver a Intentarlo");
						this.eliminar_far = true;
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  			this.eliminar_far = true;
	  		}
	  	);
  	}
}
