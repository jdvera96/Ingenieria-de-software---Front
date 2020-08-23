import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common'; 
import {TareaService} from '../../servicios/profesor/tareas/tarea.service'

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'
import Swal from 'sweetalert2'

import * as $ from 'jquery';

@Component({
  selector: 'ngx-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {

  id_clase: string;
  objectTareas: any;
  objectSesiones: any;

  closeResult = '';

  constructor(private router: Router,
              private location: Location,
              private servicioTareas: TareaService,
              private activador: ActivatedRoute,
              private modalService: NgbModal) {

   }

  ngOnInit(): void {
    this.id_clase=this.activador.snapshot.paramMap.get('id');
    this.obtenerTareas();
  }

  openCrear(content) {

    //cargando las sesiones cuando el modal se abre
    this.obtenerSesionesPorClase();

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log('dio click en crear');
      
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

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

  obtenerTareas(){
    this.servicioTareas.obtenerTareas(this.id_clase).subscribe(result=>{
      this.objectTareas=result;
      console.log(this.objectTareas);
    }) 
  }

  obtenerSesionesPorClase(){
    this.servicioTareas.obtenerSesiones(this.id_clase).subscribe(result=>{
      console.log('sesiones: ',result);
      this.objectSesiones=result;
    })
  }

  nuevaTarea(){
    this.router.navigate(['/pages/nuevaTarea']);
  }

  crearTarea(){
    console.log('creando tarea');
    console.log('tarea creada');

    //obteniendo data del modal
    let sesion=$("#tarea_select_sesion option:selected").val();
    let titulo=$("#input_titulo").val();
    let descripcion=$("#input_descripcion").val();
    let dataStorage=localStorage.getItem("login-mitikas")
    let array=dataStorage.split("-")
    let id_profesor=array[3]

    this.servicioTareas.registrarTarea(id_profesor,sesion,titulo,descripcion).subscribe(result=>{
      console.log('result: ',result);

      if(result){
        console.log("tarea creada exitosamente");
        Swal.fire(
          'Exito',
          'Tarea creada exitosamente',
          'success'
        )
        this.obtenerTareas();
        this.modalService.dismissAll();
      }else{
        console.log("error");
      }
    })
    

  }


  tareaInfoView(content,id_tarea){
    this.servicioTareas.obtenerInfoTarea(id_tarea).subscribe(data=>{
      if(data){
        console.log(data)
        
        this.openView(content)
        
        this.servicioTareas.obtenerInfoSesion(data["id_sesion"]).subscribe(dataSesion=>{
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

  deleteTarea(id_tarea){

    this.servicioTareas.obtenerInfoTarea(id_tarea).subscribe(infoTarea=>{

      Swal.fire({
        title: `Eliminar tarea ${infoTarea["nombre_tarea"]}?`,
        text: "Esta acción no se podrá revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.value) {
          
          this.servicioTareas.eliminarTarea(id_tarea).subscribe(result=>{
            if(result){
              console.log('tarea eliminada');
              
              Swal.fire(
                'Tarea eliminada!',
                `Tarea ${infoTarea["nombre_tarea"]} ha sido eliminada`,
                'success'
              )

              this.obtenerTareas();
            }
          })

          
        }
      })

    })
    

    
  }

  goToBack(){
    this.location.back();
  }


}
