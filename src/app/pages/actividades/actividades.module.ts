import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TalleresComponent } from './talleres/talleres.component';
import { ProgramasComponent } from './programas/programas.component';
import { MaterialesComponent } from './materiales/materiales.component';
import { ActividadesComponent } from './actividades.component';
import {ActividadesRoutingModule} from "./actividades-routing.module";
import {ProgramaService} from "../../providers/services/programa.service";
import { FormModalComponent } from './programas/form-modal/form-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import {PersonasComponent} from "./personas/personas.component";
import {PersonaService} from "../../providers/services/persona.service";
import {TallerService} from "../../providers/services/taller.service"
import {MaterialService} from "../../providers/services/materiales.service";






@NgModule({
  declarations: [
    TalleresComponent,
    ProgramasComponent,
    MaterialesComponent,
    ActividadesComponent,
    FormModalComponent,
    PersonasComponent
  ],
  imports: [
    CommonModule,
    ActividadesRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    ProgramaService,
    TallerService,
    PersonaService,
    MaterialService
  ]
})
export class ActividadesModule { }
