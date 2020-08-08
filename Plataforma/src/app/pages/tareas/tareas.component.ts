import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'ngx-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {

  objectTareas=[{num: 1,titulo: 'Codigo html',fecha: '20/06/2020',calificacion: 100},
                {num: 2,titulo: 'Investigacion Bootstrap',fecha: '21/06/2020',calificacion: 80},
                {num: 3,titulo: 'Reporte de rendimiento PHP',fecha: '30/06/2020',calificacion: 100}]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  nuevaTarea(){
    this.router.navigate(['/pages/nuevaTarea']);
  }


}
