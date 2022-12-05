import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TipopersonaService} from "../../../../providers/services/tipopersona.service";


@Component({
  selector: 'app-form-modal-tipopersonas',
  templateUrl: './form-modal-tipopersonas.component.html',
  styleUrls: ['./form-modal-tipopersonas.component.css']
})
export class FormModalTipopersonasComponent implements OnInit {

  @Input() title: any;
  @Input() tipeId: any;
  @Input() item: any;
  frmTipopersona: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private tipopersonaService: TipopersonaService) { }

  ngOnInit(): void {
    this.formInit();
    if (this.item) {
      this.updateData();
    }
  }

  formInit(): void {
    const controls = {
      tipePersona: ['', [Validators.required]],
    };
    this.frmTipopersona = this.formBuilder.group(controls);
  }

  save(): void {
    this.tipopersonaService.add$(this.frmTipopersona.value).subscribe(response => {
      if (response.success) {
        this.activeModal.close({success: true, message:response.message});
      }
    });
  }

  update(): void {
    this.tipopersonaService.update$(this.tipeId, this.frmTipopersona.value).subscribe(response => {
      if (response.success) {
        this.activeModal.close({success: true, message:response.message});
      }
    });
  }

  updateData(): void {
    this.frmTipopersona.patchValue(this.item);
  }
}
