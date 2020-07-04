import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ConsultaService } from '../servicio/consulta.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  categorias = ['Todas', 'Desarrollo', 'Diseño', 'Marketing', 'Negocios', 'Finanzas'];

  datos: any[];
  constructor(public consultar: ConsultaService, public nav: NavController, private menu: MenuController) {
    this.menu.swipeEnable(false);
    this.consultar.obtenerCursos().subscribe((data) => {
      var anydata = <any>data;
      this.datos = anydata;
    });
  }

  openMenu() {
    this.menu.toggle();
    this.menu.enable(true, 'first');
    console.log("Prueba");
    console.log("HOLA MUNDO");
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  openNavDetailsPage(id: string) {
    this.nav.navigateForward(`detalles/${id}`);
  }
}
