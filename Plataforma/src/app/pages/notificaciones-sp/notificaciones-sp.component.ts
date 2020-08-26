import { Component, OnInit } from '@angular/core';
import {NotificacionesService} from '../../servicios/notificaciones/notificaciones.service'
import * as $ from 'jquery';
import { CursosService } from '../../servicios/supervisor/cursos/cursos.service';

@Component({
  selector: 'ngx-notificaciones-sp',
  templateUrl: './notificaciones-sp.component.html',
  styleUrls: ['./notificaciones-sp.component.scss']
})
export class NotificacionesSPComponent implements OnInit {
  
  id_supervisor: string; 
  objectCursos: any;
  curso:boolean=false;
  

  constructor(private servicioNotificaciones: NotificacionesService,
    private servicioCurso: CursosService) { }

  ngOnInit(): void {
    (function() {
      'use strict';
      window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
            event.preventDefault();
            event.stopPropagation();
          }, false);
        });
      }, false);
    })();
    
    //obtener datos del local storage
    let data=localStorage.getItem('login-mitikas');
    let arreglo=data.split('-');
    this.id_supervisor=arreglo[3];

    //cargamos los cursos asignados al supervisor
    this.cargarCursos();
  }



  sendNotificacion(){

    let titulo=$('#notificacion_titulo').val();
    let descripcion=$('#notificacion_descripcion').val();
    let grupo=$('#notificacion_grupo').val();

    if(grupo=="Todos"){
      let objeto={"titulo": titulo,"descripcion":descripcion}
      this.servicioNotificaciones.enviarNotificacion(objeto).subscribe(result=>{
        console.log(result);
      }) 
    }else if(grupo=="Por curso"){
      let curso=$('#notificacion_curso').val();
      let id = $('#notificacion_curso option[value="'+curso+'"]').attr("id");
        //var id=$(this).children("selected").attr("id");
        let objeto={"titulo": titulo,"descripcion":descripcion,"id_clase":id}
        console.log(objeto);
        this.servicioNotificaciones.enviarNotificacionPorClase(objeto).subscribe(result=>{
          console.log(result);
        })
      

      /*let objeto={"titulo": titulo,"descripcion":descripcion,"id_clase":curso}
      console.log(objeto);
      this.servicioNotificaciones.enviarNotificacionPorClase(objeto).subscribe(result=>{
        console.log(result);
      })*/
    }else{
      let objeto={"titulo": titulo,"descripcion":descripcion,"grupo":grupo};
      console.log(objeto);
      this.servicioNotificaciones.enviarNotificacionPorGrupo(objeto).subscribe(result=>{
        console.log(result);
      }) 
    }
  }

  verificarIDsupervisor(){ // verifica si el id del supervisor esta cargado
    if(this.id_supervisor!=null){
      return 1;
    }else{
      return 0;
    }
  }

  cargarCursos(){
    if(this.verificarIDsupervisor){
      this.servicioCurso.obtenerCursos(this.id_supervisor).subscribe(result=>{
        console.log('cursos: ',result);
        this.objectCursos=result;
      });
    }else{
      console.log('error con id supervisor');
    }
  }

}
