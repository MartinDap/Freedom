import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TallerService} from "../../../../providers/services/taller.service";

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
  frmTaller: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private tallerService: TallerService) {}

  ngOnInit(): void {
    this.getTalleres();
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

  formInit(): void {
    const controls = {
      tallTema: ['', [Validators.required]],
      tallFechaInicio: ['', [Validators.required]],
      tallFechaFin: ['', [Validators.required]],
      tallHora: ['', [Validators.required]],
      tallLugar: ['', [Validators.required]],
      tallDesc: ['', [Validators.required]],
      tallDireccion: ['', [Validators.required]],
    };
    this.frmTaller = this.formBuilder.group(controls);
  }

  save(): void {
    this.tallerService.add$(this.frmTaller.value).subscribe(response => {
      if (response.success){
        this.activeModal.close({success:true, message: response.message});
      }
    });
  }

  update(): void {
    this.tallerService.update$(this.tallId, this.frmTaller.value).subscribe(response => {
      if (response.success){
        this.activeModal.close({success:true, message: response.message});
      }
    });
  }

  updateData(): void {
    this.frmTaller.patchValue(this.item);
  }

}
