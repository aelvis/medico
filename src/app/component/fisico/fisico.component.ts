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
	public fisico:boolean;
	public diagnostico:boolean;
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
}
