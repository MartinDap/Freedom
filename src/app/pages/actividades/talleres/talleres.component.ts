import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TallerService} from "../../../providers/services/taller.service";
import {FormModalComponent} from "../programas/form-modal/form-modal.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.component.html',
  styleUrls: ['./talleres.component.css']
})
export class TalleresComponent implements OnInit {

  talleres: any = [];
  constructor(private tallerService: TallerService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getTalleres();
  }

  getTalleres(): void {
    this.tallerService.getAll$().subscribe(response => {
      this.talleres = response.data || [];
    });
  }

  openModal(): void {
    const modal = this.modalService.open(FormModalComponent, {
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
          title: 'Taller',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        })
        this.getTalleres();
      }
    });
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormModalComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.tallId = item.tallId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Taller',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        });
        this.getTalleres();
      }
    });
  }
  public onDelete(item: any): void {
    const ID = item.tallId;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.tallTema;
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
          this.tallerService.delete$(ID).subscribe(data => {
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
              this.getTalleres();
            }
          });
        }
      });
    }
  }
}
