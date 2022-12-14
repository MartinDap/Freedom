import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormModalAsistenciasComponent} from "./form-modal-asistencias/form-modal-asistencias.component";
import Swal from "sweetalert2";
import {AsistenciaService} from "../../../providers/services/asistencia.service";

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css']
})
export class AsistenciasComponent implements OnInit {

  asistencias: any = [];
  constructor(private asistenciaService: AsistenciaService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAsistencias();
  }

  getAsistencias(): void {
    this.asistenciaService.getAll$().subscribe(response => {
      this.asistencias = response.data || [];
    });
  }

  openModal(): void {
    const modal = this.modalService.open(FormModalAsistenciasComponent, {
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
          title: 'Asistencia',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        })
        this.getAsistencias();
      }
    });
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormModalAsistenciasComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.asisId = item.asisId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Asistencia',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        });
        this.getAsistencias();
      }
    });
  }
  public onDelete(item: any): void {
    const ID = item.asisId;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.asisId;
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
          this.asistenciaService.delete$(ID).subscribe(data => {
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
              this.getAsistencias();
            }
          });
        }
      });
    }
  }
}
