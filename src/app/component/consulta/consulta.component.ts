import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
	public atencion:any = [];
	public inicio:boolean;
	constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _router: Router) { 
		this.inicio = true;
	}
	ngOnInit(){
		this.obtenerCitas();
	}
	showSuccess(titulo,mensaje) {
    	this.toastr.success(mensaje, titulo);
  	}
  	showError(titulo,mensaje) {
    	this.toastr.error(mensaje, titulo);
  	}
	obtenerCitas(){
		this.inicio = false;
		this._usuarioService.obtenerCitasMedicoSucursal().subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].medico){
						this.atencion = res["mensaje"].medico;
						this.inicio = true;
					}else{
						this.atencion = "No hay productos...";
						this.inicio = true;
					}
				}
			},
			error => {
				this.showSuccess("Alerta","Error de Internet");
				this.inicio = true;
			}
		);
	}

}
