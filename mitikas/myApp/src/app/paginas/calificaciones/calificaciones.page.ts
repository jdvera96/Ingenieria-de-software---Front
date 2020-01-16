import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ConsultaService} from '../../servicio/consulta.service';
import { NumericValueAccessor } from '@ionic/angular';
import * as $ from 'jquery';

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
  constructor(private activatedRoute: ActivatedRoute, public consulta: ConsultaService) {
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
    const items = Array.from(document.querySelector('div#elementos').children);
    searchbar.addEventListener('ionInput', handleInput);
    function handleInput(event) {
      const query = event.target.value.toLowerCase();
      requestAnimationFrame(() => {
        items.forEach(item => {
          const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
          let newitem : HTMLElement;
          ;
          item.style.display = shouldShow ? 'block' : 'none';
        });
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
  
}
