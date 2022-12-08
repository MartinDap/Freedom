import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {MaterialesService} from "../../../../providers/services/materiales.service";
import {TallerService} from "../../../../providers/services/taller.service";

@Component({
  selector: 'app-form-modal-materiales',
  templateUrl: './form-modal-materiales.component.html',
  styleUrls: ['./form-modal-materiales.component.css']
})
export class FormModalMaterialesComponent implements OnInit {

  @Input() title: any;
  @Input() mateId: any;
  @Input() item: any;
  talleres: any = [];
  frmMaterial: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private materialesService: MaterialesService,
              private tallerService: TallerService){}

  ngOnInit(): void {
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
  formInit(): void {
    const controls = {
      mateName: ['', [Validators.required]],
      mateDescri: ['', [Validators.required]],
      tallId: ['', [Validators.required]],
    };
    this.frmMaterial = this.formBuilder.group(controls);
  }

  save(): void {
    let data = Object.assign(this.frmMaterial.value,
      {taller: {tallId: this.frmMaterial.value.tallId}});
    this.materialesService.add$(data).subscribe(response => {
      if (response.success){
        this.activeModal.close({
          success:true,
          message: response.message
        });
      }
    });
  }

  update(): void {
    let data = Object.assign(this.frmMaterial.value,
      {taller: {tallId: this.frmMaterial.value.tallId}});
    console.log(data);
    this.tallerService.update$(this.mateId, data).subscribe(response => {
      if (response.success){
        this.activeModal.close({
          success:true,
          message: response.message});
      }
    });
  }


  updateData(): void {
    let data = Object.assign(this.item,
      {tallId: this.item.taller.tallId});
    console.log("",data)
    this.frmMaterial.patchValue(data);
  }

}

