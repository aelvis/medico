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
  	constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _router: Router, private route:ActivatedRoute) {
  		this.route.params.forEach(x => this.id_cita = x['id_cita']);
   	}

  	ngOnInit(){
  	}
 	showSuccess(titulo,mensaje) {
    	this.toastr.success(mensaje, titulo);
  	}
  	showError(titulo,mensaje) {
    	this.toastr.error(mensaje, titulo);
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
}
