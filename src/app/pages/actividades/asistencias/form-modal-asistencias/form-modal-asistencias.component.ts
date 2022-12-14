import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TallerService} from "../../../../providers/services/taller.service";
import {AsistenciaService} from "../../../../providers/services/asistencia.service";
import {PersonaService} from "../../../../providers/services/persona.service";

@Component({
  selector: 'app-form-modal-asistencias',
  templateUrl: './form-modal-asistencias.component.html',
  styleUrls: ['./form-modal-asistencias.component.css']
})
export class FormModalAsistenciasComponent implements OnInit {

  @Input() title: any;
  @Input() asisId: any;
  @Input() item: any;
  personas: any = [];
  talleres: any = [];

  frmAsistencia: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private asistenciaService: AsistenciaService,
              private personaService: PersonaService,
              private tallerService: TallerService){}

  ngOnInit(): void {
    this.gePersonas();
    this.getTaller();
    this.formInit();
    if(this.item){
      this.updateData();
    }
  }

  gePersonas(): void {
    this.personaService.getAll$().subscribe(response => {
      this.personas = response.data || [];
      console.log(this.personaService);
    });
  }

  getTaller(): void {
    this.tallerService.getAll$().subscribe(response => {
      this.talleres = response.data || [];
      console.log(this.talleres);
    });
  }

  formInit(): void {
    const controls = {
      asisEsta: ['', [Validators.required]],
      persId: ['', [Validators.required]],
      tallId: ['', [Validators.required]],
    };
    this.frmAsistencia = this.formBuilder.group(controls);
  }

  save(): void {
    let data = Object.assign(this.frmAsistencia.value,
      {persona: {persId: this.frmAsistencia.value.persId}},
      {taller: {tallId: this.frmAsistencia.value.tallId}});
    this.asistenciaService.add$(data).subscribe(response => {
      if (response.success){
        this.activeModal.close({
          success:true,
          message: response.message
        });
      }
    });
  }

  update(): void {
    let data = Object.assign(this.frmAsistencia.value,
      {persona: {persId: this.frmAsistencia.value.persId}},
      {taller: {tallId: this.frmAsistencia.value.tallId}});
    console.log(data);
    this.asistenciaService.update$(this.asisId, data).subscribe(response => {
      if (response.success){
        this.activeModal.close({
          success:true,
          message: response.message});
      }
    });
  }

  updateData(): void {
    let data = Object.assign(this.item,
      {persId: this.item.persona.persId},
      {tallId: this.item.taller.tallId});
    console.log("AAAAAAA ",data)
    this.frmAsistencia.patchValue(data);
  }

}
