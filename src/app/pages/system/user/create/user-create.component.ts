import { DtoUserCreate } from '@/app/domain/dtos/user/DtoUserCreate';
import { EmployeeEntity } from '@/app/domain/entities/EmployeeEntity';
import { RoleEntity } from '@/app/domain/entities/RoleEntity';
import { EmployeeService } from '@/app/services/employee.service';
import { RoleService } from '@/app/services/role.service';
import { UserSirService } from '@/app/services/user-sir.service';
import { UserService } from '@/app/services/user.service';
import { HelperStore } from '@/app/stores/HelpersStore';
import { UserStore } from '@/app/stores/UserStore';
import { getErrorByKey, getErrosOnControls } from '@/helpers';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl,FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    FloatLabelModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    FormsModule,

  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent  {
  userStore = inject(UserStore)
  userService = inject(UserService)
  roleService = inject(RoleService)
  employeeService = inject(EmployeeService)
  userSirService = inject(UserSirService)
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)


  frmCreate = this.formBuilder.group({
    name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    email : new FormControl<string>('',{ validators : [Validators.required,Validators.email] , nonNullable : true}),
    dni : new FormControl<string>('',{ validators : [Validators.required,Validators.minLength(8),Validators.maxLength(8)] , nonNullable : true}),
    role_id : new FormControl<number|null>(null,{ validators : [Validators.min(1)] , nonNullable : true}),

  })

  roles = signal<RoleEntity[]>([])
  employees = signal<EmployeeEntity[]>([])

  sirUsers = signal<any[]>([])

  constructor() {

    this.userSirService.list().subscribe({
      next : (sirUsers) => {
        console.log(sirUsers);

        this.sirUsers.set(sirUsers)
      },
      error : (error) => {
        console.error(error)
      }
    })

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

    this.frmCreate.controls.dni.valueChanges.subscribe((val) => {
      if(val.length === 8){
        const userSir = this.sirUsers().find((user) => user.usuario_dni === val)
        // usuario_nomb,usuario_apat,usuario_amat
        if(userSir){
          this.frmCreate.controls.name.setValue(`${userSir.usuario_nomb} ${userSir.usuario_apat} ${userSir.usuario_amat}`)
        }else{
          console.log('no hay usuario con ese dni',val);
        }
      }else{
        console.log('no hay 8 caracteres');

      }
    })
  }


  onCloseModalCreate(a : boolean){
    this.userStore.closeModalCreate()
    this.frmCreate.reset()
  }

  handleSubmit(){
    this.frmCreate.markAllAsTouched()
    if(this.frmCreate.status === 'VALID'){
      const values = this.frmCreate.getRawValue()
      this.userService.store(values as any)
      .subscribe({
        next : (response) => {
          console.log({ response})
          this.userStore.closeModalCreate()
          this.frmCreate.reset()
          this.helperStore.showToast({severity : 'success', summary : 'Success', detail : 'User Service created successfully'})
          this.userStore.doList()
        },
        error : (error) => {
          console.error(error)
          console.log(this.frmCreate.getRawValue())
          this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
        }

      })
    }else{
      console.warn(getErrosOnControls(this.frmCreate))
    }

  }

  //DROPDOWN	ROLE
  onShowModalCreate(event : any){
    console.log({event})
  }

  onChangeSelectedRole(event : DropdownChangeEvent){
    if(event.value === null){
      this.frmCreate.patchValue({role_id :0})
    }else{
      this.frmCreate.patchValue({role_id : event.value.id})
    }
  }

  listRoles(){
    return this.roleService.list()
  }

  listEmployees(){
    return this.employeeService.list()
  }

  // FUNCTIONS VALIDATION
  getErrorMessageOnCreate(controlName: string): string {
    const control = this.frmCreate.get(controlName as string)
    return getErrorByKey(controlName,control)
  }

}
