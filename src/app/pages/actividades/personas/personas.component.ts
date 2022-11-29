import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormModalComponent} from "../programas/form-modal/form-modal.component";
import Swal from "sweetalert2";
import {PersonaService} from "../../../providers/services/persona.service";

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  personas: any = [];
  constructor(private personaService: PersonaService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getPersonas();
  }

  getPersonas(): void {
    this.personaService.getAll$().subscribe(response => {
      this.personas = response.data || [];
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
          title: 'Personas',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        })
        this.getPersonas();
      }
    });
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormModalComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.persId = item.persId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Personas',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        });
        this.getPersonas();
      }
    });
  }
  public onDelete(item: any): void {
    const ID = item.persId;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.persNombre;
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
          this.personaService.delete$(ID).subscribe(data => {
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
              this.getPersonas();
            }
          });
        }
      });
    }
  }
}
