/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { ConsultaService } from 'src/app/servicio/consulta.service';
import { Component } from '@angular/core';
import { AlertController, NavController, MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { error } from 'protractor';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    id_promocion : any;
    cod_descuento : any;
    porc_descuento : any;
    descripcion : any;
    fecha_vencimiento : any;
    imagen :any;
    datos: any[];

    constructor(public alertController: AlertController, public nav: NavController, private activatedRoute: ActivatedRoute, public consulta: ConsultaService, private menu: MenuController) {

        this.consulta.obtenerPromociones().subscribe(data=>{
            var anydata=<any>data;
            this.datos = anydata;

        }
        ,error=>{
            console.log("No se pudo consultar las promociones");

        });
    }

}
