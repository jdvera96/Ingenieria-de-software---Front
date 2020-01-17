import { Component } from '@angular/core';
import { ConsultaService} from '../servicio/consulta.service';
//agregar el controlador de navegacion 
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  
  datos;
  constructor(public consultar: ConsultaService,public nav: NavController) {
      this.datos=this.consultar.obtenerCursos();
  }

  openMyCourse(id: string){
    this.nav.navigateForward(`mis-cursos`);
  }
}
