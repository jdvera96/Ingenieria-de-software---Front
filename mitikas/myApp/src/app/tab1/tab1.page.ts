import { Component } from '@angular/core';
import { ConsultaService} from '../servicio/consulta.service';
//agregar el controlador de navegacion 
import { NavController } from '@ionic/angular';
@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  datos: any[];
  constructor(public consultar: ConsultaService,public nav: NavController) {
      this.consultar.obtenerCursos().subscribe((data)=>{
        var anydata=<any>data;
        this.datos=anydata;
      });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  openNavDetailsPage(id: string) { 
      this.nav.navigateForward(`detalles/${id}`);
  }

}
