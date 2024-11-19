import { HelperStore } from '@/app/stores/HelpersStore';
import { WorkExperienceStore } from '@/app/stores/WorkExperienceStore';
import { getErrorByKey, getErrosOnControls } from '@/helpers';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-work-experience-create',
  standalone: true,
  imports: [
    CalendarModule,
    DropdownModule,
    FloatLabelModule,
    CommonModule,
    InputTextModule,
    InputTextareaModule,
    ButtonGroupModule,
    DialogModule,
    FieldsetModule,
    FileUploadModule,
    IconFieldModule,
    InputIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './work-experience-create.component.html',
  styleUrl: './work-experience-create.component.css'
})
export class WorkExperienceCreateComponent {
  workExperienceStore = inject(WorkExperienceStore)
  // employeeService = inject(EmployeeService)
  // jobTitleService = inject(JobTitleService)
  // personService = inject(PersonService)
  // countryService = inject(CountryService)
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)
  frmCreate = this.formBuilder.group({
    document_type : new FormControl<string|null>(null,{ validators : [Validators.required,Validators.minLength(1)] , nonNullable : true}),
    document_number : new FormControl<string>( { value: '', disabled: true },{ nonNullable : true}),
    name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    father_last_name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    mother_last_name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    sex : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    marital_status : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    date_of_birth : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    email : new FormControl<string>('',{ validators : [Validators.email] , nonNullable : false}),
    phone_number : new FormControl<string>('',{ validators: [Validators.pattern('^[0-9]*$')] , nonNullable : false }),
    file_data_employee : new FormControl<File|null>(null,{ validators : [Validators.required] , nonNullable : true }),

    birth_country_id : new FormControl<number|null>(null,{ validators : [Validators.min(1)] , nonNullable : true}),
    birth_department_id : new FormControl<number|null>(null,{ validators : [Validators.min(1)] , nonNullable : true}),
    birth_province_id : new FormControl<number|null>(null,{ validators : [Validators.min(1)] , nonNullable : true}),
    birth_city_id : new FormControl<number|null>(null,{ validators : [Validators.min(1)] , nonNullable : true}),
    file_place_of_birth : new FormControl<File|null>(null,{ validators : [Validators.required] , nonNullable : true }),

    address_country_id : new FormControl<number|null>(null,{ validators : [Validators.min(1)] , nonNullable : true}),
    address_department_id : new FormControl<number|null>(null,{ validators : [Validators.min(1)] , nonNullable : true}),
    address_province_id : new FormControl<number|null>(null,{ validators : [Validators.min(1)] , nonNullable : true}),
    address_city_id : new FormControl<number|null>(null,{ validators : [Validators.min(1)] , nonNullable : true}),
    address : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    file_address : new FormControl<File|null>(null,{ validators : [Validators.required] , nonNullable : true }),

    bank : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    account_type : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    account_number : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    cci : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    file_bank_account : new FormControl<File|null>(null,{ validators : [Validators.required] , nonNullable : true }),


  })


  sexs = signal<any[]>([
    { label : 'MASCULINO'},
    { label : 'FEMENINO'},
  ])

  experienceTypes = signal<any[]>([
    { label : 'ESPECIFICA'},
    { label : 'GENERAL'},
  ])


  constructor() {
    effect(() => {

    },{
      allowSignalWrites : true
    })
  }

  setDocumentNumberValidators(documentType: string|null) {
    const documentNumberControl = this.frmCreate.controls.document_number;

    if (documentType === 'DNI') {
      documentNumberControl?.enable();
      documentNumberControl?.setValidators([Validators.required,Validators.pattern('^[0-9]*$'), Validators.minLength(8), Validators.maxLength(8)]);
    } else if (documentType === 'RUC') {
      documentNumberControl?.enable();
      documentNumberControl?.setValidators([Validators.required,Validators.pattern('^[0-9]*$'), Validators.minLength(11), Validators.maxLength(11)]);
    } else {
      documentNumberControl?.disable();
      documentNumberControl?.clearValidators();
    }

    documentNumberControl?.updateValueAndValidity();
  }

  document_types = [
    {  abbreviation: 'DNI',name : 'DOCUMENTO NACIONAL DE IDENTIDAD'},
    {  abbreviation: 'RUC',name : 'REGISTRO UNICO DE CONTRIBUYENTES'},
  ]


  onCloseModalCreate(a : boolean){
    this.frmCreate.reset()
    this.workExperienceStore.closeModalCreate()
  }

  handleSubmit(){
    // this.frmCreate.markAllAsTouched()
    // if(this.frmCreate.status === 'VALID'){
    //   console.log(this.frmCreate.value)
    //   const values = this.frmCreate.getRawValue()
    //   this.employeeService.store(values as any)
    //   .subscribe({
    //     next : (response) => {
    //       console.log({ response})
    //       this.employeeStore.closeModalCreate()
    //       this.frmCreate.reset()
    //       this.helperStore.showToast({severity : 'success', summary : 'Success', detail : response.message})
    //       this.employeeStore.doList()
    //     },
    //     error : (error) => {
    //       this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
    //       console.error(error)
    //     }

    //   })
    // }else{
    //   console.warn(getErrosOnControls(this.frmCreate))
    // }

  }

  // FUNCTIONS VALIDATION
  getErrorMessage(controlName: string): string {
    const control = this.frmCreate.get(controlName as string)
    return getErrorByKey(controlName,control)
  }
}
