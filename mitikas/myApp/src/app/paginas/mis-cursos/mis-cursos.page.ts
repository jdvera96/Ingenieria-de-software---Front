import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController,IonSegment } from '@ionic/angular';
@Component({
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.page.html',
  styleUrls: ['./mis-cursos.page.scss'],
})
export class MisCursosPage implements OnInit {

  //@ViewChild(IonSegment,true) segment: IonSegment;

  constructor(public nav: NavController) { }

  ngOnInit() {
    //this.segment.value="Tareas";
  }

  segmentChanged(ev: any) {
    //this.nav.navigateForward(`calificaciones`);
    console.log('Segment changed', ev);
    if(ev.detail.value == "Calificaciones")
      this.nav.navigateRoot(`calificaciones`);
    //console.log('Segment changed', ev.detail.value);
  }

}
