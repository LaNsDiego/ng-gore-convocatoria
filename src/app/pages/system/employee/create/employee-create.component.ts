import { DtoResponseCountry } from '@/app/domain/dtos/country/DtoResponseCountry';
import { DtoEmployeeCreate } from '@/app/domain/dtos/employee/DtoEmployeeCreate';
import { EstablishmentEntity } from '@/app/domain/entities/EstablishmentEntity';
import { JobTitleEntity } from '@/app/domain/entities/JobTitleEntity';
import { CountryService } from '@/app/services/country.service';
import { EmployeeService } from '@/app/services/employee.service';
// import { EstablishmentService } from '@/app/services/establishment.service';
import { JobTitleService } from '@/app/services/job-title.service';
import { PersonService } from '@/app/services/person.service';
import { AuthStore } from '@/app/stores/AuthStore';
import { EmployeeStore } from '@/app/stores/EmployeeStore';
import { HelperStore } from '@/app/stores/HelpersStore';
import { getErrorByKey, getErrosOnControls } from '@/helpers';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-employee-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    FloatLabelModule,
    DropdownModule,
    Button,
    InputTextModule,
    FieldsetModule,
    CalendarModule,
    FileUploadModule,
    IconFieldModule,
    InputIconModule
  ],
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.css'
})
export class EmployeeCreateComponent {
  employeeStore = inject(EmployeeStore)
  employeeService = inject(EmployeeService)
  jobTitleService = inject(JobTitleService)
  personService = inject(PersonService)
  countryService = inject(CountryService)
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
    file_data_employee : new FormControl<File|null>(null,{ validators : [] , nonNullable : true }),

    birth_country_id : new FormControl<number|null>(null,{ validators : [Validators.min(1)] , nonNullable : true}),
    birth_department_id : new FormControl<number|null>(null,{ validators : [Validators.min(1)] , nonNullable : true}),
    birth_province_id : new FormControl<number|null>(null,{ validators : [Validators.min(1)] , nonNullable : true}),
    birth_city_id : new FormControl<number|null>(null,{ validators : [Validators.min(1)] , nonNullable : true}),
    file_place_of_birth : new FormControl<File|null>(null,{ validators : [] , nonNullable : true }),

    address_country_id : new FormControl<number|null>(null,{ validators : [Validators.min(1)] , nonNullable : true}),
    address_department_id : new FormControl<number|null>(null,{ validators : [Validators.min(1)] , nonNullable : true}),
    address_province_id : new FormControl<number|null>(null,{ validators : [Validators.min(1)] , nonNullable : true}),
    address_city_id : new FormControl<number|null>(null,{ validators : [Validators.min(1)] , nonNullable : true}),
    address : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    file_address : new FormControl<File|null>(null,{ validators : [] , nonNullable : true }),

    bank : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    account_type : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    account_number : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    cci : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    file_bank_account : new FormControl<File|null>(null,{ validators : [] , nonNullable : true }),

    executor_unit : new FormControl<any>(null,{ validators : [Validators.required] , nonNullable : true }),

  })

  sexs = signal<any[]>([
    { label : 'MASCULINO'},
    { label : 'FEMENINO'},
  ])

  maritalStatus = signal<any[]>([
    { label : 'SOLTERO'},
    { label : 'CASADO'},
    { label : 'DIVORCIADO'},
    { label : 'VIUDO'},
  ])

  birthCountries = signal<DtoResponseCountry[]>([])
  birthDepartments = signal<any[]>([])
  birthProvincies = signal<any[]>([])
  birthCities = signal<any[]>([])

  addressCountries = signal<DtoResponseCountry[]>([])
  addressDepartments = signal<any[]>([])
  addressProvincies = signal<any[]>([])
  addressCities = signal<any[]>([])

  isFindingPerson = signal(false)
  authStore = inject(AuthStore)

  banks = signal<any[]>([
    { label : 'BCP'},
    { label : 'BBVA'},
    { label : 'INTERBANK'},
    { label : 'SCOTIABANK'},
    { label : 'BANBIF'},
    { label : 'BANCO DE LA NACION'},
    { label : 'BANCO PICHINCHA'},
  ])

  accountTypes = signal<any[]>([
    { label : 'CUENTA DE AHORROS'},
    { label : 'CUENTA CORRIENTE'},
  ])

  prevDNI = signal<string|null>(null)

  constructor() {
    effect(() => {
      this.frmCreate.controls.executor_unit.setValue(this.authStore.userAuthenticated()?.executor_unit)
      this.frmCreate.controls.document_type.valueChanges.subscribe(value => {
        this.setDocumentNumberValidators(value);
      });
      this.setDocumentNumberValidators(this.frmCreate.get('document_type')?.value || '');

      this.frmCreate.controls.document_number.valueChanges.subscribe(value => {
        if(value.length === 8 && value !== this.prevDNI()){
          this.prevDNI.set(value)
          this.isFindingPerson.set(true)
          this.personService.find(value).subscribe({
            next : (response) => {
              this.isFindingPerson.set(false)
              this.helperStore.showToast({severity : 'success', summary : 'Exitoso', detail : response.message})
              this.frmCreate.controls.name.setValue(response.person.first_name)
              this.frmCreate.controls.father_last_name.setValue(response.person.father_lastname)
              this.frmCreate.controls.mother_last_name.setValue(response.person.mother_lastname)
              if(response.person.sex != ''){
                this.frmCreate.controls.sex.setValue(response.person.sex == 'F' ? 'FEMENINO' : 'MASCULINO')
              }

              console.log("found person",response);


              if(response.exists){
                this.frmCreate.controls.document_number.setErrors({ exists : true})
              }


            },
            error : (error) => {
              this.isFindingPerson.set(false)
              this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
              this.frmCreate.controls.name.setValue('')
              this.frmCreate.controls.father_last_name.setValue('')
              this.frmCreate.controls.mother_last_name.setValue('')
              this.frmCreate.controls.sex.setValue('')
              console.error(error)
            }
          })

        }
      })

      this.countryService.list().subscribe({
        next : (response) => {
          console.log(response);

          this.birthCountries.set(response)
          this.addressCountries.set(response)
        },
        error : (error) => {
          console.error(error)
        }
      })

      this.frmCreate.controls.birth_country_id.valueChanges.subscribe(value => {
        const countryId = Number(value)
        if(!isNaN(countryId)){
          const country = this.birthCountries().find(c => c.id === countryId) as DtoResponseCountry
          if(country){
            this.birthDepartments.set(country.departments)
          }
        }else{
          this.birthDepartments.set([])
          this.birthProvincies.set([])
          this.birthCities.set([])
        }
      })
      this.frmCreate.controls.address_country_id.valueChanges.subscribe(value => {
        const countryId = Number(value)
        if(!isNaN(countryId)){
          const country = this.addressCountries().find(c => c.id === countryId) as DtoResponseCountry
          if(country){
            this.addressDepartments.set(country.departments)
          }
        }else{
          this.addressDepartments.set([])
          this.addressProvincies.set([])
          this.addressCities.set([])
        }
      })

      this.frmCreate.controls.birth_department_id.valueChanges.subscribe(value => {
        const departmentId = Number(value)
        if(!isNaN(departmentId)){
          const department = this.birthDepartments().find(d => d.id === departmentId)
          if(department){
            this.birthProvincies.set(department.provincies)
          }


        }else{
          this.birthProvincies.set([])
          this.birthCities.set([])
        }
      })

      this.frmCreate.controls.address_department_id.valueChanges.subscribe(value => {
        const departmentId = Number(value)
        if(!isNaN(departmentId)){
          const department = this.addressDepartments().find(d => d.id === departmentId)
          if(department){
            this.addressProvincies.set(department.provincies)
          }


        }else{
          this.addressProvincies.set([])
          this.addressCities.set([])
        }
      })

      this.frmCreate.controls.birth_province_id.valueChanges.subscribe(value => {
        const provinceId = Number(value)
        if(!isNaN(provinceId)){
          const province = this.birthProvincies().find(p => p.id === provinceId)
          this.birthCities.set(province?.cities)
        }
      })

      this.frmCreate.controls.address_province_id.valueChanges.subscribe(value => {
        const provinceId = Number(value)
        if(!isNaN(provinceId)){
          const province = this.addressProvincies().find(p => p.id === provinceId)
          this.addressCities.set(province?.cities)
        }
      })
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
    this.employeeStore.closeModalCreate()
  }

  handleSubmit(){
    this.frmCreate.markAllAsTouched()
    if(this.frmCreate.status === 'VALID'){
      console.log(this.frmCreate.value)
      const values = this.frmCreate.getRawValue()
      this.employeeService.store(values as any)
      .subscribe({
        next : (response) => {
          console.log({ response})
          this.employeeStore.closeModalCreate()
          this.frmCreate.reset()
          this.helperStore.showToast({severity : 'success', summary : 'Success', detail : response.message})
          this.employeeStore.doList()
        },
        error : (error) => {
          this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
          console.error(error)
        }

      })
    }else{
      console.warn(getErrosOnControls(this.frmCreate))
    }

  }


  onSelectFileDataEmployee(event : any){
    const [selectedFile] = event.currentFiles
    this.frmCreate.controls.file_data_employee.setValue(selectedFile)
  }
  onSelectFilePlaceBirth(event : any){
    const [selectedFile] = event.currentFiles
    this.frmCreate.controls.file_place_of_birth.setValue(selectedFile)
  }
  onSelectFileAddress(event : any){
    const [selectedFile] = event.currentFiles
    this.frmCreate.controls.file_address.setValue(selectedFile)
  }
  onSelectFileBankAccount(event : any){
    const [selectedFile] = event.currentFiles
    this.frmCreate.controls.file_bank_account.setValue(selectedFile)
  }

  // FUNCTIONS VALIDATION
  getErrorMessage(controlName: string): string {
    const control = this.frmCreate.get(controlName as string)
    return getErrorByKey(controlName,control)
  }

}
