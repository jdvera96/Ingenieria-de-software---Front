import { Component } from '@angular/core';
import { ConsultaService } from '../servicio/consulta.service';
//agregar el controlador de navegacion 
import { NavController } from '@ionic/angular';
@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

    datosa: any[];
    constructor(public consultar: ConsultaService, public nav: NavController) {
    }


    ionViewWillEnter() {
        this.consultar.obtenerMisClases(localStorage.getItem("id")).subscribe((data) => {
            var anydata = <any>data;
            this.datosa = anydata;
        });
    }

    openMyCourse(id_clase: string) {
        this.nav.navigateForward(`tareas/${id_clase}`);
        //this.nav.navigateForward(`calificaciones/${id_clase}`);
    }
    openNavDetailsPage(id: string) {
        this.nav.navigateForward(`detalles/${id}`);
    }
}
