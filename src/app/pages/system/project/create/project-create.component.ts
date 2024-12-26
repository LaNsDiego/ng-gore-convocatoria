import { PersonService } from '@/app/services/person.service';
import { ProjectService } from '@/app/services/project.service';
import { HelperStore } from '@/app/stores/HelpersStore';
import { ProjectStore } from '@/app/stores/ProjectStore';
import { getErrorByKey, getErrosOnControls, pointsAndNumericValidator } from '@/helpers';
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
import { AuthStore } from '@/app/stores/AuthStore';
import { DOCUMENT_TYPES } from '@/constans';

@Component({
  selector: 'app-project-create',
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
    InputGroupAddonModule
  ],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css'
})
export class ProjectCreateComponent {
  projectStore = inject(ProjectStore)
  projectService = inject(ProjectService)
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)
  personService = inject(PersonService)
  authStore = inject(AuthStore)

  frmCreate = this.formBuilder.group({
    functional_sequence : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    specific_expenditure : new FormControl<string>('',{ validators : [Validators.required/*pointsAndNumericValidator()*/ ] , nonNullable : true }),
    project_name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    amount_as_specified : new FormControl<number>(0,{ validators : [Validators.required] , nonNullable : true }),
    balance_amount_as_specified : new FormControl<number>(0,{ validators : [] , nonNullable : true }),
    dni_responsible : new FormControl<string>('',{ validators : [Validators.required,Validators.maxLength(8),Validators.minLength(8)] , nonNullable : true }),
    full_name_responsible : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    document_type : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    document_number : new FormControl<string>('',{ validators : [] , nonNullable : true }),
    employeeRequirements : new FormControl<any[]>([],{ validators : [Validators.required,Validators.minLength(1)] , nonNullable : true }),
    executor_unit : new FormControl<any>('',{ validators : [] , nonNullable : true }),
  })

  frmEmployeeRequirement = this.formBuilder.group({
    dni : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    first_name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    father_last_name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    mother_last_name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    amount_required : new FormControl<number>(0,{ validators : [Validators.required] , nonNullable : true }),
  })

  documentTypes = signal<any[]>(DOCUMENT_TYPES)

  employeeRequirements = signal<any[]>([])


  constructor(){

    effect(() => {
      const isOpen = this.projectStore.isOpenCreate()
      if(isOpen){
        this.frmCreate.controls.executor_unit.setValue(this.authStore.userAuthenticated()?.executor_unit)
      }
    },{
      allowSignalWrites : true
    })

    this.frmCreate.controls.dni_responsible.valueChanges.subscribe((value) => {
      console.log(value);
      if(value.length === 8){
        this.personService.find(value).subscribe({
          next : (response) => {
            console.log(response)
            if(response.person){
              this.frmCreate.controls.full_name_responsible.setValue(`${response.person.first_name} ${response.person.father_lastname} ${response.person.mother_lastname}`)
              this.frmCreate.controls.full_name_responsible.disable()
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

    this.frmCreate.controls.functional_sequence.valueChanges.subscribe((value) => {
      if(value.length > 3 && this.frmCreate.controls.specific_expenditure.value.length > 8){
        this.searchProject({
          functional_sequence : value,
          specific_expenditure : this.frmCreate.controls.specific_expenditure.value
        })
      }
    })

    this.frmCreate.controls.specific_expenditure.valueChanges.subscribe((value) => {
      if(value.length > 8 && this.frmCreate.controls.functional_sequence.value.length > 3){
        this.searchProject({
          functional_sequence : this.frmCreate.controls.functional_sequence.value,
          specific_expenditure : value
        })
      }
    })
  }

  searchProject({functional_sequence,specific_expenditure }:{
    functional_sequence : any,
    specific_expenditure : any,
  }){
    this.projectService.findVFP({
      functional_sequence,
      specific_expenditure
    }).subscribe({
      next : (response) => {

        if(response != null){
          this.frmCreate.controls.project_name.setValue(response.nombre)
          this.frmCreate.controls.amount_as_specified.setValue(response.saldo)
          this.frmCreate.controls.balance_amount_as_specified.setValue(response.saldo)

          this.realSaldoFromProject({
            functional_sequence : this.frmCreate.controls.functional_sequence.value,
            specific_expenditure : this.frmCreate.controls.specific_expenditure.value
          })

        }else{
          this.helperStore.showToast({severity : 'warn', summary : 'Advertencia', detail : 'No se encontró el proyecto'})
        }
      },
      error : (error) => {
        console.error(error)
        this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
      }
    })
  }

  realSaldoFromProject(val :any){
    this.projectService.realSaldo(val).subscribe({
      next : (response) => {
        console.log(response)
        // return response.saldo
        // this.frmCreate.controls.project_name.setValue(response.nombre)
        // this.frmCreate.controls.amount_as_specified.setValue(response.saldo)
        if(response != null || response.hasOwnProperty('amount_as_specified')){
          // this.frmCreate.controls.amount_as_specified.setValue(response.amount_as_specified)
          this.frmCreate.controls.balance_amount_as_specified.setValue(response.amount_as_specified)
        }
      },
      error : (error) => {
        console.error(error)
        this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
      }
    })
  }

  onCloseModalCreate(a : boolean){
    this.projectStore.closeModalCreate()
    this.frmCreate.reset()
  }

  handleSubmit(){
    this.frmCreate.markAllAsTouched()
    if(this.frmCreate.status === 'VALID'){
      const values = this.frmCreate.getRawValue()
      this.projectService.store(values)
      .subscribe({
        next : (response) => {
          console.log(response)
          this.projectStore.closeModalCreate()
          this.frmCreate.reset()
          this.helperStore.showToast({severity : 'success', summary : 'Success', detail : response.message})
          this.projectStore.doList()
          this.employeeRequirements.set([])
        },
        error : (error) => {
          console.error(error)
          this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
        }

      })
    }else{
      console.warn(getErrosOnControls(this.frmCreate))
    }

  }

  addEmployeeRequirement(){
    this.frmEmployeeRequirement.markAllAsTouched()
    if(this.frmEmployeeRequirement.status === 'VALID'){
      const values = this.frmEmployeeRequirement.getRawValue()
      console.log("amount specified",this.frmCreate.controls.balance_amount_as_specified.value);
      console.log("amount req",values.amount_required);

      if(this.employeeRequirements().find(er => er.dni === values.dni)){
        this.helperStore.showToast({severity : 'warn', summary : 'Advertencia', detail : 'El trabajador ya fue agregado'})
        return
      }

      const diferrenceResult = Number(this.frmCreate.controls.balance_amount_as_specified.value) - Number(values.amount_required)
      if(diferrenceResult < 0){
        this.helperStore.showToast({severity : 'error', summary : 'Error', detail : 'El monto requerido excede el presupuesto'})
        return
      }
      this.frmCreate.controls.balance_amount_as_specified.setValue(diferrenceResult)
      this.employeeRequirements.update((prev) => [...prev,values])
      this.frmEmployeeRequirement.reset()
      console.log("requerimientos",this.employeeRequirements());
      this.frmCreate.controls.employeeRequirements.setValue(this.employeeRequirements())

    }else{
      console.warn(getErrosOnControls(this.frmEmployeeRequirement))
    }
  }

  removeEmployeeRequirement(row : any){
    const index = this.employeeRequirements().findIndex(er => er.id === row.id)
    const employee = this.employeeRequirements()[index]
    const diferrenceResult = Number(this.frmCreate.controls.balance_amount_as_specified.value) + Number(employee.amount_required)
    this.frmCreate.controls.balance_amount_as_specified.setValue(diferrenceResult)
    this.employeeRequirements.update((prev) => prev.filter((_,i) => i !== index))
    this.frmCreate.controls.employeeRequirements.setValue(this.employeeRequirements())
  }

  // FUNCTIONS VALIDATION
  getErrorMessageOnCreate(controlName: string): string {
    const control = this.frmCreate.get(controlName as string)
    return getErrorByKey(controlName,control)
  }
  getErrorOnFrmRequirement(controlName: string): string {
    const control = this.frmEmployeeRequirement.get(controlName as string)
    return getErrorByKey(controlName,control)
  }


}
