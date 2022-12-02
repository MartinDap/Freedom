import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {MaterialesService} from "../../../../providers/services/materiales.service";

@Component({
  selector: 'app-form-modal-materiales',
  templateUrl: './form-modal-materiales.component.html',
  styleUrls: ['./form-modal-materiales.component.css']
})
export class FormModalMaterialesComponent implements OnInit {

  @Input() title: any;
  @Input() mateId: any;
  @Input() item: any;
  frmMaterial: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private materialesService: MaterialesService) { }

  ngOnInit(): void {
    this.formInit();
    if (this.item) {
      this.updateData();
    }
  }

  formInit(): void {
    const controls = {
      mateDescri: ['', [Validators.required]],
      mateName: ['', [Validators.required]],
    };
    this.frmMaterial = this.formBuilder.group(controls);
  }

  save(): void {
    this.materialesService.add$(this.frmMaterial.value).subscribe(response => {
      if (response.success) {
        this.activeModal.close({success: true, message:response.message});
      }
    });
  }

  update(): void {
    this.materialesService.update$(this.mateId, this.frmMaterial.value).subscribe(response => {
      if (response.success) {
        this.activeModal.close({success: true, message:response.message});
      }
    });
  }

  updateData(): void {
    this.frmMaterial.patchValue(this.item);
  }
}
