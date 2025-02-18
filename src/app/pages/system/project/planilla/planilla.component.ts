import { HelperStore } from '@/app/stores/HelpersStore';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-planilla',
  standalone: true,
  imports: [
    DialogModule,
    TableModule,
    CommonModule,
    InputTextModule,
    BreadcrumbModule,
    ButtonModule,
    MenuModule,
    IconFieldModule,
    InputIconModule,
    CardModule
  ],
  templateUrl: './planilla.component.html',
  styleUrl: './planilla.component.css'
})
export class PlanillaComponent {
items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  helperStore = inject(HelperStore)
  jobtitleStore = inject(PlanillaStore)
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
      console.log("ELIMINAR",entity);

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
