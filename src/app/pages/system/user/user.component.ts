import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { UserCreateComponent } from './create/user-create.component';
import { UserEntity } from '@/app/domain/entities/UserEntity';
import { UserEditComponent } from './edit/user-edit.component';
import { DtoResponseUser } from '@/app/domain/dtos/user/DtoResponseUser';
import { HelperStore } from '@/app/stores/HelpersStore';
import { UserStore } from '@/app/stores/UserStore';
import { UserService } from '@/app/services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    TableModule,
     CommonModule,
     InputTextModule,
    BreadcrumbModule,
    CardModule,
    ButtonModule,
    MenuModule,
    UserCreateComponent,
    UserEditComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  providers : [
    MessageService
  ]
})
export class UserComponent {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  helperStore = inject(HelperStore)
  userStore = inject(UserStore)
  userService = inject(UserService)
  confirmationService = inject(ConfirmationService)

  selectedRow  = signal<DtoResponseUser|null>(null)
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
    this.loadTableUsers()
    this.items = [{ icon: 'pi pi-home', route: '/system/dashboard' }, { label: 'Usuarios', route: 'system/usuarios' },{ label: 'Lista'}];
  }
  onSuccessCreate(){
    this.loadTableUsers()
  }

  loadTableUsers(){
    this.userStore.doList()
  }

  onOpenModalCreateUserService(){
    this.userStore.openModalCreate()
  }

  onEdit(userEdit : DtoResponseUser|null){
    if(userEdit){
      console.log(userEdit)
      this.userStore.openModalEdit(userEdit)
    }
  }
  onDelete(entity : UserEntity|null){
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
            this.userService.delete(entity.id).subscribe({
              next: (response) => {
                this.userStore.doList()
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
      console.warn("El vehiculo para eliminar no esta seleccionado")
    }
  }

  onOpenMenuOptionsRowTable(event : MouseEvent, menu : any, row : any){
    this.selectedRow.update(() => row)
    menu.toggle(event)

  }
}
