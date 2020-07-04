import { Component, OnInit } from '@angular/core';
import {NotificacionesService} from '../../servicios/notificaciones/notificaciones.service'
import * as $ from 'jquery';

@Component({
  selector: 'ngx-notificaciones-sp',
  templateUrl: './notificaciones-sp.component.html',
  styleUrls: ['./notificaciones-sp.component.scss']
})
export class NotificacionesSPComponent implements OnInit {

  constructor(private servicioNotificaciones: NotificacionesService) { }

  ngOnInit(): void {
  }



  sendNotificacion(){

    let titulo=$('#notificacion_titulo').val();
    let descripcion=$('#notificacion_descripcion').val();

    let objeto={"titulo": titulo,"descripcion":descripcion}
    

    this.servicioNotificaciones.enviarNotificacion(objeto).subscribe(result=>{
      console.log(result);

      $('#notificacion_titulo').val('');
      $('#notificacion_descripcion').val('')
    }) 
  }

}
