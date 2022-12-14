import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import { TipopersonaService } from 'src/app/providers/services/tipopersona.service';
import {PersonaService} from "../../../../providers/services/persona.service";


@Component({
  selector: 'app-form-modal-personas',
  templateUrl: './form-modal-personas.component.html',
  styleUrls: ['./form-modal-personas.component.css']
})
export class FormModalPersonasComponent implements OnInit {

  @Input() title: any;
  @Input() persId: any;
  @Input() item: any;
  tipoPersonas: any = [];

  frmPersona: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private personaService: PersonaService,
              private tipopersonaService: TipopersonaService) {}

  ngOnInit(): void {
    this.getTipoPersonas();
    this.formInit();
    if(this.item){
      this.updateData();
    }
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
      persDni: ['', [Validators.required]],
      persCelular: ['', [Validators.required]],
      persCorreo: ['', [Validators.required]],
      tipeId: ['', [Validators.required]]
    };
    this.frmPersona = this.formBuilder.group(controls);
  }

  save(): void {
    let data = Object.assign(this.frmPersona.value,
      {tipoPersona: {tipeId: this.frmPersona.value.tipeId}});
    this.personaService.add$(data).subscribe(response => {
      if (response.success){
        this.activeModal.close({
          success:true,
          message: response.message
        });
      }
    });
  }

  update(): void {
    let data = Object.assign(this.frmPersona.value,
      {tipoPersona: {tipeId: this.frmPersona.value.tipeId}});
    console.log(data);
    this.personaService.update$(this.persId, data).subscribe(response => {
      if (response.success){
        this.activeModal.close({
          success:true,
          message: response.message});
      }
    });
  }

  updateData(): void {
    let data = Object.assign(this.item,
      {tipeId: this.item.tipoPersona.tipeId});
    console.log("AAAAAAA ",data)
    this.frmPersona.patchValue(data);
  }

}

