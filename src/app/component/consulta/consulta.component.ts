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
  constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _router: Router) { }
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
		this._usuarioService.obtenerCitasMedicoSucursal().subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].medico){
						this.atencion = res["mensaje"].medico;
					}else{
						this.atencion = "No hay productos...";
					}
				}
			},
			error => {
				this.showSuccess("Alerta","Error de Internet");
			}
		);
	}

}
