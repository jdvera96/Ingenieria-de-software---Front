import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//importamos el servicio 
import {ConsultaService} from '../../servicio/consulta.service';
declare const pay: any;
@Component({
    selector: 'app-detalles',
    templateUrl: './detalles.page.html',
    styleUrls: ['./detalles.page.scss']
})
export class DetallesPage implements OnInit {

    id: number;
    titulo: string;
    short: string;
    descripcion: string;
    imagen: string;
    sesiones: number;
    precio: number;
    data: any[];

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(private activatedRoute: ActivatedRoute, public consulta: ConsultaService){ 
        const num=this.activatedRoute.snapshot.paramMap.get('id');
        this.id=parseInt(num, 10);
        this.consulta.obtenerCursobyId(this.id).subscribe((data)=>{
            var anydata=<any>data;
            this.data=anydata;
            console.log(this.data);
            this.precio=this.data['precio'];
            this.imagen=this.data['imagen'];
            this.descripcion=this.data['descripcion'];
            this.sesiones=this.data['num_sesiones'];
            this.short=this.descripcion;
            console.log(this.data['precio']);
          });
        }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ngOnInit() {   
    }
    ionViewWillEnter() {
        pay();
    }

}
