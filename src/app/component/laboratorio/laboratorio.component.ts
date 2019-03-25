import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-laboratorio',
  templateUrl: './laboratorio.component.html',
  styleUrls: ['./laboratorio.component.css']
})
export class LaboratorioComponent implements OnInit {
	public id_cita;
	public laboratorio;
	public examen;
	public lista_laboratorio;
	public lista_diag;
	public eliminar_lab:boolean;
	public eliminar_diag:boolean;
	public cargar_diag:boolean;
	public cargar_lab:boolean;
	public cargar_inicio:boolean;
  constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _router: Router, private route:ActivatedRoute) {
  		this.route.params.forEach(x => this.id_cita = x['id_cita']);
  		this.eliminar_lab = true;
  		this.eliminar_diag = true;
  		this.cargar_diag = true;
  		this.cargar_lab = true;
  		this.cargar_inicio = true;
   	}
   	showSuccess(titulo,mensaje) {
    	this.toastr.success(mensaje, titulo);
   	}
   	showError(titulo,mensaje) {
   		this.toastr.error(mensaje, titulo);
   	}
  	ngOnInit() {
  		this.obtenerDiagExa();
  	}
  	obtenerDiagExa(){
  		this.cargar_inicio = false;
	  	this._usuarioService.obtenerLaboDiag(this.id_cita).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].laboratorio){
						this.laboratorio = res["mensaje"].laboratorio;
						this.examen = res["mensaje"].examen;
						this.cargar_diag = true;
						this.cargar_lab = true;
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
	agregarLabList(codex,cantidad){
		this.cargar_lab = false;
	  	this._usuarioService.agregarlabo(this.id_cita,codex,cantidad).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.obtenerDiagExa();
					}else{
						this.showError("Alerta","No hay Productos Agregados");
						this.cargar_lab = true;
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  			this.cargar_lab = true;
	  		}
	  	);
	}
	buscarlab(buscar){
	  	this._usuarioService.buscarLabo(buscar).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].busqueda){
						this.lista_laboratorio = res["mensaje"].busqueda;
						$('#laboratorio_lab').modal('show');
					}else{
						this.showError("Alerta","Error - Internet Lento");
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  		}
	  	);
	}
	actualizarLab(id,cantidad_lab,indicacion_lab,cpt_lab){
		this.cargar_inicio = false;
	  	this._usuarioService.actualizarlabo(id,cantidad_lab,indicacion_lab,cpt_lab).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.showSuccess("Alerta","Actualizar");
						this.obtenerDiagExa();
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
	eliminarLab(codex){
		this.eliminar_lab = false;
	  	this._usuarioService.eliminarLab(codex).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.eliminar_lab = true;
						this.obtenerDiagExa();
						this.showSuccess("Alerta","Actualizado");
					}else{
						this.showError("Alerta","Internet Lento - Volver a Intentarlo");
						this.eliminar_lab = true;
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  			this.eliminar_lab = true;
	  		}
	  	);
	}
	agregarDiagList(codex,cantidad){
		this.cargar_diag = false;
	  	this._usuarioService.agregarDiag(this.id_cita,codex,cantidad).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.obtenerDiagExa();
						
					}else{
						this.showError("Alerta","No hay Productos Agregados");
						this.cargar_diag = true;
					}
				}
	  		},
	  		error => {
	  			this.cargar_diag = true;
	  			this.showError("Alerta","Error de Internet");
	  		}
	  	);
	}
	buscarDiag(buscar){
	  	this._usuarioService.buscarDiag(buscar).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].busqueda){
						this.lista_diag = res["mensaje"].busqueda;
						$('#examen_diag').modal('show');
					}else{
						this.showError("Alerta","Error Internet Lento");
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  		}
	  	);
	}
	eliminarDiag(codex){
		this.eliminar_diag = false;
	  	this._usuarioService.eliminarDiag(codex).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.eliminar_diag = true;
						this.obtenerDiagExa();
						this.showSuccess("Alerta","Actualizado");
					}else{
						this.showError("Alerta","Internet Lento - Volver a Intentarlo");
						this.eliminar_diag = true;
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  			this.eliminar_diag = true;
	  		}
	  	);
	}
	actualizarDiag(id,cantidad_lab,indicacion_lab,cpt_lab){
		this.cargar_inicio = false;
	  	this._usuarioService.actualizarDiag(id,cantidad_lab,indicacion_lab,cpt_lab).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.showSuccess("Alerta","Actualizar");
						this.obtenerDiagExa();
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
}
