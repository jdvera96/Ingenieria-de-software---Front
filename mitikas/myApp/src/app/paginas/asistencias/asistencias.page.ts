import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    //this.nav.navigateForward(`calificaciones`);
    console.log('Segment changed', ev);
    if(ev.detail.value == "Tareas")
      this.nav.navigateForward(`tareas`);
    else if(ev.detail.value == "Calificaciones")
      this.nav.navigateForward(`calificaciones`);

    //console.log('Segment changed', ev.detail.value);
  }

}
