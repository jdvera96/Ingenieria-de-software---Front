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
      path: 'calificaciones',
      loadChildren: () => import('./paginas/calificaciones/calificaciones.module').then( m => m.CalificacionesPageModule)
    }

];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
