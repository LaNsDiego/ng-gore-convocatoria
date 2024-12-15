import { DtoResponseEmployee } from '@/app/domain/dtos/employee/DtoResponseEmployee';
import { DtoResponseTraining } from '@/app/domain/dtos/training/DtoResponseTraining';
import { EmployeeService } from '@/app/services/employee.service';
import { TrainingService } from '@/app/services/training.service';
import { HelperStore } from '@/app/stores/HelpersStore';
import { TrainingStore } from '@/app/stores/TrainingStore';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TrainingCreateComponent } from './create/training-create.component';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [
    TableModule,
    CardModule,
    ButtonModule,
    BreadcrumbModule,
    InputTextModule,
    CommonModule,
    IconFieldModule,
    InputIconModule,
    TrainingCreateComponent
  ],
  templateUrl: './training.component.html',
  styleUrl: './training.component.css'
})
export class TrainingComponent {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  activedRoute = inject(ActivatedRoute)
  helperStore = inject(HelperStore)
  trainingStore = inject(TrainingStore)
  trainingService = inject(TrainingService)
  employeeService = inject(EmployeeService)
  confirmationService = inject(ConfirmationService)

  selectedRow  = signal<DtoResponseTraining|null>(null)
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

  employee = signal<DtoResponseEmployee|null>(null)
  constructor(){
    this.activedRoute.paramMap.subscribe(params => {
      const employeeId = Number(params.get('employee_id'))
      console.log("employeeId",employeeId)

      if(!isNaN(employeeId) && employeeId > 0){
        this.trainingStore.doListByTraining(employeeId)
        this.employeeService.getOneById(employeeId).subscribe({
          next: (employee) => {
            this.employee.update(() => employee)
          },
          error: (error) => {
            console.error(error)
            this.helperStore.showToast({severity:'error', summary:'Error', detail:'No se ha podido obtener el empleado'})
          }
        })
      }else{
        this.helperStore.showToast({severity:'error', summary:'Error', detail:'No se ha podido cargar la experiencia del empleado'})
      }
    })

    this.items = [{ label: 'Inicio', route: '/system/dashboard' }, { label: 'Capacitaciones' }];
  }



  onOpenCreate(){
    const employee = this.employee()
    if(employee){
      this.trainingStore.openModalCreate(employee)
    }
  }

  onEdit(entity : DtoResponseTraining|null){
    if(entity){
      this.trainingStore.openModalEdit(entity)
    }else{
      console.warn("No se ha seleccionado un registro",entity);

    }
  }

  onDelete(entity : DtoResponseTraining|null){
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
