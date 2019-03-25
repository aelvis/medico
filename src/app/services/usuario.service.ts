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
	actualizarDiag(id,cantidad_lab,indicacion_lab,cpt_lab){
		let params = new HttpParams();
		params = params.append('cantidad', cantidad_lab);
		params = params.append('indicacion', indicacion_lab);
		params = params.append('cpt', cpt_lab);
		params = params.append('codex', id);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/actualizarExamenes', params, {headers: headers});
	}
	obtenerProCiruService(codex){
		let params = new HttpParams();
		params = params.append('codex_ls_sad', codex);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/obtenerProceCiru', params, {headers: headers});
	}
	buscarProcedimientoService(buscar){
		let params = new HttpParams();
		params = params.append('buscar', buscar);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/buscarProcedimiento', params, {headers: headers});
	}
	buscarCirugiaService(buscar){
		let params = new HttpParams();
		params = params.append('buscar', buscar);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/buscarCirugia', params, {headers: headers});
	}
	agregarProcedimientoService(code_citrica,codex,cantidad){
		let params = new HttpParams();
		params = params.append('code_citrica', code_citrica);
		params = params.append('code_pro', codex);
		params = params.append('cantidad', cantidad);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/agregarProcedimiento', params, {headers: headers});
	}
	agregarCirugiaService(code_citrica,codex,cantidad){
		let params = new HttpParams();
		params = params.append('code_citrica', code_citrica);
		params = params.append('code_ciru', codex);
		params = params.append('cantidad', cantidad);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/agregarCirugia', params, {headers: headers});
	}
	eliminarProcedimientoService(codex){
		let params = new HttpParams();
		params = params.append('codex', codex);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/eliminarProcedimiento', params, {headers: headers});	
	}
	eliminarCirugiaService(codex){
		let params = new HttpParams();
		params = params.append('codex', codex);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/eliminarCirugia', params, {headers: headers});	
	}
	actualizarProcedimientoService(id,cantidad,indicacion,cpt){
		let params = new HttpParams();
		params = params.append('cantidad', cantidad);
		params = params.append('indicacion', indicacion);
		params = params.append('cpt', cpt);
		params = params.append('codex', id);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/actualizarProcedimiento', params, {headers: headers});
	}
	actualizarCirugiaService(id,cantidad,indicacion,cpt){
		let params = new HttpParams();
		params = params.append('cantidad', cantidad);
		params = params.append('indicacion', indicacion);
		params = params.append('cpt', cpt);
		params = params.append('codex', id);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/actualizarCirugia', params, {headers: headers});
	}
	obtenerFisiDiagService(codex){
		let params = new HttpParams();
		params = params.append('codex_ls_sad', codex);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/obtenerFisiDiag', params, {headers: headers});
	}
	obtenerAnteAnamService(codex){
		let params = new HttpParams();
		params = params.append('codex_ls_sad', codex);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/obtenerAnteAnam', params, {headers: headers});
	}
	buscarFisicoService(buscar){
		let params = new HttpParams();
		params = params.append('buscar', buscar);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/buscarFisico', params, {headers: headers});
	}
	buscarDiagnosticoService(buscar){
		let params = new HttpParams();
		params = params.append('buscar', buscar);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/buscarDiagnostico', params, {headers: headers});
	}
	agregarFisicoService(code_citrica,codex){
		let params = new HttpParams();
		params = params.append('code_citrica', code_citrica);
		params = params.append('code_pro', codex);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/agregarFisico', params, {headers: headers});
	}
	agregarDiagnosticoService(code_citrica,codex){
		let params = new HttpParams();
		params = params.append('code_citrica', code_citrica);
		params = params.append('code_pro', codex);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/agregarDiagnostico', params, {headers: headers});
	}
	eliminarFisicoService(codex){
		let params = new HttpParams();
		params = params.append('codex', codex);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/eliminarFisico', params, {headers: headers});	
	}
	eliminarDiagnosticoService(codex){
		let params = new HttpParams();
		params = params.append('codex', codex);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/atencion/medico/eliminarDiagnostico', params, {headers: headers});	
	}
}