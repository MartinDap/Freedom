import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ActividadesComponent} from "./actividades.component";
import {MaterialesComponent} from "./materiales/materiales.component";
import {ProgramasComponent } from "./programas/programas.component";
import {PersonasComponent } from "./personas/personas.component";
import {TalleresComponent} from "./talleres/talleres.component";

const routes: Routes = [
  {
    path: '',
    component: ActividadesComponent,
    children: [
      {
        path: 'personas',
        component: PersonasComponent
      },
      {
        path: 'programas',
        component: ProgramasComponent
      },
      {
        path: 'talleres',
        component: TalleresComponent
      },
      {
        path: 'materiales',
        component: MaterialesComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActividadesRoutingModule {
}
