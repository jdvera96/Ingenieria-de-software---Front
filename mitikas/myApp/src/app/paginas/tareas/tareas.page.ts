import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    //this.nav.navigateForward(`calificaciones`);
    //console.log('Segment changed', ev);
    if(ev.detail.value == "Calificaciones")
      this.nav.navigateRoot(`calificaciones`);
    else if(ev.detail.value == "Asistencias")
      this.nav.navigateRoot(`asistencias`);

    //console.log('Segment changed', ev.detail.value);
  }

}
