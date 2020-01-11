import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//importamos el servicio 
import {ConsultaService} from '../../servicio/consulta.service';
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
    data;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(private activatedRoute: ActivatedRoute, public consulta: ConsultaService){ 

    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ngOnInit() {
        const num=this.activatedRoute.snapshot.paramMap.get('id');
        this.id=parseInt(num, 10);

        this.data=this.consulta.obtenerCursobyId(this.id);

        this.titulo=this.data['titulo'];
        this.short=this.data['short'];
        this.descripcion=this.data['descripcion'];
        this.imagen=this.data['imagen'];
        this.sesiones=this.data['num_sesiones'];
        this.precio=this.data['precio'];
    }

}
