import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ActividadesComponent} from "./actividades.component";
import {MaterialesComponent} from "./materiales/materiales.component";
import { ProgramasComponent } from "./programas/programas.component";
import { TalleresComponent } from "./talleres/talleres.component";

const routes: Routes = [
  {
    path: '',
    component: ActividadesComponent,
    children: [
      {
        path: 'materiales',
        component: MaterialesComponent
      },
      {
        path: 'programas',
        component: ProgramasComponent
      },
      {
        path: 'talleres',
        component: TalleresComponent
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
