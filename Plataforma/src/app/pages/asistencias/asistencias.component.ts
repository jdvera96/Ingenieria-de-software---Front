import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.scss']
})
export class AsistenciasComponent implements OnInit {

  objectEstudiantes=[{num: 1,nombre: 'Juan Vera',fecha: '20/06/2020',estado: 'No calificado',calificacion: 0},
                    {num: 2,nombre: 'Andres Iparreño',fecha: '22/06/2020',estado: 'calificado',calificacion: 90},
                    {num: 3,nombre: 'Diego Muñoz',fecha: '31/06/2020',estado: 'calificado',calificacion: 100}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
