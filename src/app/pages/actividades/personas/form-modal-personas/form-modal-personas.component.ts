import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
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
  personas: any = [];
  frmPersona: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private personaService: PersonaService) {}

  ngOnInit(): void {
    this.getPersonas();
    this.formInit();
    if(this.item){
      this.updateData();
    }
  }

  getPersonas(): void {
    this.personaService.getAll$().subscribe(response => {
      this.personas = response.data || [];
      console.log(this.personas);
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
    };
    this.frmPersona = this.formBuilder.group(controls);
  }

  save(): void {
    this.personaService.add$(this.frmPersona.value).subscribe(response => {
      if (response.success){
        this.activeModal.close({success:true, message: response.message});
      }
    });
  }

  update(): void {
    this.personaService.update$(this.persId, this.frmPersona.value).subscribe(response => {
      if (response.success){
        this.activeModal.close({success:true, message: response.message});
      }
    });
  }

  updateData(): void {
    this.frmPersona.patchValue(this.item);
  }

}

