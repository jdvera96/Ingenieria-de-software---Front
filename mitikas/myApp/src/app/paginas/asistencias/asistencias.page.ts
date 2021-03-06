import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {ConsultaService} from '../../servicio/consulta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {

  id:number;
  datos: any[];
  constructor(public nav: NavController,private activatedRoute: ActivatedRoute,public consulta: ConsultaService) {
    const num=this.activatedRoute.snapshot.paramMap.get('id_clase');
    this.id=parseInt(num, 10);
    consulta.obtenerClase("0911111111",num).subscribe((data)=>{
      var anydata=<any>data;
      this.datos = anydata;
    });
   }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    if(ev.detail.value == "Tareas")
      this.nav.navigateRoot(`tareas/${this.id}`);
    else if(ev.detail.value == "Calificaciones")
      this.nav.navigateRoot(`calificaciones/${this.id}`);
  }

}
