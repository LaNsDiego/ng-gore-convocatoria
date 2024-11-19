import { EmployeeEntity } from '@/app/domain/entities/EmployeeEntity';
import { EmployeeService } from '@/app/services/employee.service';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { EmployeeCreateComponent } from './create/employee-create.component';
import { EmployeeEditComponent } from './edit/employee-edit.component';
import { DtoResponseEmployee } from '@/app/domain/dtos/employee/DtoResponseEmployee';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Router } from '@angular/router';
import { HelperStore } from '@/app/stores/HelpersStore';
import { EmployeeStore } from '@/app/stores/EmployeeStore';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    BreadcrumbModule,
    CardModule,
    ButtonModule,
    DialogModule,
    MenuModule,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    IconFieldModule,
    InputIconModule,
    InputTextModule

  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent   {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  router = inject(Router)
  helperStore = inject(HelperStore)
  employeeStore = inject(EmployeeStore)
  employeeService = inject(EmployeeService)
  confirmationService = inject(ConfirmationService)

  selectedRow  = signal<DtoResponseEmployee|null>(null)
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
    this.items = [{ label: 'Inicio', route: '/system/dashboard' }, { label: 'Personal' }];
  }
  onSuccessCreate(){
    console.log("onSuccessCreate");
    this.loadTableEmployees()
  }

  loadTableEmployees(){
    this.employeeStore.doList()
  }

  onOpenModalCreateEmployee(){
    this.employeeStore.openModalCreate()
  }

  onEdit(entity : DtoResponseEmployee|null){
    if(entity){
      this.employeeStore.openModalEdit(entity)
    }else{
      console.warn("No se ha seleccionado un registro",entity);

    }
  }

  onDelete(entity : EmployeeEntity|null){
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
            this.employeeService.delete(entity.id).subscribe({
              next: (response) => {
                this.employeeStore.doList()
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
      console.warn("El personal para eliminar no esta seleccionado")
    }
  }

  goToExperience(entity : EmployeeEntity|null){
    if(entity){
      this.router.navigate(['/system/experiencia-laboral',entity.id])
    }else{
      console.warn("El personal para controlar no esta seleccionado")
    }
  }


  onOpenMenuOptionsRowTable(event : MouseEvent, menu : any, row : any){
    this.selectedRow.update(() => row)
    menu.toggle(event)

  }
}
