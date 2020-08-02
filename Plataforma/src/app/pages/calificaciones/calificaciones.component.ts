import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.scss']
})
export class CalificacionesComponent implements OnInit {

  
  objectEstudiantes=[{num: 1,nombre: 'Juan Vera',fecha: '20/06/2020',estado: 'No calificado',calificacion: 0},
                    {num: 2,nombre: 'Andres Iparreño',fecha: '22/06/2020',estado: 'calificado',calificacion: 90},
                    {num: 3,nombre: 'Diego Muñoz',fecha: '31/06/2020',estado: 'calificado',calificacion: 100}
  ]
  constructor(private router: Router) { }

  ngOnInit(): void { 
  }

  gotoCalificar(): void{
    console.log('hola')
    this.router.navigate(['/pages/calificar-tarea']);

  }

}
