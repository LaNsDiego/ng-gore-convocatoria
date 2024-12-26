import { PersonService } from '@/app/services/person.service';
import { ProjectService } from '@/app/services/project.service';
import { HelperStore } from '@/app/stores/HelpersStore';
import { ProjectStore } from '@/app/stores/ProjectStore';
import { getErrorByKey, getErrosOnControls, hasAccess } from '@/helpers';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TableModule } from 'primeng/table';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ProjectDetailService } from '@/app/services/project-detail.service';
import { TooltipModule } from 'primeng/tooltip';
import { JobProfileAssignedStore } from '@/app/stores/JobProfileAssignedStore';
import { CheckboxModule } from 'primeng/checkbox';
import { ProjectDetailRrhhComponent } from './project-detail-rrhh/project-detail-rrhh.component';
import { AccessKey } from '@/constans';
import { DtoResponseTreeRoleHasPermissionList } from '@/app/domain/dtos/permission/DtoResponseTreeRoleHasPermissionList';
import { AuthStore } from '@/app/stores/AuthStore';
import { ConfirmationService } from 'primeng/api';
import { ProjectDetailEditComponent } from './project-detail-edit/project-detail-edit.component';

@Component({
  selector: 'app-project-view',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    FloatLabelModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    FieldsetModule,
    FileUploadModule,
    KeyFilterModule,
    TableModule,
    InputGroupModule,
    InputNumberModule,
    InputGroupAddonModule,
    TooltipModule,
    CheckboxModule,
    ProjectDetailRrhhComponent,
    ProjectDetailEditComponent,
  ],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.css'
})
export class ProjectViewComponent {
  projectStore = inject(ProjectStore)
  projectService = inject(ProjectService)
  projectDetailService = inject(ProjectDetailService)
  helperStore = inject(HelperStore)
  authStore = inject(AuthStore)
  formBuilder = inject(FormBuilder)
  personService = inject(PersonService)

  jobProfileAssignedStore = inject(JobProfileAssignedStore)
  confirmationService = inject(ConfirmationService)

  saldo = signal<number>(0)

  frmCreate = this.formBuilder.group({
    id : new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    created_at : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    functional_sequence : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    specific_expenditure : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    project_name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    amount_as_specified : new FormControl<number>(0,{ validators : [Validators.required] , nonNullable : true }),
    balance_amount_as_specified : new FormControl<number>(0,{ validators : [] , nonNullable : true }),
    dni_responsible : new FormControl<string>('',{ validators : [Validators.required,Validators.maxLength(8),Validators.minLength(8)] , nonNullable : true }),
    full_name_responsible : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    document_type : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    document_number : new FormControl<string>('',{ validators : [] , nonNullable : true }),
    employeeRequirements : new FormControl<any[]>([],{ validators : [Validators.required,Validators.minLength(1)] , nonNullable : true }),
  })

  frmEmployeeRequirement = this.formBuilder.group({
    project_requirement_id : new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    dni : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    first_name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    father_last_name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    mother_last_name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    amount_required : new FormControl<number>(0,{ validators : [Validators.required] , nonNullable : true }),
  })

  documentTypes = signal<any[]>([
    { label : 'INFORME'},
    { label : 'OTROS'},
  ])

  employeeRequirements = signal<any[]>([])
  userRRHHisEditing = signal<boolean>(false)
  isFreeze = signal<boolean>(false)

  constructor(){
    effect(()=> {
      const entityToView = this.projectStore.entityToView()
      console.log("entityToView",entityToView);

      if(entityToView){
        this.frmCreate.patchValue(entityToView)
        this.frmEmployeeRequirement.controls.project_requirement_id.setValue(entityToView.id)
        this.projectStore.doListByProjectRequirement(entityToView.id)

        this.frmCreate.controls.balance_amount_as_specified.setValue(this.projectStore.balanceAmountAsSpecific())
        // this.realSaldoFromProject({
        //   functional_sequence : entityToView.functional_sequence,
        //   specific_expenditure : entityToView.specific_expenditure
        // })
        // console.log("change");

        this.projectStore.doRealSaldo()
        this.frmEmployeeRequirement.controls.dni.valueChanges.subscribe((value) => {
          if(value.length === 8){
            this.personService.find(value).subscribe({
              next : (response) => {
                console.log("REQ PERSON",response)
                if(response.person){
                  this.frmEmployeeRequirement.controls.first_name.setValue(response.person.first_name)
                  this.frmEmployeeRequirement.controls.father_last_name.setValue(response.person.father_lastname)
                  this.frmEmployeeRequirement.controls.mother_last_name.setValue(response.person.mother_lastname)

                }
              },
              error : (error) => {
                console.error(error)
                this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
              }
            })
          }else{
            this.frmCreate.controls.full_name_responsible.enable()
          }
        })

      }

      if(entityToView && entityToView.is_freeze){
        this.isFreeze.set(entityToView.is_freeze)
        Object.keys(this.frmEmployeeRequirement.controls).forEach((key) => {
          this.frmEmployeeRequirement.get(key)?.disable();
        })

        Object.keys(this.frmCreate.controls).forEach((key) => {
          this.frmCreate.get(key)?.disable();
        })
      }

      this.frmCreate.controls.balance_amount_as_specified.valueChanges.subscribe((value) => {
        if(!isNaN(value)){
          this.saldo.set(value)
          console.log("saldo",value);


        }
      })
    },{
      allowSignalWrites : true
    })

  }

  onCloseModalCreate(a : boolean){
    this.projectStore.closeModalView()
    this.frmCreate.reset()
  }

  addEmployeeRequirement(){
    this.frmEmployeeRequirement.markAllAsTouched()
    if(this.frmEmployeeRequirement.status === 'VALID'){
      const values = this.frmEmployeeRequirement.getRawValue()
      console.log("required dni",values);


      if(this.projectStore.requirementDetails().find(er => er.dni === values.dni)){
        this.helperStore.showToast({severity : 'warn', summary : 'Advertencia', detail : 'El trabajador ya fue agregado'})
        return
      }

      const diferrenceResult = Number(this.frmCreate.controls.balance_amount_as_specified.value) - Number(values.amount_required)
      if(diferrenceResult < 0){
        this.helperStore.showToast({severity : 'error', summary : 'Error', detail : 'El monto requerido excede el presupuesto'})
        return
      }
      this.frmCreate.controls.balance_amount_as_specified.setValue(diferrenceResult)

      this.projectStore.requirementDetails().push(values)
      this.projectStore.setEmployeeRequirements(this.projectStore.requirementDetails())
      this.frmEmployeeRequirement.reset()
      this.frmCreate.controls.employeeRequirements.setValue(this.projectStore.requirementDetails())

      this.projectDetailService.store(values).subscribe({
        next : (response) => {
          console.log(response)
          this.helperStore.showToast({severity : 'success', summary : 'Success', detail : response.message})
          this.projectStore.doListByProjectRequirement(this.projectStore.entityToView().id)
          this.projectStore.doRealSaldo()
        },
        error : (error) => {
          console.error(error)
          this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
        }
      })

    }else{
      console.warn(getErrosOnControls(this.frmEmployeeRequirement))
    }
  }

  onClickJobTitle(row : any){
    this.jobProfileAssignedStore.openModalCreate(row)
  }

  onEdit(row : any){
    this.projectStore.setProjectDetailToEdit(row)
  }



    onDelete(entity : any|null){
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
            this.projectDetailService.delete(entity.id).subscribe({
              next : (response) => {
                console.log(response)
                this.helperStore.showToast({severity : 'success', summary : 'Success', detail : response.message})
                this.projectStore.doListByProjectRequirement(this.projectStore.entityToView().id)
              },
              error : (error) => {
                console.error(error)
                this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
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


  // realSaldoFromProject(val :any){
  //   this.projectService.realSaldo(val).subscribe({
  //     next : (response) => {
  //       if(response != null || response.hasOwnProperty('amount_as_specified')){
  //         // this.frmCreate.controls.amount_as_specified.setValue(response.amount_as_specified)
  //         this.frmCreate.controls.balance_amount_as_specified.setValue(response.amount_as_specified)
  //       }
  //     },
  //     error : (error) => {
  //       console.error(error)
  //       this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
  //     }
  //   })
  // }

  // FUNCTIONS VALIDATION
  getErrorMessageOnCreate(controlName: string): string {
    const control = this.frmCreate.get(controlName as string)
    return getErrorByKey(controlName,control)
  }
  getErrorOnFrmRequirement(controlName: string): string {
    const control = this.frmEmployeeRequirement.get(controlName as string)
    return getErrorByKey(controlName,control)
  }

  hasAccessKey(key : AccessKey,hasPermissions : DtoResponseTreeRoleHasPermissionList){
    return hasAccess(key,hasPermissions)
  }
}
