import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-procedimiento',
  templateUrl: './procedimiento.component.html',
  styleUrls: ['./procedimiento.component.css']
})
export class ProcedimientoComponent implements OnInit {

	public id_cita;
	public cargar_inicio:boolean;
	public procedimiento;
	public cirugia;
	public lista_procedimiento;
	public lista_cirugia;
	public cargar_cirugias;
	public cargar_procedimiento;
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
  		this.obtenerProCiru();
  	}
  	obtenerProCiru(){
  		this.cargar_inicio = false;
	  	this._usuarioService.obtenerProCiruService(this.id_cita).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].procedimiento){
						this.procedimiento = res["mensaje"].procedimiento;
						this.cirugia = res["mensaje"].cirugia;
						this.cargar_inicio = true;
						this.cargar_procedimiento = true;
						this.cargar_cirugias = true;
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
	buscarProcedimientos(buscar){
		this.cargar_procedimiento = false;
	  	this._usuarioService.buscarProcedimientoService(buscar).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].busqueda.length > 0){
						this.lista_procedimiento = res["mensaje"].busqueda;
						$('#procedimientos').modal('show');
						this.cargar_procedimiento = true;
					}else{
						this.showError("Alerta","Volver a Intentarlo");
						this.cargar_procedimiento = false;
						$('#procedimientos').modal('hide');
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  			this.cargar_procedimiento = false;
	  			$('#procedimientos').modal('hide');
	  		}
	  	);
	}
	buscarCirugia(buscar){
		this.cargar_cirugias = false;
	  	this._usuarioService.buscarCirugiaService(buscar).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].busqueda.length > 0){
						this.lista_cirugia = res["mensaje"].busqueda;
						this.cargar_cirugias = true;
						$('#cirugias').modal('show');
					}else{
						this.showError("Alerta","Volver a Intentarlo");
						this.cargar_cirugias = false;
						$('#cirugias').modal('hide');
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  			this.cargar_cirugias = false;
	  			$('#cirugias').modal('hide');
	  		}
	  	);
	}
	agregarProcedimientoModal(codex,cantidad){
		this.cargar_procedimiento = false;
	  	this._usuarioService.agregarProcedimientoService(this.id_cita,codex,cantidad).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.obtenerProCiru();
					}else{
						this.showError("Alerta","No hay Productos Agregados");
						this.cargar_procedimiento = true;
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  			this.cargar_procedimiento = true;
	  		}
	  	);
	}
	agregarCirugiaModal(codex,cantidad){
		this.cargar_cirugias = false;
	  	this._usuarioService.agregarCirugiaService(this.id_cita,codex,cantidad).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.obtenerProCiru();
					}else{
						this.showError("Alerta","No hay Productos Agregados");
						this.cargar_cirugias = true;
					}
				}
	  		},
	  		error => {
	  			this.cargar_cirugias = true;
	  			this.showError("Alerta","Error de Internet");
	  		}
	  	);
	}
}
