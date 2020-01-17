import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ConsultaService} from '../../servicio/consulta.service';
import {NavController } from '@ionic/angular';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.page.html',
  styleUrls: ['./calificaciones.page.scss'],
})
export class CalificacionesPage implements OnInit {

  id: number;
  materia: String;
  titulo: String;
  calificacion: number;
  calificaciones: Array<any>;
  promedio: number;
  constructor(public nav: NavController,private activatedRoute: ActivatedRoute, public consulta: ConsultaService) {
    const num=this.activatedRoute.snapshot.paramMap.get('id');
    this.id=parseInt(num, 10);
    this.materia="Diseño de Software";
    this.calificaciones=this.consulta.obtenerCalificaciones();
    this.promedio = this.calcularPromedio(this.calificaciones);
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
    for (let i=0;i<calificaciones.length;i++) {
      suma+=calificaciones[i]["calificacion"];
    }
    promedio = Math.round(suma/calificaciones.length*100)/100;
    return promedio
  }

  segmentChanged(ev: any) {
    //this.nav.navigateForward(`calificaciones`);
    console.log('Segment changed', ev);
    /*if(ev.detail.value == "Tareas")
      this.nav.navigateForward(`tareas`);
    else if(ev.detail.value == "Asistencias")
      this.nav.navigateForward(`asistencias`);*/

    //console.log('Segment changed', ev.detail.value);
  }
  
}
