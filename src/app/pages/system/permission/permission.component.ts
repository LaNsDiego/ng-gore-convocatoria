import { PermissionService } from '@/app/services/permission.service';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview'
import { CheckboxModule  } from 'primeng/checkbox'
import { DtoRoleHasAccessEdit } from '@/app/domain/dtos/permission/DtoRoleHasAcessEdit';
import { TreeTable, TreeTableModule } from 'primeng/treetable';
import { DtoResponseModuleSystemList } from '@/app/domain/dtos/system-module/DtoResponseModuleSystemList';
import { TreeNode } from 'primeng/api';
import { DtoResponseSystemModule } from '@/app/domain/dtos/system-module/DtoResponseModuleSystem';
import { DtoResponseModuleGroup } from '@/app/domain/dtos/module-group/DtoResponseModuleGroup';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { Carousel, CarouselModule } from 'primeng/carousel';
import { RoleCreateComponent } from "../../../components/role-create/role-create.component";
import { RoleListComponent } from '@/app/components/role-list/role-list.component';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { tranformArrayToTreeNode } from '@/helpers';
import { HelperStore } from '@/app/stores/HelpersStore';
import { RoleStore } from '@/app/stores/RoleStore';

type DtoResponseModuleGroupKeys = keyof DtoResponseModuleGroup;
@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [
    ButtonModule,
    TabViewModule,
    CommonModule,
    TableModule,
    CheckboxModule,
    FormsModule,
    TreeTableModule,
    BreadcrumbModule,
    CardModule,
    CarouselModule,
    RoleListComponent,
    RoleCreateComponent,
    AccordionModule,
    AvatarModule,
    BadgeModule
],
  templateUrl: './permission.component.html',
  styleUrl: './permission.component.css'
})
export class PermissionComponent {

  permissionService = inject(PermissionService)
  helpers = inject(HelperStore)
  roleStore = inject(RoleStore)

  rolesWithPermissions = signal<any>([])
  headers = signal<any>(['MODULO','CREAR','VER','EDITAR','ELIMINAR','DESCARGAR'])
  modules = signal<TreeNode<any>[]>([])
  cols = signal<{ property : DtoResponseModuleGroupKeys  , header : string }[]>([
    { property : 'name' , header : 'Modulos' },
  ])

  groups = signal<(DtoResponseModuleGroup& { trees : TreeNode<any>[] }) []>([])

  breadcrumbs = [{ label: 'Inicio', route: '/system/dashboard' },{ label: 'Roles y permisos' }]
  carouselItems: any[] = [
    {
      id : 1,
      name: 'Carousel 1',
    },
    {
      id : 2,
      name: 'Carousel 2',
    }
  ]
  selectionKeys = {}
  previousArray: { permission_id: number, has_access: boolean }[] = []

  selectedPermissions = signal<{ permission_id: number, has_access: boolean }[]>([])
  baseSelectionsKeys = signal<{ permission_id: number, has_access: boolean }[]>([])

  firstLoad = signal<boolean>(false)
  constructor(){
    effect(() => {
      const roleEntity = this.roleStore.selectedEntity()
      if(roleEntity){
        this.permissionService.listGroupWithModules().subscribe({
          next: (data) => {
            console.log({realdData : data});
            const transformed = data.flatMap( group => tranformArrayToTreeNode(group) )
            this.groups.update(() => transformed as any )
          },
          error: (error) => {
            console.log(error)
          }
        })

        this.permissionService.listByRole(roleEntity.id).subscribe({
          next: (data) => {
            let structuredKeys: any = {}
            data.forEach((role_has_permission: { id: number, role_id: number, has_access: number, permission: { id: number, system_module: { name: string } } }) => {
              structuredKeys[role_has_permission.permission.id.toString()] = { checked: role_has_permission.has_access, partialChecked: false }
              structuredKeys[role_has_permission.permission.system_module.name] = { checked: false, partialChecked: true }
            })
            this.previousArray = Object.keys(structuredKeys).filter(key => !isNaN(Number(key))).map(n => ({ permission_id: Number(n), has_access: structuredKeys[n].checked }))
            this.selectionKeys = structuredKeys
            this.firstLoad.update(() => true)

            this.selectedPermissions.update(() => this.previousArray)
            this.baseSelectionsKeys.update(() => this.previousArray)
          },
          error: (error) => {
            console.log(error)
          }
        })
      }else{
        this.groups.update(() => [])
      }
    },{ allowSignalWrites  : true})
  }

  updateArray(newArray: { permission_id: number, has_access: boolean }[]) : { added: { permission_id: number, has_access: boolean }[], removed: { permission_id: number, has_access: boolean }[] } {
    const added = newArray.filter(item => !this.baseSelectionsKeys().some(baseItem => baseItem.permission_id === item.permission_id));
    const removed = this.baseSelectionsKeys().filter(baseItem => !newArray.some(item => item.permission_id === baseItem.permission_id));
    return { added, removed }
  }

  // onClickAction(permission : any){
  //   console.log(permission.id);
  //   this.selectedPermissions.update((arr) =>
  //     (arr.includes(permission.id) ?
  //       arr.filter((n:any) => n !== permission.id) :
  //       [...arr, permission.id])
  //     )
  // }
  onClickAction(permission: any) {
    this.selectedPermissions.update((arr) => {
      const existing = arr.find((item: any) => item.permission_id === permission.id)
      if (existing) {
        existing.has_access = !existing.has_access
      } else {
        arr.push({ permission_id: permission.id, has_access: true })
      }
      return [...arr]
    })
  }

  // isPermissionChecked(permissionId : any){
  //   return this.selectedPermissions().includes(permissionId)
  // }

  isPermissionChecked(permissionId: any) {
    const permission = this.selectedPermissions().find((item: any) => item.permission_id === permissionId)
    return permission ? permission.has_access : false
  }

  handleSubmit(){
    console.log(this.selectedPermissions());
    const role = this.roleStore.selectedEntity()
    if(!role){
      this.helpers.showToast({ severity: 'info', summary: 'Advertencia', detail: 'No se ha seleccionado un rol'})
      return
    }

    this.roleStore.setSubmitting(true)
    const role_id = role.id
    this.permissionService.updatePermissions({
      permission_ids : this.selectedPermissions(),
      role_id
    })
    .subscribe({
      next: (response) => {
        this.roleStore.setSubmitting(false)
        this.helpers.showToast({ severity: 'success', summary: 'Actualización', detail: response.message})
        this.baseSelectionsKeys.update(() => this.selectedPermissions())
      },
      error: (error) => {
        console.error(error)
        this.roleStore.setSubmitting(false)
        this.helpers.showToast({ severity: 'error', summary: 'Error', detail: error.message})
        this.selectedPermissions.update(() => this.baseSelectionsKeys())

      }
    })

  }

}
