import { DtoResponseJobProfile } from '@/app/domain/dtos/job-profile/DtoResponseJobProfile';
import { JobProfileService } from '@/app/services/job-profile.service';
import { HelperStore } from '@/app/stores/HelpersStore';
import { JobProfileStore } from '@/app/stores/JobProfileStore';

import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { JobProfileCreateComponent } from './create/job-profile-create.component';
import { JobProfileEditComponent } from './edit/job-profile-edit.component';

@Component({
  selector: 'app-job-profile',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    InputTextModule,
    BreadcrumbModule,
    ButtonModule,
    MenuModule,
    IconFieldModule,
    InputIconModule,
    CardModule,
    JobProfileCreateComponent,
    JobProfileEditComponent,
  ],
  templateUrl: './job-profile.component.html',
  styleUrl: './job-profile.component.css'
})
export class JobProfileComponent {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  helperStore = inject(HelperStore)
  jobProfileStore = inject(JobProfileStore)
  jobProfileService = inject(JobProfileService)
  confirmationService = inject(ConfirmationService)

  selectedRow  = signal<DtoResponseJobProfile|null>(null)
  options = signal([
    {
        label: 'Opciones',
        items: [
            {
                label: 'Editar',
                icon: 'pi pi-pen-to-square',
                command: () => {
                  this.onEdit(this.selectedRow());
                }
            },
            {
                label: 'Eliminar',
                icon: 'pi pi-trash',
                command: () => {
                  this.onDelete(this.selectedRow());
                }
            }]
    }
  ])

  constructor(){
    this.jobProfileStore.doList()
    this.items = [{ label: 'Inicio', route: '/system/dashboard' }, { label: 'Perfiles' }];

  }

  onOpenModalCreateJobTitleService(){
    this.jobProfileStore.openModalCreate()
  }

  onEdit(entity : DtoResponseJobProfile|null){
    if(entity){
      this.jobProfileStore.openModalEdit(entity)
    }else{
      console.warn("VEHICULO para editar no esta seleccionado")
    }
  }
  onDelete(entity : DtoResponseJobProfile|null){
    if(entity){
      this.confirmationService.confirm({
        message: '¿Estás seguro de que quieres continuar?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Si',
        rejectLabel: 'No',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
            this.jobProfileService.delete(entity.id).subscribe({
              next: (response) => {
                this.jobProfileStore.doList()
                this.helperStore.showToast({severity: 'success', summary: 'Eliminado', detail: response.message })
              },
              error: (error) => {
                console.error(error)
                this.helperStore.showToast({severity: 'error', summary: 'Error', detail: 'No se pudo eliminar' })
              }
            })
        },
        reject: () => {
          this.helperStore.showToast({severity: 'warn', summary: 'Cancelado', detail: 'Ha cancelado la eliminación' })
        }
      })

    }else{
      console.warn("El cargo para eliminar no esta seleccionado")
    }
  }

  onOpenMenuOptionsRowTable(event : MouseEvent, menu : any, row : any){
    this.selectedRow.update(() => row)
    menu.toggle(event)

  }
}
