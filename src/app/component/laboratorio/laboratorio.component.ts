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
  	this.obtenerDiagExa();
  }
  obtenerDiagExa(){
	  	this._usuarioService.obtenerLaboDiag(this.id_cita).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].laboratorio){
						this.laboratorio = res["mensaje"].laboratorio;
						this.examen = res["mensaje"].examen;
						this.lista_laboratorio = res["mensaje"].lista_laboratorio;
						this.lista_diag = res["mensaje"].lista_diag;
					}else{
						this.showError("Alerta","No hay Productos Agregados");
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  		}
	  	);
  }
	agregarLabList(codex,cantidad){
	  	this._usuarioService.agregarlabo(this.id_cita,codex,cantidad).subscribe(
	  		res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].laboratorio){
						this.obtenerDiagExa();
					}else{
						this.showError("Alerta","No hay Productos Agregados");
					}
				}
	  		},
	  		error => {
	  			this.showError("Alerta","Error de Internet");
	  		}
	  	);
	}
	agregarDiagList(codex,cantidad){

	}
}
