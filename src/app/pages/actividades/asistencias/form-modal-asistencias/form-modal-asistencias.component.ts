import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TallerService} from "../../../../providers/services/taller.service";
import {TipopersonaService} from "../../../../providers/services/tipopersona.service";
import {AsistenciaService} from "../../../../providers/services/asistencia.service";

@Component({
  selector: 'app-form-modal-asistencias',
  templateUrl: './form-modal-asistencias.component.html',
  styleUrls: ['./form-modal-asistencias.component.css']
})
export class FormModalAsistenciasComponent implements OnInit {

  @Input() title: any;
  @Input() persId: any;
  @Input() item: any;
  tipoPersonas: any = [];
  talleres: any = [];

  frmAsistencia: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private asistenciaService: AsistenciaService,
              private tallerService: TallerService,
              private tipopersonaService: TipopersonaService) {}

  ngOnInit(): void {
    this.getTipoPersonas();
    this.getTaller();
    this.formInit();
    if(this.item){
      this.updateData();
    }
  }

  getTaller(): void {
    this.tallerService.getAll$().subscribe(response => {
      this.talleres = response.data || [];
      console.log(this.talleres);
    });
  }

  getTipoPersonas(): void {
    this.tipopersonaService.getAll$().subscribe(response => {
      this.tipoPersonas = response.data || [];
      console.log(this.tipoPersonas);
    });
  }

  formInit(): void {
    const controls = {
      persNombre: ['', [Validators.required]],
      persApPaterno: ['', [Validators.required]],
      persApMaterno: ['', [Validators.required]],
      tallId: ['', [Validators.required]],
      tipeId: ['', [Validators.required]]
    };
    this.frmAsistencia = this.formBuilder.group(controls);
  }

  save(): void {
    let data = Object.assign(this.frmAsistencia.value,
      {taller: {tallId: this.frmAsistencia.value.tallId}},
      {tipoPersona: {tipeId: this.frmAsistencia.value.tipeId}});
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
      {taller: {tallId: this.frmAsistencia.value.tallId}},
      {tipoPersona: {tipeId: this.frmAsistencia.value.tipeId}});
    console.log(data);
    this.asistenciaService.update$(this.persId, data).subscribe(response => {
      if (response.success){
        this.activeModal.close({
          success:true,
          message: response.message});
      }
    });
  }

  updateData(): void {
    let data = Object.assign(this.item,
      {tallId: this.item.taller.tallId},
      {tipeId: this.item.tipoPersona.tipeId});
    console.log("AAAAAAA ",data)
    this.frmAsistencia.patchValue(data);
  }

}
