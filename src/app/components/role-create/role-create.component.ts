import { DtoRoleCreate } from '@/app/domain/dtos/role/DtoRoleCreatel';
import { RoleService } from '@/app/services/role.service';
import { HelperStore } from '@/app/stores/HelpersStore';
import { RoleStore } from '@/app/stores/RoleStore';
import { getErrorByKey } from '@/helpers';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-role-create',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    FloatLabelModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './role-create.component.html',
  styleUrl: './role-create.component.css'
})
export class RoleCreateComponent {
  roleStore = inject(RoleStore)
  roleService = inject(RoleService)
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)
  frmCreate = this.formBuilder.group({
    name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
  })

  constructor() {}


  onCloseModalCreate(){
    this.roleStore.closeModalCreate()
    this.frmCreate.reset()
  }

  handleSubmit(){
    this.frmCreate.markAllAsTouched()
    if(this.frmCreate.status === 'VALID'){
      console.log(this.frmCreate.value)
      const values = this.frmCreate.getRawValue()
      this.roleService.store(values as DtoRoleCreate)
      .subscribe({
        next : (response) => {
          this.roleStore.closeModalCreate()
          this.frmCreate.reset()
          this.helperStore.showToast({severity : 'success', summary : 'Success', detail : response.message})
          this.roleStore.doList()
        },
        error : (error) => {
          console.log({error})
        }

      })
    }else{
      console.log(this.frmCreate)
      console.log(
        Object.keys(this.frmCreate.controls)
      .map((field ) => ({field,errors : this.frmCreate.get(field)?.errors , status : this.frmCreate.get(field)?.status , value : this.frmCreate.get(field)?.value }))
      )
    }

  }

  // FUNCTIONS VALIDATION
  getErrorMessage(controlName: string): string {
    const control = this.frmCreate.get(controlName as string)
    return getErrorByKey(controlName,control)
  }
}
