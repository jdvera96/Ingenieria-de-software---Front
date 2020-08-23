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
  objectSesiones: any;

  
  closeResult = '';

  constructor(private servicioCurso: CursosService,private servicioTarea: TareasSpService,
              private servicioCalificaciones: CalificacionService,
              private servicioAsistencias: AsistenciaService,
              private modalService: NgbModal
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

  cargarSesiones(id_clase){
    this.servicioTarea.obtenerSesiones(id_clase).subscribe(result=>{
      this.objectSesiones=result;
      
      this.consultarTareas(id_clase);

    })
  }


  detectarSelect(){
      
    //limpiando div de selectores tareas y asistencias
    $('#div_tareas').html(" ")
    $('#div_sesiones').html(" ")

      let select_accion=$('#accion_select').val();
      let select_cursos=$('#curso_select').val();

      console.log('id curso: ',select_cursos);

      if(select_accion==2){

        this.servicioCalificaciones.obtenerTareas(select_cursos).subscribe(result=>{
          this.mostrarSelectorTareas(result);
        })

      }else{
        
        if(select_accion==3){
          this.servicioAsistencias.obtenerSesiones(select_cursos).subscribe(result=>{
            this.mostrarSelectorSesiones(result);

          })
        }
      }

  }
  

  //-------- accion del button CONSULTAR------------
  accionConsultar(){
    let select_cursos=$('#curso_select').val()
    let select_accion=$('#accion_select').val()
    
    if(select_cursos==null || select_accion==null){
      console.log('no ha seleccionado');
    }else{
      console.log('puede consultar')

      if(select_accion=='1'){
        //cargo las sessiones y dentro hago la consulta de las tareas
        this.cargarSesiones(select_cursos);

        

      }else if(select_accion=='2'){
        console.log('consultar calificaciones');

        let select_tarea=$('#tarea_select').val()
        this.consultarCalificaciones(select_tarea);
      }else if(select_accion=='3'){
        console.log('consultar asistencias')
        let select_sesion=$('#sesion_select').val()
        this.consultarAsistencias(select_sesion);
      
      }else if(select_accion=='4'){
        console.log('mostrar Listado del curso');
        this.consultarListado(select_cursos);
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

  consultarListado(id_curso){
    this.servicioCurso.obtenerListado(id_curso).subscribe(result=>{
      this.mostrarTablaListado(result);
    });
  }

  //--------- funciones de utilidad -------------------
  encontrarSesionByID(id_sesion){
    for(let i=0;i<this.objectSesiones.length;i+=1){
      if(this.objectSesiones[i].id==id_sesion){
        return this.objectSesiones[i].titulo;
      }
    }

    return null;
  }

  //--------- seccion de mostrar tablas  --------------

  mostrarTablaTareas(data){

    let table=$(`<table class="table"></table>`);

    let cabecera=$(`<thead class="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Sesion</th>
                        <th scope="col">Fecha Creación</th>
                        <th scope="col">Acción</th>
                      </tr>
                    </thead>`);
    
    let body=$(`<tbody></tbody>`);



    for(let i=0;i<data.length;i+=1){

      //obtengo el nombre de la sesion mediante el id_sesion
      let nombre_sesion=this.encontrarSesionByID(data[i].id_sesion);

      let fila=$(`<tr>
                    <th scope="row">${i+1}</th>
                    <td>${data[i].nombre_tarea}</td>
                    <td>${nombre_sesion}</td>
                    <td>${data[i].estado}</td>
                    
                    <td>
                      <button onclick="document.getElementById('id01').style.display='block'" class="btn btn-sm btn-success seeButton" id="${data[i].id}">
                        <i class="far fa-eye"></i>&nbsp; Ver
                      </button>
                    </td>
                  </tr>`)
      
      body.append(fila);
    }
    
    table.append(cabecera);
    table.append(body);


    //agregando al html
    $('#show_data').html(" ")
    $('#show_data').append(table);

    $('.seeButton').click(function(){

      console.log('dio click')

      //obteniendo datos de la tarea
      
      $.get("https://patricioxavi10.pythonanywhere.com/api/getTarea/18", function(data, status){
        console.log(data);

        
        //asignando al modal
        $("#campo_titulo").text(data['nombre_tarea']);
        $("#campo_sesion").text(data['id_sesion']);
        $("#campo_descripcion").text(data['descripcion_tarea']);
        $("#campo_fecha").text('pendiente');
        $("#campo_url").text('pendiente');
      });

      
      
    })

    

  }

  mostrarTablaCalificaciones(data){
    let table=$(`<table class="table"></table>`);

    let cabecera=$(`<thead class="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Apellidos y Nombres</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Calificacion</th>
                        
                      </tr>
                    </thead>`);
    
    let body=$(`<tbody></tbody>`);

    console.log(data)

    for(let i=0;i<data.length;i+=1){

      if(data[i].estado==false){
        data[i].estado='sin calificar'
      }

      if(data[i].calificacion==null){
        data[i].calificacion=0
      }

      //formateando nombres y apellidos
      let nombre=data[i].id_estudiante.nombres.split(' ')[0]
      

      let fila=$(`<tr>
                    <th scope="row">${i+1}</th>
                    <td>${data[i].id_estudiante.apellidos} ${data[i].id_estudiante.nombres}</td>
                    <td>${data[i].estado}</td>
                    <td>${data[i].calificacion}</td>
                   
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
                        <th scope="col">Apellidos y Nombres</th>
                        <th scope="col">Asistencias</th>
    
                      </tr>
                    </thead>`);
    
    let body=$(`<tbody></tbody>`);

    for(let i=0;i<data.length;i+=1){
      let fila=$(`<tr>
                    <th scope="row">${i+1}</th>
                    <td>${data[i].id_estudiante.apellidos} ${data[i].id_estudiante.nombres}</td>
                    <td>${data[i].asistencia}</td>
                   
                   
                  </tr>`)
      
      body.append(fila);
    }
    
    table.append(cabecera);
    table.append(body);


    //agregando al html
    $('#show_data').html(" ")
    $('#show_data').append(table);

  }

  mostrarTablaListado(listaCurso){
    console.log(listaCurso);
    let table=$(`<table class="table"></table>`);

    let cabecera=$(`<thead class="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Apellidos y Nombres</th>
                        <th scope="col">Rol</th>
    
                      </tr>
                    </thead>`);
    
    let body=$(`<tbody></tbody>`);

    let fila_profesor=$(`<tr>
                          <th scope="row">1</th>
                          <td>${listaCurso.id_profesor.apellidos} ${listaCurso.id_profesor.nombres}</td>
                          <td>Profesor</td>
                        </tr>`)

    //agrego la primera fila a la tabla de datos
    body.append(fila_profesor);
    
    //recorro la lista de alumnos y agrego al body de la tabla
    let listaEstudiantes=listaCurso.id_estudiante
    
    for(let i=0;i<listaEstudiantes.length;i+=1){
      let fila=$(`<tr>
                    <th scope="row">${i+2}</th>
                    <td>${listaEstudiantes[i].apellidos} ${listaEstudiantes[i].nombres}</td>
                    <td>Alumno</td>
                   
                   
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
    
    $('#div_sesiones').html(" ")
    $('#div_sesiones').append(p);                    
    $('#div_sesiones').append(selector);
  }


  //---------------funciones para modales ----------------
  openView(content) {

    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title-view'}).result.then((result) => {
      console.log('dio click en Cerrar');
      
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  tareaInfoView(content,id_tarea){
    this.servicioTarea.obtenerInfoTarea(id_tarea).subscribe(data=>{
      if(data){
        console.log(data)
        
        this.openView(content)
        
        this.servicioTarea.obtenerInfoSesion(data["id_sesion"]).subscribe(dataSesion=>{
            //asignando informacion a los input del modal detalles
            $("#view_input_sesion").val(dataSesion["titulo"]);
            $("#view_input_titulo").val(data['nombre_tarea']);
            $("#view_input_descripcion").val(data['descripcion_tarea']);

        })


      }else{
        console.log('error en obtener tarea')
      }
    })
  }

}
