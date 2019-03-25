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
}
