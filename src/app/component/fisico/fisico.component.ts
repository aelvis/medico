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
  	constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _router: Router, private route:ActivatedRoute) { 
  		this.route.params.forEach(x => this.id_cita = x['id_cita']);
  		this.cargar_inicio = true;
  	}

  	ngOnInit() {
  	}

}
