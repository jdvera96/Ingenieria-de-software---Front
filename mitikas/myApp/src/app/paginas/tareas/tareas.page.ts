import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ConsultaService } from 'src/app/servicio/consulta.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-tareas',
    templateUrl: './tareas.page.html',
    styleUrls: ['./tareas.page.scss']
})
export class TareasPage implements OnInit {

  id: number;
  datos: any[];
  titulo: String;
  env = environment;

  constructor(public nav: NavController,private activatedRoute: ActivatedRoute,public consulta: ConsultaService) {

    var num = '1';
    if(this.env.production){
      const number=this.activatedRoute.snapshot.paramMap.get('id_clase');
      num = number;
    }
    this.id=parseInt(num, 10);
    consulta.obtenerClase(/*localStorage.getItem("id")*/"1721072559",/*num*/"9").subscribe((data)=>{
        const anydata=<any>data;
        this.datos = anydata;
        this.titulo =data[0]["id_tarea"]["id_sesion"]["id_clase"]["titulo"];
    });
  }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
      if(ev.detail.value == 'Calificaciones') {
          this.nav.navigateRoot(`calificaciones/${this.id}`);
      } else if(ev.detail.value == 'Asistencias') {
          this.nav.navigateRoot(`asistencias/${this.id}`);
      }
  }

  scriptItem(){
    
  }

}
