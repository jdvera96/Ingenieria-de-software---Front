import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {ConsultaService} from '../../servicio/consulta.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {

  id:number;
  datos: any[];
  titulo: String;
  env = environment;

  constructor(public nav: NavController,private activatedRoute: ActivatedRoute,public consulta: ConsultaService) {

    this.obtenerAsistencias();
   }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    if(ev.detail.value == "Tareas")
      this.nav.navigateRoot(`tareas/${this.id}`);
    else if(ev.detail.value == "Calificaciones")
      this.nav.navigateRoot(`calificaciones/${this.id}`);
  }

  obtenerAsistencias(){
    var num = '1';
    if(this.env.production){
      const number=this.activatedRoute.snapshot.paramMap.get('id_clase');
      num = number;
    }
    this.id=parseInt(num, 10);
    this.consulta.obtenerAsistencias(localStorage.getItem("id"),num).subscribe((data)=>{
      var anydata=<any>data;
      this.datos = anydata;
      this.titulo =data[0]["id_sesion"]["id_clase"]["titulo"];
    });
  }

}
