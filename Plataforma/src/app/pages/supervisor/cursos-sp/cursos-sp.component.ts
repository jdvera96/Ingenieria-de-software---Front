import { Component, OnInit } from '@angular/core';

import {CursosService} from '../../../servicios/supervisor/cursos/cursos.service'
import {TareasSpService} from '../../../servicios/supervisor/tareas/tareas-sp.service'
import {CalificacionService} from '../../../servicios/supervisor/calificaciones/calificacion.service'
import {AsistenciaService} from '../../../servicios/supervisor/asistencias/asistencia.service'


import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'
import Swal from 'sweetalert2'

import * as $ from 'jquery';

@Component({
  selector: 'ngx-cursos-sp',
  templateUrl: './cursos-sp.component.html',
  styleUrls: ['./cursos-sp.component.scss']
})
export class CursosSpComponent implements OnInit {

  id_supervisor: string; 
  objectCursos: any;
  
  constructor(private servicioCurso: CursosService,private servicioTarea: TareasSpService,
              private servicioCalificaciones: CalificacionService,
              private servicioAsistencias: AsistenciaService
    ) { }

  ngOnInit(): void {

    //obtener datos del local storage
    let data=localStorage.getItem('login-mitikas');
    let arreglo=data.split('-');
    this.id_supervisor=arreglo[3];

    //cargamos los cursos asignados al supervisor
    this.cargarCursos();

    this.detectarSelect();

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

  detectarSelect(){
      
      let select_accion=$('#accion_select').val();
      let select_cursos=$('#curso_select').val();

      console.log('id curso: ',select_cursos);

      if(select_accion==2){

        this.servicioCalificaciones.obtenerTareas(select_cursos).subscribe(result=>{
          this.mostrarSelectorTareas(result);
        })

      }else{
        $('#div_tareas').html(" ")

        if(select_accion==3){
          this.servicioAsistencias.obtenerSesiones(select_cursos).subscribe(result=>{
            this.mostrarSelectorSesiones(result);

          })
        }
      }

  }
  
  accionConsultar(){
    let select_cursos=$('#curso_select').val()
    let select_accion=$('#accion_select').val()
    
    if(select_cursos==null || select_accion==null){
      console.log('no ha seleccionado');
    }else{
      console.log('puede consultar')

      if(select_accion=='1'){
        console.log('consultar tareas')
        this.consultarTareas(select_cursos)
      }else if(select_accion=='2'){
        console.log('consultar calificaciones');

        let select_tarea=$('#tarea_select').val()
        this.consultarCalificaciones(select_tarea);
      }else if(select_accion=='3'){
        console.log('consultar asistencias')
        let select_sesion=$('#sesion_select').val()
        this.consultarAsistencias(select_sesion);
      }

    }
  }


  //----- seccion consultas principales

  consultarTareas(id_clase){
    this.servicioTarea.obtenerTareas(id_clase).subscribe(result=>{
      console.log('tareas: ',result);

      this.mostrarTablaTareas(result);
    })
  }

  consultarCalificaciones(id_tarea){

    this.servicioCalificaciones.obtenerCalificaciones_Estudiantes(id_tarea).subscribe(result=>{
      
      this.mostrarTablaCalificaciones(result);
    })
    
  }

  consultarAsistencias(id_sesion){

    this.servicioAsistencias.obtenerAsistencia_Estudiantes(id_sesion).subscribe(result=>{
      console.log('asistencias: ',result);
      this.mostrarTablaAsistencias(result);
    })
    
  }



  //--------- seccion de mostrar tablas  --------------

  mostrarTablaTareas(data){

    let table=$(`<table class="table"></table>`);

    let cabecera=$(`<thead class="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Sesion</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Accion</th>
                      </tr>
                    </thead>`);
    
    let body=$(`<tbody></tbody>`);

    for(let i=0;i<data.length;i+=1){
      let fila=$(`<tr>
                    <th scope="row">${i+1}</th>
                    <td>${data[i].nombre_tarea}</td>
                    <td>${data[i].id_sesion}</td>
                    <td>${data[i].estado}</td>
                    
                    <td>
                    <button class="btn btn-sm btn-success seeButton" ><i class="far fa-eye"></i>&nbsp;</button>
                    </td>
                  </tr>`)
      
      body.append(fila);
    }
    
    table.append(cabecera);
    table.append(body);


    //agregando al html
    $('#show_data').html(" ")
    $('#show_data').append(table);

  }

  mostrarTablaCalificaciones(data){
    let table=$(`<table class="table"></table>`);

    let cabecera=$(`<thead class="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Calificacion</th>
                        <th scope="col">Accion</th>
                      </tr>
                    </thead>`);
    
    let body=$(`<tbody></tbody>`);

    for(let i=0;i<data.length;i+=1){
      let fila=$(`<tr>
                    <th scope="row">${i+1}</th>
                    <td>${data[i].id_estudiante.nombres}</td>
                    <td>${data[i].estado}</td>
                    <td>${data[i].calificacion}</td>
                    
                    <td>
                    <button class="btn btn-sm btn-success seeButton" ><i class="far fa-eye"></i>&nbsp;</button>
                    </td>
                  </tr>`)
      
      body.append(fila);
    }
    
    table.append(cabecera);
    table.append(body);


    //agregando al html
    $('#show_data').html(" ")
    $('#show_data').append(table);

  }

  mostrarTablaAsistencias(data){
    let table=$(`<table class="table"></table>`);

    let cabecera=$(`<thead class="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Estado</th>
    
                        <th scope="col">Accion</th>
                      </tr>
                    </thead>`);
    
    let body=$(`<tbody></tbody>`);

    for(let i=0;i<data.length;i+=1){
      let fila=$(`<tr>
                    <th scope="row">${i+1}</th>
                    <td>${data[i].id_estudiante.nombres}</td>
                    <td>${data[i].asisteencia}</td>
                   
                    
                    <td>
                    <button class="btn btn-sm btn-success seeButton" ><i class="far fa-eye"></i>&nbsp;</button>
                    </td>
                  </tr>`)
      
      body.append(fila);
    }
    
    table.append(cabecera);
    table.append(body);


    //agregando al html
    $('#show_data').html(" ")
    $('#show_data').append(table);

  }

  mostrarSelectorTareas(tareas){

      //cargando el selector con tareas al html
      let p=$(`<p class="titulo_h2">Eliga una tarea</p>`);
      let selector=$(`<select class="form-control" id="tarea_select" >
                        <option value="" selected disabled>Seleccione una tarea</option>
                    </select>`);

      for(let i=0;i<tareas.length;i+=1){
          let opcion=$(`<option value="${tareas[i].id}" >${tareas[i].nombre_tarea}</option>`)
          selector.append(opcion);
      }
      
      $('#div_tareas').html(" ")
      $('#div_tareas').append(p);                    
      $('#div_tareas').append(selector);
  }

  mostrarSelectorSesiones(sesiones){

    //cargando el selector con tareas al html
    let p=$(`<p class="titulo_h2">Eliga una sesion</p>`);
    let selector=$(`<select class="form-control" id="sesion_select" >
                      <option value="" selected disabled>Seleccione una sesion</option>
                  </select>`);

    for(let i=0;i<sesiones.length;i+=1){
        let opcion=$(`<option value="${sesiones[i].id}" >${sesiones[i].titulo}</option>`)
        selector.append(opcion);
    }
    
    $('#div_sesionees').html(" ")
    $('#div_sesiones').append(p);                    
    $('#div_sesiones').append(selector);
}

}
