import { JobTitleEntity } from '@/app/domain/entities/JobTitleEntity';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { JobTitleService } from '@/app/services/job-title.service';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { JobTitleCreateComponent } from './create/job-title-create.component';
import { JobTitleEditComponent } from './edit/job-title-edit.component';
import { DtoResponseJobTitle } from '@/app/domain/dtos/job-title/DtoResponseJobTitle';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CardModule } from 'primeng/card';
import { HelperStore } from '@/app/stores/HelpersStore';
import { JobTitleStore } from '@/app/stores/JobTitleStore';

@Component({
  selector: 'app-job-title',
  standalone: true,
  imports: [
    TableModule, CommonModule, InputTextModule, BreadcrumbModule,ButtonModule, MenuModule,JobTitleCreateComponent,JobTitleEditComponent,
    IconFieldModule, InputIconModule,CardModule
  ],
  templateUrl: './job-title.component.html',
  styleUrl: './job-title.component.css',
  providers : [
    MessageService
  ]
})
export class JobTitleComponent {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  helperStore = inject(HelperStore)
  jobtitleStore = inject(JobTitleStore)
  jobtitleService = inject(JobTitleService)
  confirmationService = inject(ConfirmationService)

  selectedRow  = signal<DtoResponseJobTitle|null>(null)
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
    this.jobtitleStore.doList()
    this.items = [{ label: 'Inicio', route: '/system/dashboard' }, { label: 'Cargos' }];

  }

  onOpenModalCreateJobTitleService(){
    this.jobtitleStore.openModalCreate()
  }

  onEdit(jobtitle : DtoResponseJobTitle|null){
    console.log(jobtitle)
    if(jobtitle){
      this.jobtitleStore.openModalEdit(jobtitle)
    }else{
      console.warn("VEHICULO para editar no esta seleccionado")
    }
  }
  onDelete(entity : JobTitleEntity|null){
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
            this.jobtitleService.delete(entity.id).subscribe({
              next: (response) => {
                this.jobtitleStore.doList()
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
