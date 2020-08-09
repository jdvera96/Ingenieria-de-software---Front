import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ngx-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {
  
  id: string= '';
  constructor(private router: Router, private activador: ActivatedRoute) {}



  ngOnInit(): void {
    this.id=this.activador.snapshot.paramMap.get('id');


  }

  goToTareas(){
    this.router.navigate([`/pages/${this.id}/tareas`]);
  }

  goToCalificaciones(){
    this.router.navigate([`/pages/${this.id}/calificaciones`]);
  }

  gotToAsistencias(){
    this.router.navigate([`/pages/${this.id}/asistencias`]);
  }



  /* ActualizarMenu(): void{
      if(MENU_ITEMS.length==3)
      //agregando opciones al menu cuando esta en un curso
      MENU_ITEMS.push({
        title: 'Tareas',
        icon: 'home-outline',
        link: '/pages/tareas',
      },{
        title: 'Calificaciones',
        icon: 'home-outline',
        link: '/pages/calificaciones',
      },{
        title: 'Asistencias',
        icon: 'home-outline',
        link: '/pages/asistencias',
      })
  } */

}
