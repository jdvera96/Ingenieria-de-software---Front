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
  
  datosa: any[];
  constructor(public consultar: ConsultaService,public nav: NavController) {
    this.consultar.obtenerMisCursos("0911111111").subscribe((data)=>{
      var anydata=<any>data;
      this.datosa=anydata;
    });    
  }

  openMyCourse(id_clase: string){
    this.nav.navigateForward(`tareas`);
    //this.nav.navigateForward(`calificaciones/${id_clase}`);
  }
  openNavDetailsPage(id: string) { 
    this.nav.navigateForward(`detalles/${id}`);
  }
}
