import { NgModule } from '@angular/core';
import {
    PreloadAllModules, RouterModule, Routes 
} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    { path: 'detalles/:id', loadChildren: './paginas/detalles/detalles.module#DetallesPageModule' },
    
    {
      path: 'calificaciones/:id_clase',
      loadChildren: () => import('./paginas/calificaciones/calificaciones.module').then( m => m.CalificacionesPageModule)
    },
  {
    path: 'mis-cursos',
    loadChildren: () => import('./paginas/mis-cursos/mis-cursos.module').then( m => m.MisCursosPageModule)
  },
  {
    path: 'tareas',
    loadChildren: () => import('./paginas/tareas/tareas.module').then( m => m.TareasPageModule)
  },
  {
    path: 'asistencias',
    loadChildren: () => import('./paginas/asistencias/asistencias.module').then( m => m.AsistenciasPageModule)
  }


];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
