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
  datos: any[];
  tam:number
  
  constructor(public nav: NavController,private activatedRoute: ActivatedRoute, public consulta: ConsultaService) {
    const num=this.activatedRoute.snapshot.paramMap.get('id_clase');
    this.id=parseInt(num, 10);
    consulta.obtenerClase("0911111111",num).subscribe((data)=>{
      var anydata=<any>data;
      this.datos = anydata;
      this.titulo =data[0]["id_clase"]["id_curso"]["titulo_curso"];
      this.promedio = this.calcularPromedio(this.datos);
    });
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
    //this.nav.navigateForward(`calificaciones`);
    console.log(this.id);
    if(ev.detail.value == "Tareas")
      this.nav.navigateRoot(`tareas/${this.id}`);
    else if(ev.detail.value == "Asistencias")
      this.nav.navigateRoot(`asistencias`);

    //console.log('Segment changed', ev.detail.value);
  }
  
}
