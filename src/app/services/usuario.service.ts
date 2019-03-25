import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { GLOBAL } from './global';	

@Injectable()
export class UsuarioService{

	public url: string;
	public token;
	constructor(private _http: HttpClient){
		this.url = GLOBAL.url;
	}
	login(user_to_login, gettoken = null){
		if(gettoken != null){
			user_to_login.gettoken = gettoken;
		}
		let params = JSON.stringify(user_to_login);
		let headers = new HttpHeaders({'Content-Type':'application/json'});
		return this._http.post(this.url+'/login/auth/login', params, {headers: headers});
	}
	getToken(){
		let token = localStorage.getItem('token');
		if(token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}
		return this.token;
	}
	obtenerCitasMedicoSucursal(){
		let params = new HttpParams();
		params = params.append('nuevo', 'nuevo');
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/obtenerCita', params, {headers: headers});
	}
	obtenerProductoFarmaciarMedico(codex_ls_sad){
		let params = new HttpParams();
		params = params.append('codex_ls_sad', codex_ls_sad);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/obtenerProductosFarmacia', params, {headers: headers});
	}
	buscarProductoModal(nombre){
		let params = new HttpParams();
		params = params.append('nombre', nombre);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/buscarNombreModal', params, {headers: headers});
	}
	agregarFarmacia(id_cita,producto_id,cantidad){
		let params = new HttpParams();
		params = params.append('code_pro', producto_id);
		params = params.append('cantidad', cantidad);
		params = params.append('pro_cita', id_cita);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/agregarProductoFarmacia', params, {headers: headers});
	}
	actualizarFarmaciaProducto(codex,via,dia,hora,indicaciones){
		let params = new HttpParams();
		params = params.append('codex', codex);
		params = params.append('via', via);
		params = params.append('dia', dia);
		params = params.append('hora', hora);
		params = params.append('indicaciones', indicaciones);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/actualizarProductosReceta', params, {headers: headers});
	}
	eliminarProdFarService(codex){
		let params = new HttpParams();
		params = params.append('codex', codex);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/eliminarProFar', params, {headers: headers});
	}
	obtenerLaboDiag(codex){
		let params = new HttpParams();
		params = params.append('codex_ls_sad', codex);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/obtenerLaboDiag', params, {headers: headers});
	}
	agregarlabo(code_citrica,codex,cantidad){
		let params = new HttpParams();
		params = params.append('code_citrica', code_citrica);
		params = params.append('code_loborium', codex);
		params = params.append('cantidad', cantidad);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/agregarLaboratorio', params, {headers: headers});
	}
	actualizarlabo(id,cantidad_lab,indicacion_lab,cpt_lab){
		let params = new HttpParams();
		params = params.append('cantidad', cantidad_lab);
		params = params.append('indicacion', indicacion_lab);
		params = params.append('cpt', cpt_lab);
		params = params.append('codex', id);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/actualizarLaboratorio', params, {headers: headers});
	}
	buscarLabo(buscar){
		let params = new HttpParams();
		params = params.append('buscar', buscar);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/buscarLaboratorio', params, {headers: headers});
	}
	eliminarLab(codex){
		let params = new HttpParams();
		params = params.append('codex', codex);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/eliminarLaboratorio', params, {headers: headers});	
	}
	agregarDiag(code_citrica,codex,cantidad){
		let params = new HttpParams();
		params = params.append('code_citrica', code_citrica);
		params = params.append('code_diag', codex);
		params = params.append('cantidad', cantidad);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/agregarExamenes', params, {headers: headers});
	}
	buscarDiag(buscar){
		let params = new HttpParams();
		params = params.append('buscar', buscar);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/buscarExamenes', params, {headers: headers});
	}
	eliminarDiag(codex){
		let params = new HttpParams();
		params = params.append('codex', codex);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/eliminarExamenes', params, {headers: headers});	
	}
}