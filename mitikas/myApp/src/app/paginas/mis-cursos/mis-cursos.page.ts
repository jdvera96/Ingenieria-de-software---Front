import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.page.html',
  styleUrls: ['./mis-cursos.page.scss'],
})
export class MisCursosPage implements OnInit {

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    //this.nav.navigateForward(`calificaciones`);
    console.log('Segment changed', ev);
    //if(ev.detail.value == "Calificaciones")
      //this.nav.navigateForward(`calificaciones`);
    //console.log('Segment changed', ev.detail.value);
  }

}
