import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { InicioComponent } from './inicio/inicio.component';
import { GuardService } from '../_service/guard.service';
import { Not403Component } from './not403/not403.component';
import { IngresoComponent } from './ingreso/ingreso.component';
import { EgresoComponent } from './egreso/egreso.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { MetodopagoComponent } from './metodopago/metodopago.component';
import { ReporteComponent } from './reporte/reporte.component';
import { CategoriaEdicionComponent } from './categoria/categoria-edicion/categoria-edicion.component';

export const routes: Routes = [

    { path: 'inicio', component: InicioComponent, canActivate: [GuardService] },
    { path: 'ingreso', component: IngresoComponent, canActivate: [GuardService] },
    { path: 'egreso', component: EgresoComponent, canActivate: [GuardService] },

    {
        path: 'categoria', component: CategoriaComponent, children: [
          {path: 'nuevo', component: CategoriaEdicionComponent },
          {path: 'edicion/:id', component: CategoriaEdicionComponent }
        ], canActivate: [GuardService]
    },
    { path: 'metodopago', component: MetodopagoComponent, canActivate: [GuardService] },
    { path: 'reporte', component: ReporteComponent, canActivate: [GuardService] },
    { path: 'not-403', component: Not403Component },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}