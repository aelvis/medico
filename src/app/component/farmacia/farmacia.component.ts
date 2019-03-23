import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-farmacia',
  templateUrl: './farmacia.component.html',
  styleUrls: ['./farmacia.component.css']
})
export class FarmaciaComponent implements OnInit {

	public id_cita;
  constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _router: Router, private route:ActivatedRoute) {
  	this.route.params.forEach(x => this.id_cita = x['id_cita']);
   }

  ngOnInit() {
  }
  buscarProductoAgregar(nombre){
  	$("#farmacia").modal("show");
  }
  cerrarModalProducto(){
  	$("#farmacia").modal('hide');
  }
}
