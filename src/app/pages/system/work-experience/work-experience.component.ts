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
import { ActivatedRoute, Router } from '@angular/router';
import { DtoResponseEmployee } from '@/app/domain/dtos/employee/DtoResponseEmployee';
import { EmployeeService } from '@/app/services/employee.service';
import { calcularExperienciaTotal } from '@/helpers';

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
    WorkExperienceCreateComponent,
  ],
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.css'
})
export class WorkExperienceComponent {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  activedRoute = inject(ActivatedRoute)
  helperStore = inject(HelperStore)
  workExperienceStore = inject(WorkExperienceStore)
  workExperienceService = inject(WorkExperienceService)
  employeeService = inject(EmployeeService)
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

  calculatedExperience = signal<any|null>(null)

  employee = signal<DtoResponseEmployee|null>(null)
  constructor(){
    this.activedRoute.paramMap.subscribe(params => {
      const employeeId = Number(params.get('employee_id'))
      console.log("employeeId",employeeId)

      if(!isNaN(employeeId) && employeeId > 0){
        this.workExperienceStore.doListByEmployee({
          employee_id :employeeId ,
          callback : (r) => this.workExperienceStore.setCalculatedExperience(this.calcularExperiencia(r))
        })
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

    this.items = [{ label: 'Inicio', route: '/system/dashboard' }, { label: 'Experiencia laboral' }];
  }



  onOpenCreate(){
    const employee = this.employee()
    if(employee){
      this.workExperienceStore.openModalCreate(employee)
    }
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
            this.workExperienceService.delete(entity.id).subscribe({
              next: (response) => {
                const empleado = this.employee()
                if(empleado){
                  this.workExperienceStore.doListByEmployee({
                    employee_id : empleado.id,
                    callback : (r) => this.workExperienceStore.setCalculatedExperience(this.calcularExperiencia(r))
                  })
                  this.helperStore.showToast({severity: 'success', summary: 'Eliminado', detail: response.message })
                }
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




  calcularExperiencia(experiencias: any[]) {

    // Calcular experiencias por filtro
    const experienciaPublica = calcularExperienciaTotal(experiencias, exp => exp.sector === 'publico');
    const experienciaEspecifica = calcularExperienciaTotal(experiencias, exp => exp.experience_type === 'ESPECIFICA');
    const experienciaGeneral = calcularExperienciaTotal(experiencias, exp => exp.experience_type === 'GENERAL');

    return {
      experienciaEspecifica,
      experienciaPublica,
      experienciaGeneral
    }
  }



}
