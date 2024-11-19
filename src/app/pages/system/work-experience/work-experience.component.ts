import { DtoResponseWorkExperience } from '@/app/domain/dtos/work-experience/DtoResponseWorkExperience';
import { WorkExperienceService } from '@/app/services/work-experience.service';
import { HelperStore } from '@/app/stores/HelpersStore';
import { WorkExperienceStore } from '@/app/stores/WorkExperienceStore';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
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
import { WorkExperienceCreateComponent } from './create/work-experience-create.component';

@Component({
  selector: 'app-work-experience',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    BreadcrumbModule,
    CardModule,
    ButtonModule,
    DialogModule,
    MenuModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    WorkExperienceCreateComponent
  ],
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.css'
})
export class WorkExperienceComponent {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  helperStore = inject(HelperStore)
  workExperienceStore = inject(WorkExperienceStore)
  workExperienceService = inject(WorkExperienceService)
  confirmationService = inject(ConfirmationService)

  selectedRow  = signal<DtoResponseWorkExperience|null>(null)
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
    this.loadTableEmployees()
    this.items = [{ label: 'Inicio', route: '/system/dashboard' }, { label: 'Experiencia laboral' }];
  }
  onSuccessCreate(){
    console.log("onSuccessCreate");
    this.loadTableEmployees()
  }

  loadTableEmployees(){
    this.workExperienceStore.doList()
  }

  onOpenModalCreateEmployee(){
    this.workExperienceStore.openModalCreate()
  }

  onEdit(entity : DtoResponseWorkExperience|null){
    if(entity){
      this.workExperienceStore.openModalEdit(entity)
    }else{
      console.warn("No se ha seleccionado un registro",entity);

    }
  }

  onDelete(entity : DtoResponseWorkExperience|null){
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
            // this.workExperienceService.delete(entity.id).subscribe({
            //   next: (response) => {
            //     this.workExperienceStore.doList()
            //     this.helperStore.showToast({severity: 'success', summary: 'Eliminado', detail: response.message })
            //   },
            //   error: (error) => {
            //     console.error(error)
            //     this.helperStore.showToast({severity: 'error', summary: 'Error', detail: 'No se pudo eliminar' })
            //   }
            // })
        },
        reject: () => {
          this.helperStore.showToast({severity: 'warn', summary: 'Cancelado', detail: 'Ha cancelado la eliminación' })
        }
      })

    }else{
      console.warn("El personal para eliminar no esta seleccionado")
    }
  }

  // onClickEmployeeControl(entity : EmployeeEntity|null){
  //   if(entity){
  //     this.router.navigate(['/system/personal-control',entity.id])
  //   }else{
  //     console.warn("El personal para controlar no esta seleccionado")
  //   }
  // }
  onOpenMenuOptionsRowTable(event : MouseEvent, menu : any, row : any){
    this.selectedRow.update(() => row)
    menu.toggle(event)

  }
}
