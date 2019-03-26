import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

	public id_cita;
	public cargar_inicio:boolean;
	public historial;
	public antecedentes;
	public anamnesis;
	public fisico;
	public diagnostico;
	public laboratorio;
	public imagen_examen;
	public procedimiento;
	public caja;
	public farmacia;
	public cargar_modal;
  	constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _router: Router, private route:ActivatedRoute) {
  		this.route.params.forEach(x => this.id_cita = x['id_cita']);
   	}
   	showSuccess(titulo,mensaje) {
    	this.toastr.success(mensaje, titulo);
   	}
   	showError(titulo,mensaje) {
   		this.toastr.error(mensaje, titulo);
   	}
  	ngOnInit() {
  		this.obtenerHistorial();
  	}
  	obtenerHistorial(){
  		this.cargar_inicio = false;
	  	this._usuarioService.obtenerHistorialService(this.id_cita).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].obtener){
						this.historial = res["mensaje"].obtener;
						this.cargar_inicio = true;
					}else{
						this._router.navigate(['/consulta']);
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  			this.cargar_inicio = true;
	  		}
	  	);
  	}
  	abrirModalHistorial(id){
  		this.cargar_modal = false;
 	  	this._usuarioService.obtenerIdService(id).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					this.cargar_modal = true;
					this.antecedentes = res["mensaje"].antecedentes;
					this.anamnesis = res["mensaje"].anamnesis;
					this.fisico = res["mensaje"].fisico;
					this.diagnostico = res["mensaje"].diagnostico;
					this.laboratorio = res["mensaje"].laboratorio;
					this.imagen_examen = res["mensaje"].imagen_examen;
					this.procedimiento = res["mensaje"].procedimiento;
					this.caja = res["mensaje"].caja;
					this.farmacia = res["mensaje"].farmacia;
					$('#modalHistorial').modal('show');
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  			this.cargar_modal = false;
	  			$('#modalHistorial').modal('hide');
	  		}
	  	);
  		
  	}
  	cerrarModal(){
  		this.cargar_modal = false;
  		$('#modalHistorial').modal('hide');
  	}
}
