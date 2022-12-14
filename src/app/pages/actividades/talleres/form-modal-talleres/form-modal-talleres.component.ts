import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TallerService} from "../../../../providers/services/taller.service";
import {ProgramaService} from "../../../../providers/services/programa.service";

@Component({
  selector: 'app-form-modal-talleres',
  templateUrl: './form-modal-talleres.component.html',
  styleUrls: ['./form-modal-talleres.component.css']
})
export class FormModalTalleresComponent implements OnInit {

  @Input() title: any;
  @Input() tallId: any;
  @Input() item: any;
  talleres: any = [];
  programas: any = [];
  frmTaller: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private programaService: ProgramaService,
              private tallerService: TallerService) {}

  ngOnInit(): void {
    this.getTalleres();
    this.getProgramas();
    this.formInit();
    if(this.item){
      this.updateData();
    }
  }

  getTalleres(): void {
    this.tallerService.getAll$().subscribe(response => {
      this.talleres = response.data || [];
      console.log(this.talleres);
    });
  }
  getProgramas(): void {
    this.programaService.getAll$().subscribe(response => {
      this.programas = response.data || [];
      console.log(this.programas);
    });
  }

  formInit(): void {
    const controls = {
      tallTema: ['', [Validators.required]],
      tallFechaInicio: ['', [Validators.required]],
      tallFechaFin: ['', [Validators.required]],
      tallHora: ['', [Validators.required]],
      tallLugar: ['', [Validators.required]],
      tallDesc: ['', [Validators.required]],
      progId: ['', [Validators.required]],
      tallDireccion: ['', [Validators.required]],
    };
    this.frmTaller = this.formBuilder.group(controls);
  }

  save(): void {
    let data = Object.assign(this.frmTaller.value,
      {programa: {progId: this.frmTaller.value.progId}});

    this.tallerService.add$(data).subscribe(response => {
      if (response.success){
        this.activeModal.close({
          success:true,
          message: response.message
        });
      }
    });
  }

  update(): void {
    let data = Object.assign(this.frmTaller.value,
      {programa: {progId: this.frmTaller.value.progId}});
    console.log(data);
    this.tallerService.update$(this.tallId, data).subscribe(response => {
      if (response.success){
        this.activeModal.close({
          success:true,
          message: response.message});
      }
    });
  }

  updateData(): void {
    let data = Object.assign(this.item,
      {progId: this.item.programa.progId});
    console.log("AAAAAAA ",data)
    this.frmTaller.patchValue(data);
  }

}

