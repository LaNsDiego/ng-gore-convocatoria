import { DtoResponseProject } from '@/app/domain/dtos/project/DtoResponseProject';
import { ProjectService } from '@/app/services/project.service';
import { HelperStore } from '@/app/stores/HelpersStore';
import { ProjectStore } from '@/app/stores/ProjectStore';
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
import { ProjectCreateComponent } from './create/project-create.component';

@Component({
  selector: 'app-project',
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
    ProjectCreateComponent,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  helperStore = inject(HelperStore)
  projectStore = inject(ProjectStore)
  projectService = inject(ProjectService)
  confirmationService = inject(ConfirmationService)

  selectedRow  = signal<DtoResponseProject|null>(null)
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
    this.projectStore.doList()
    this.items = [{ label: 'Inicio', route: '/system/dashboard' }, { label: 'Cargos' }];

  }

  onOpenModalCreateJobTitleService(){
    this.projectStore.openModalCreate()
  }

  onEdit(jobtitle : DtoResponseProject|null){
    console.log(jobtitle)
    if(jobtitle){
      this.projectStore.openModalEdit(jobtitle)
    }else{
      console.warn("VEHICULO para editar no esta seleccionado")
    }
  }
  onDelete(entity : DtoResponseProject|null){
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
            this.projectService.delete(entity.id).subscribe({
              next: (response) => {
                this.projectStore.doList()
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
