import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common'; 
import {TareaService} from '../../servicios/profesor/tareas/tarea.service'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'

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

  open(content) {

    //cargando las sesiones cuando el modal se abre
    this.obtenerSesionesPorClase();

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log('dio click en crear');
      
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


    console.log('titulo: ',titulo);
    console.log('descripcion: ',descripcion);
    console.log('sesion: ',sesion);
    console.log('id profesor: ',id_profesor);


    this.servicioTareas.registrarTarea(id_profesor,sesion,titulo,descripcion).subscribe(result=>{
      console.log('result: ',result);

      if(result){
        console.log("tarea creada exitosamente");
        this.modalService.dismissAll();
      }else{
        console.log("error");
      }
    })
    

  }

  goToBack(){
    this.location.back();
  }


}
