import { DtoUserEdit } from '@/app/domain/dtos/user/DtoUserEdit';
import { EmployeeEntity } from '@/app/domain/entities/EmployeeEntity';
import { RoleEntity } from '@/app/domain/entities/RoleEntity';
import { EmployeeService } from '@/app/services/employee.service';
import { RoleService } from '@/app/services/role.service';
import { UserService } from '@/app/services/user.service';
import { HelperStore } from '@/app/stores/HelpersStore';
import { UserStore } from '@/app/stores/UserStore';
import { getErrorByKey } from '@/helpers';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    DropdownModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    FloatLabelModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {

  userStore = inject(UserStore)
  userService = inject(UserService)
  roleService = inject(RoleService)
  employeeService = inject(EmployeeService)
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)
  frmEdit = this.formBuilder.group({
    id : new FormControl<number>(0,{ validators : [Validators.min(1)] , nonNullable : true}),
    name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    email : new FormControl<string>('',{ validators : [Validators.required,Validators.email] , nonNullable : true}),
    role_id : new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true}),
    employee_id : new FormControl<number>(0,{ validators : [] , nonNullable : true}),
  })

  roles = signal<RoleEntity[]>([])
  employees = signal<EmployeeEntity[]>([])

  constructor() {

    this.roleService.list().subscribe({
      next : (roles) => {
        this.roles.update(() => roles)
      },
      error : (error) => {
        console.log({error})
      }
    })

    this.employeeService.list().subscribe({
      next : (employees) => {
        this.employees.update(() => employees)
      },
      error : (error) => {
        console.log({error})
      }
    })

    effect(() => {
      const user = this.userStore.entityEdit()
      console.log(`updated entity edit`,user);
      if(user){
        // console.log("SELECTED",userEntity)
        this.frmEdit.patchValue({...user , employee_id : Array.isArray(user.employees) && user.employees.length > 0  ? user.employees[0].id  : 0})
      }
    },{
      allowSignalWrites : true
    })
  }


  onCloseModal(a : boolean){
    this.userStore.closeModalEdit()
    this.frmEdit.reset()
  }

  handleSubmit(){
    this.frmEdit.markAllAsTouched()
    if(this.frmEdit.status === 'VALID'){
      const values = this.frmEdit.getRawValue()
      this.userService.update(values as DtoUserEdit)
      .subscribe({
        next : (response) => {
          console.log(response)
          this.userStore.closeModalEdit()
          this.frmEdit.reset()
          this.helperStore.showToast({severity : 'success', summary : 'Success', detail : response.message})
          this.userStore.doList()
        },
        error : (error) => {
          console.log({error})
        }

      })
    }else{
      console.log(this.frmEdit)
      console.log(
        Object.keys(this.frmEdit.controls)
      .map((field ) => ({field,errors : this.frmEdit.get(field)?.errors , status : this.frmEdit.get(field)?.status}))
      )
    }

  }

  //DROPDOWN	ROLE
  onShowModalCreate(event : any){
    console.log({event})
  }

  onChangeSelectedRole(event : DropdownChangeEvent){
    if(event.value === null){
      this.frmEdit.patchValue({role_id :0})
    }else{
      this.frmEdit.patchValue({role_id : event.value.id})
    }
  }

  listRoles(){
    return this.roleService.list()
  }

  //DROPDOWN	EMPLOYEE
  onChangeSelectedEmployee(event : DropdownChangeEvent){
    if(event.value === null){
      this.frmEdit.patchValue({employee_id :0})
    }else{
      this.frmEdit.patchValue({employee_id : event.value.id})
    }
  }

  listEmployees(){
    return this.employeeService.list()
  }

  // FUNCTIONS VALIDATION
  getErrorMessage(controlName: string): string {
    const control = this.frmEdit.get(controlName as string)
    return getErrorByKey(controlName,control)
  }

}
