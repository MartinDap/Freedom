import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { TipopersonaService } from 'src/app/providers/services/tipopersona.service';
import Swal from "sweetalert2";
import {FormModalTipopersonasComponent} from "./form-modal-tipopersonas/form-modal-tipopersonas.component";

@Component({
  selector: 'app-tipopersonas',
  templateUrl: './tipopersonas.component.html',
  styleUrls: ['./tipopersonas.component.css']
})
export class TipopersonasComponent implements OnInit {

  tipopersonas: any = [];
  constructor(private tipopersonaService: TipopersonaService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getTipopersonas();
  }

  getTipopersonas(): void {
    this.tipopersonaService.getAll$().subscribe(response => {
      this.tipopersonas = response.data || [];
    });
  }

  openModal(): void {
    const modal = this.modalService.open(FormModalTipopersonasComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nuevo';
    modal.result.then(res => {
      if(res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Programa',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        })
        this.getTipopersonas();
      }
    });
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormModalTipopersonasComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.tipeId = item.tipeId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tipo Persona',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        });
        this.getTipopersonas();
      }
    });
  }
  public onDelete(item: any): void {
    const ID = item.tipeId;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.tipePersona;
    if (ID) {
      Swal.fire({
        title: 'Se eliminará el registro',
        text: `${mensaje}`,
        backdrop: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#7f264a',
        confirmButtonText: 'Estoy de acuerdo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.tipopersonaService.delete$(ID).subscribe(data => {
            if (data.success) {
              Swal.fire({
                title: 'Eliminado',
                text: data.message,
                icon: 'success',
                backdrop: true,
                showConfirmButton: false,
                confirmButtonColor: '#7f264a',
                timer: 1300,
              });
              this.getTipopersonas();
            }
          });
        }
      });
    }
  }
}
