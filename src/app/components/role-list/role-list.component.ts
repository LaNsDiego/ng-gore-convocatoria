import { RoleService } from '@/app/services/role.service';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {ListboxModule} from 'primeng/listbox';
import { DtoResponsedRole } from '@/app/domain/dtos/role/DtoResponsedRole';
import { RoleStore } from '@/app/stores/RoleStore';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [
    ListboxModule,
    ButtonModule,
  ],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css'
})
export class RoleListComponent {
  roleStore = inject(RoleStore)
  roleService = inject(RoleService)

  constructor(){
    this.roleStore.doList()
  }


  onSelectRole(value : DtoResponsedRole | null ){
    this.roleStore.selectRole(value)

  }
}
