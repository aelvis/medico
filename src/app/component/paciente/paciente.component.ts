import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
	public paciente:any = [];
	public paciente_lista:any = [];
	public inicio:boolean;
	constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _router: Router) { 
		this.inicio = true;
	}
	ngOnInit(){
		this.obtenerPaciente();
	}
	showSuccess(titulo,mensaje) {
    	this.toastr.success(mensaje, titulo);
  	}
  	showError(titulo,mensaje) {
    	this.toastr.error(mensaje, titulo);
  	}
	obtenerPaciente(){
		this.inicio = false;
		this._usuarioService.obtenerPacienteService().subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].paciente){
						this.paciente = res["mensaje"].paciente;
						this.inicio = true;
					}else{
						this.showError("Alerta","No hay Ingresos");
						this.inicio = true;
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
				this.inicio = true;
			}
		);
	}
	abrirModalVer(buscar){
		this.inicio = false;
		this._usuarioService.obtenerPacienteServiceLista(buscar).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].lista){
						this.paciente_lista = res["mensaje"].lista;
						$('#exampleModal').modal('show');
						this.inicio = true;
					}else{
						this.showError("Alerta","No hay Ingresos");
						this.inicio = true;
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
				this.inicio = true;
			}
		);
		
	}
	cambiarDeUrl(url){
		$('#exampleModal').modal('hide');
 		this._router.navigate([url]);
	}
}
