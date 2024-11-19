import { DtoResponseCountry } from '@/app/domain/dtos/country/DtoResponseCountry';
import { DtoEmployeeEdit } from '@/app/domain/dtos/employee/DtoEmployeeEdit';
import { EmployeeEntity } from '@/app/domain/entities/EmployeeEntity';
import { EstablishmentEntity } from '@/app/domain/entities/EstablishmentEntity';
import { JobTitleEntity } from '@/app/domain/entities/JobTitleEntity';
import { CountryService } from '@/app/services/country.service';
import { EmployeeService } from '@/app/services/employee.service';
// import { EstablishmentService } from '@/app/services/establishment.service';
import { JobTitleService } from '@/app/services/job-title.service';
import { EmployeeStore } from '@/app/stores/EmployeeStore';
import { HelperStore } from '@/app/stores/HelpersStore';
import { emptyFile, getErrorByKey, getErrosOnControls } from '@/helpers';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button, ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonGroupModule } from 'primeng/buttongroup';
@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    ReactiveFormsModule,
    DialogModule,
    FloatLabelModule,
    DropdownModule,
    Button,
    InputTextModule,
    FieldsetModule,
    FileUploadModule,
    ButtonModule,
    ButtonGroupModule
  ],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css'
})
export class EmployeeEditComponent {
  employeeStore = inject(EmployeeStore)
  employeeService = inject(EmployeeService)
  jobTitleService = inject(JobTitleService)
  countryService = inject(CountryService)
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)
  frmEdit = this.formBuilder.group({
    id : new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true}),
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


  imageRoute = signal<string>('')


  constructor() {
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

    this.frmEdit.controls.birth_country_id.valueChanges.subscribe(value => {
      const countryId = Number(value)
      if(!isNaN(countryId)){
        const country = this.birthCountries().find(c => c.id === countryId)
        if(country){
          this.birthDepartments.set(country.departments)
        }
      }else{
        this.birthDepartments.set([])
        this.birthProvincies.set([])
        this.birthCities.set([])
      }
    })
    this.frmEdit.controls.address_country_id.valueChanges.subscribe(value => {
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

    this.frmEdit.controls.birth_department_id.valueChanges.subscribe(value => {
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

    this.frmEdit.controls.address_department_id.valueChanges.subscribe(value => {
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

    this.frmEdit.controls.birth_province_id.valueChanges.subscribe(value => {
      const provinceId = Number(value)
      if(!isNaN(provinceId)){
        const province = this.birthProvincies().find(p => p.id === provinceId)
        this.birthCities.set(province?.cities)
      }
    })

    this.frmEdit.controls.address_province_id.valueChanges.subscribe(value => {
      const provinceId = Number(value)
      if(!isNaN(provinceId)){
        const province = this.addressProvincies().find(p => p.id === provinceId)
        this.addressCities.set(province?.cities)
      }
    })

    effect(() => {
      const entity = this.employeeStore.entityEdit()
      if(entity){
        this.frmEdit.patchValue({
          ...entity,
          address_country_id : entity.address_city.province.department.country.id,
          address_department_id : entity.address_city.province.department.id,
          address_province_id : entity.address_city.province.id,
          address_city_id : entity.address_city.id,
          birth_country_id : entity.birth_city.province.department.country.id,
          birth_department_id : entity.birth_city.province.department.id,
          birth_province_id : entity.birth_city.province.id,
          birth_city_id : entity.birth_city.id,
          name : entity.first_name,
          file_data_employee : emptyFile(entity.full_path_file_data_employee),
          file_bank_account : emptyFile(entity.full_path_file_bank_account),
          file_address : emptyFile(entity.full_path_file_address),
          file_place_of_birth : emptyFile(entity.full_path_file_place_of_birth),
        })
      }else{
        this.frmEdit.reset()
      }
    },{
      allowSignalWrites : true
    })

  }

  document_types = [
    {  abbreviation: 'DNI',name : 'DOCUMENTO NACIONAL DE IDENTIDAD'},
    {  abbreviation: 'RUC',name : 'REGISTRO UNICO DE CONTRIBUYENTES'},
  ]



  handleSubmit(){
    this.frmEdit.markAllAsTouched()
    if(this.frmEdit.status === 'VALID'){
      console.log(this.frmEdit.value)
      const values = this.frmEdit.getRawValue()
      this.employeeService.update(values as any)
      .subscribe({
        next : (response) => {
          console.log(response)
          this.employeeStore.closeModalEdit()
          this.frmEdit.reset()
          this.helperStore.showToast({severity : 'success', summary : 'Exito', detail : response.message})
          this.employeeStore.doList()
        },
        error : (error) => {
          this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
          console.error(error)
        }

      })
    }else{
      console.warn(getErrosOnControls(this.frmEdit))
    }

  }

  onSelectFileDataEmployee(event : any){
    const [selectedFile] = event.currentFiles
    this.frmEdit.controls.file_data_employee.setValue(selectedFile)
  }
  onSelectFilePlaceBirth(event : any){
    const [selectedFile] = event.currentFiles
    this.frmEdit.controls.file_place_of_birth.setValue(selectedFile)
  }
  onSelectFileAddress(event : any){
    const [selectedFile] = event.currentFiles
    this.frmEdit.controls.file_address.setValue(selectedFile)
  }
  onSelectFileBankAccount(event : any){
    const [selectedFile] = event.currentFiles
    this.frmEdit.controls.file_bank_account.setValue(selectedFile)
  }

  // FUNCTIONS VALIDATION
  getErrorMessage(controlName: string): string {
    const control = this.frmEdit.get(controlName as string)
    return getErrorByKey(controlName,control)
  }

  onClickPreviewImage( file : any){
    if(file.global_url){
      this.imageRoute.set(file.global_url)

    }else{
      this.imageRoute.set(file.objectURL)
    }
  }

  emptyFile(full_path : string){
    return emptyFile(full_path)
  }
}
