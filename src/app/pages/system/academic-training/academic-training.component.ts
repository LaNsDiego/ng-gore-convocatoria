import { HelperStore } from '@/app/stores/HelpersStore';
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
import { ActivatedRoute } from '@angular/router';
import { DtoResponseEmployee } from '@/app/domain/dtos/employee/DtoResponseEmployee';
import { EmployeeService } from '@/app/services/employee.service';
import { AcademicTrainingStore } from '@/app/stores/AcademicTrainingStore';
import { AcademicTrainingService } from '@/app/services/academic-training.service';
import { DtoResponseAcademicTraining } from '@/app/domain/dtos/academic-training/DtoResponseAcademicTraining';
import { AcademicTrainingCreateComponent } from './create/academic-training-create.component';

@Component({
  selector: 'app-academic-training',
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
    AcademicTrainingCreateComponent,
  ],
  templateUrl: './academic-training.component.html',
  styleUrl: './academic-training.component.css'
})
export class AcademicTrainingComponent {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  activedRoute = inject(ActivatedRoute)
  helperStore = inject(HelperStore)
  academicTrainingStore = inject(AcademicTrainingStore)
  academicTrainingService = inject(AcademicTrainingService)
  employeeService = inject(EmployeeService)
  confirmationService = inject(ConfirmationService)

  selectedRow  = signal<DtoResponseAcademicTraining|null>(null)
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
        this.academicTrainingStore.doListByEmployee(employeeId)
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

    this.items = [{ label: 'Inicio', route: '/system/dashboard' }, { label: 'Formación académica' }];
  }



  onOpenCreate(){
    const employee = this.employee()
    if(employee){
      this.academicTrainingStore.openModalCreate(employee)
    }
  }

  onEdit(entity : DtoResponseAcademicTraining|null){
    if(entity){
      this.academicTrainingStore.openModalEdit(entity)
    }else{
      console.warn("No se ha seleccionado un registro",entity);

    }
  }

  onDelete(entity : DtoResponseAcademicTraining|null){
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
