import { Component, OnInit } from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'
import Swal from 'sweetalert2'
import * as $ from 'jquery';


import {EstudianteService} from '../../../servicios/administrador/estudiantes/estudiante.service'

@Component({
  selector: 'ngx-gestion-estudiantes',
  templateUrl: './gestion-estudiantes.component.html',
  styleUrls: ['./gestion-estudiantes.component.scss']
})
export class GestionEstudiantesComponent implements OnInit {

  estudiantesObject: any;
  respaldoEstudiantesObject: any;
  closeResult = '';
  texto: string;

  constructor(private modalService: NgbModal,
              private estudianteService: EstudianteService
    ) { }

  ngOnInit(): void {
     this.obtenerTodos();
     
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

  obtenerTodos(){
    this.estudianteService.obtenerTodosEstudiantes().subscribe(result=>{
        this.estudiantesObject=result;
        this.respaldoEstudiantesObject=result;
    })
  }

  crearEstudiante(){

    let email=$('#view_inputCrear_correo').val();
    let password=$('#view_inputCrear_password').val();
    let rol='estudiante';
    let nombres=$('#view_inputCrear_nombres').val();
    let apellidos=$('#view_inputCrear_apellidos').val();
    let cedula=$('#view_inputCrear_cedula').val()
    let fecha=$('#view_inputCrear_fecha').val();
    let direccion=$('#view_inputCrear_direccion').val();
    let telefono=$('#view_inputCrear_telefono').val();
    let escolaridad=$('#view_inputCrear_escolaridad').val();
    let pais=$('#view_inputCrear_pais').val();
    let ciudad=$('#view_inputCrear_ciudad').val();
    let grupo=$('#view_inputCrear_grupo').val();
    let sexo=$('#view_inputCrear_sexo').val()

    let data={
      "email": email,
      "password": password,
      "rol": rol,
      "profile": {
          "nombres": nombres,
          "apellidos": apellidos,
          "cedula": cedula,
          "fecha_nacimiento": fecha,
          "direccion": direccion,
          "telefono": telefono,
          "escolaridad": escolaridad,
          "pais": pais,
          "ciudad": ciudad,
          "sexo": sexo,
          "grupo_excluido": grupo,
          "estado": true
      }

    }

    console.log('data: ',data);

    this.estudianteService.crearEstudiante(data).subscribe(result=>{
      console.log('result: ',result);
      if(result){
        Swal.fire(
          'Exito',
          ' Estudiante creado exitosamente',
          'success'
        )

        this.obtenerTodos();
      }else{
        //manejar error 400 del servidor
      }
    })
  }

  estudianteCrearView(content){
    
        this.openView(content)


  }

  estudianteInfoView(content,id_estudiante){
    this.estudianteService.obtenerInfoEstudiante(id_estudiante).subscribe(data=>{
      if(data){
        console.log(data)
        
        this.openView(content)

        let nombres= data['apellidos'] +' ' + data['nombres'] 
        $("#view_input_nombres").val(nombres);

        $("#view_input_cedula").val(data['cedula']);
        $("#view_input_direccion").val(data['direccion']);
        $("#view_input_telefono").val(data['telefono']);
        $("#view_input_escolaridad").val(data['escolaridad']);
        $("#view_input_fecha").val(data['fecha_nacimiento']);
        
        $("#view_input_pais").val(data['pais']);
        $("#view_input_ciudad").val(data['ciudad']);
        $("#view_input_sexo").val(data['sexo']);
        $("#view_input_grupo").val(data['grupo_excluido']);
       

      }else{
        console.log('error en obtener estudiante')
      }
    })
  }

  desbloquearCampos(){

    //bloqueo el button de habilitar edicion
    $("#btn_habilitar").attr('disabled','disabled');

    $("#view_input_nombres").removeAttr('disabled');
    $("#view_input_telefono").removeAttr('disabled');
    $("#view_input_direccion").removeAttr('disabled');
    $("#view_input_fecha").removeAttr('disabled');
    $("#view_input_escolaridad").removeAttr('disabled');
    $("#view_input_pais").removeAttr('disabled');
    $("#view_input_ciudad").removeAttr('disabled');
    $("#view_input_sexo").removeAttr('disabled');
    $("#view_input_grupo").removeAttr('disabled');

   
  }
  
  guardarCambios(){
    let nombres_apelllidos=$("#view_input_nombres").val();

    let arreglo=nombres_apelllidos.split(' ')

    let apellidos=arreglo[0]+" "+arreglo[1];
    let nombres=arreglo[2] + " "+arreglo[3];

    let cedula=$("#view_input_cedula").val();
    let direccion=$("#view_input_direccion").val();
    let telefono=$("#view_input_telefono").val();
    let escolaridad=$("#view_input_escolaridad").val();
    let fecha=$("#view_input_fecha").val();
    let pais=$("#view_input_pais").val();
    let ciudad=$("#view_input_ciudad").val();
    let sexo=$("#view_input_sexo").val();
    let grupo=$("#view_input_grupo").val();

    let data={
              "nombres": nombres,
              "apellidos": apellidos,
              "cedula": cedula,
              "fecha_nacimiento": fecha,
              "direccion": direccion,
              "telefono": telefono,
              "escolaridad": escolaridad,
              "pais": pais,
              "ciudad": ciudad,
              "sexo": sexo,
              "grupo_excluido": grupo,
              "estado": true
  }

    this.estudianteService.actualizarInfoEstudiante(cedula,data).subscribe(result=>{
        console.log('respuesta',result);

        if(result){

          Swal.fire(
            'Exito',
            ' actualizacion exitosa',
            'success'
          )

          this.obtenerTodos();

        }

    })

  }
  
  deleteEstudiante(id_estudiante){
    this.estudianteService.eliminarEstudiante(id_estudiante).subscribe(result=>{

      this.estudianteService.obtenerInfoEstudiante(id_estudiante).subscribe(result=>{
        Swal.fire({
          title: `Eliminar estudiante: \n ${result["nombres"]} ${result["apellidos"]}?`,
          text: "Esta acción no se podrá revertir",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'

        }).then((resultado) => {
          console.log('resultado: ',resultado)
          if (resultado.value) {
            
            this.estudianteService.eliminarEstudiante(id_estudiante).subscribe(result=>{
              if(result){
                console.log('estudiante eliminado');
                
                Swal.fire(
                  'Estudiante eliminado!',
                  `Estudiante ${result["nombres"]} ${result["apellidos"]} ha sido eliminado`,
                  'success'
                )
  
                this.obtenerTodos();
              }
            })
  
            
          }
        })
  
      })

    })
  }

  onKey(event){
    //capturo lo que el usuario escribe 
    console.log(event.target.value)
    let texto=event.target.value;
    
    let coincidencias=[]

    for(let i=0;i<this.respaldoEstudiantesObject.length;i+=1){
        let objeto=this.respaldoEstudiantesObject[i]

       
        let nombreEncontrado=objeto.nombres.toLowerCase().indexOf(texto);
        let apellidoEncontrado= objeto.apellidos.toLowerCase().indexOf(texto);
        let cedulaEncontrada= objeto.cedula.toLowerCase().indexOf(texto);

        if(nombreEncontrado!=-1 || apellidoEncontrado!=-1 || cedulaEncontrada!=-1){
          coincidencias.push(objeto);
        }
    }

    this.estudiantesObject=coincidencias;
    
  }

}
