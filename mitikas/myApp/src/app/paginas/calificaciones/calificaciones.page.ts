import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ConsultaService} from '../../servicio/consulta.service';
import {NavController } from '@ionic/angular';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.page.html',
  styleUrls: ['./calificaciones.page.scss'],
})

export class CalificacionesPage implements OnInit {
  prueba: boolean = false;
  id: number;
  materia: String;
  titulo: String;
  calificacion: number;
  calificaciones: Array<any>;
  promedio: number;
  datos: any[];
  tam:number
  reload: boolean = false;
  env = environment;
  
  constructor(public nav: NavController,private activatedRoute: ActivatedRoute, public consulta: ConsultaService) {
    this.obtenerCalificaciones();
   }

  ngOnInit() {
  }
  ngAfterViewInit() {
    const searchbar = document.querySelector('ion-searchbar');
    var items: HTMLElement[] =(<HTMLElement[]> <any> document.getElementsByTagName('ion-item'));
    searchbar.addEventListener('ionInput', handleInput);
    function handleInput(event) {
      const query = event.target.value.toLowerCase();
      requestAnimationFrame(() => {
        for(let i =0;i<items.length;i++){
          let item = items[i]
          const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
          item.style.display = shouldShow ? 'block' : 'none';
        }
      });
    }
  }

  calcularPromedio(calificaciones){
    let promedio = 0;
    let suma = 0;
    this.tam = calificaciones.length;
    for (let i = 0;i<this.tam;i++) {
      suma+=calificaciones[i]["calificacion"];
    }
    promedio = Math.round(suma/this.tam*100)/100;
    return promedio
  }

  segmentChanged(ev: any) {
    if(ev.detail.value == "Tareas")
      this.nav.navigateRoot(`tareas/${this.id}`);
    else if(ev.detail.value == "Asistencias")
      this.nav.navigateRoot(`asistencias/${this.id}`);
  }

  obtenerCalificaciones(){
    var num = '1';
    if(this.env.production){
      const number=this.activatedRoute.snapshot.paramMap.get('id_clase');
      num = number;
    }
    this.id=parseInt(num, 10);
    this.consulta.obtenerClase(localStorage.getItem("id"),num).subscribe((data)=>{
      var anydata=<any>data;
      this.datos = anydata;
      this.titulo =data[0]["id_tarea"]["id_sesion"]["id_clase"]["titulo"];
      this.promedio = this.calcularPromedio(this.datos);
      /*if(!this.reload){
        console.log("aqui");
        location.reload();
        this.reload = true;
        console.log(this.reload);
      }*/
    });
  }
  
}
