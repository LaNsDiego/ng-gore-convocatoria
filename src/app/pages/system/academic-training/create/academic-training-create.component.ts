import { DtoResponseCountry } from '@/app/domain/dtos/country/DtoResponseCountry';
import { AcademicTrainingService } from '@/app/services/academic-training.service';
import { CountryService } from '@/app/services/country.service';
import { AcademicTrainingStore } from '@/app/stores/AcademicTrainingStore';
import { HelperStore } from '@/app/stores/HelpersStore';
import { ACADEMIC_DEGREE, ACADEMIC_DEGREE_LEVELS, ACADEMIC_DEGREE_SPECIALTY, SITUATION_ACADEMIC, STUDY_CENTERS } from '@/constans';
import { getErrorByKey, getErrosOnControls } from '@/helpers';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-academic-training-create',
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
    ReactiveFormsModule,
    TableModule
  ],
  templateUrl: './academic-training-create.component.html',
  styleUrl: './academic-training-create.component.css'
})
export class AcademicTrainingCreateComponent {
  academicTrainingStore = inject(AcademicTrainingStore)
  academicTrainingService = inject(AcademicTrainingService)
  countryService = inject(CountryService)
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)
  frmCreate = this.formBuilder.group({
    employee_id : new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),

    educational_level : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    education_country_id : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    education_study_center : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    academic_situation : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    academic_situation_start_year : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    academic_situation_end_year : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : false}),

    academic_situation_country_id : new FormControl<number|null>(null,{ validators : [Validators.required,Validators.min(1)] , nonNullable : false}),
    academic_situation_department_id : new FormControl<number|null>(null,{ validators : [Validators.required,Validators.min(1)] , nonNullable : false}),
    academic_situation_province_id : new FormControl<number|null>(null,{ validators : [Validators.required,Validators.min(1)] , nonNullable : false}),
    academic_situation_city_id : new FormControl<number|null>(null,{ validators : [Validators.required,Validators.min(1)] , nonNullable : false}),
    academic_degree : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    academic_degree_level : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    academic_degree_specialty : new FormControl<string>('',{ validators : [] , nonNullable : false}),

    qualification_title : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    qualification_specialty : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    qualification_expedition_date : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    qualification_entity_control : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    qualification_registration_center : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    qualification_registration_number : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    qualification_registration_date : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    qualification_resolution_date : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    qualification_resolution_number : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    qualification_file : new FormControl<File|null>(null,{ validators : [] , nonNullable : true }),

    tuition_school : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    tuition_number : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    tuition_date : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    tuition_file : new FormControl<File|null>(null,{ validators : [] , nonNullable : true }),

    authorization_certificates : new FormControl<any[]>([],{ validators : [] , nonNullable : true }),
  })
  frmAuthorizationCertificate = this.formBuilder.group({
    authorization_certificate : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    authorization_start_date : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    authorization_end_date : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    authorization_file : new FormControl<File|null>(null,{ validators : [] , nonNullable : true }),
  })

  authorizationCertificates = signal<any[]>([])

  educationalLevels = signal<any[]>([
    { label : 'PRIMARIA'},
    { label : 'SECUNDARIA COMUN'},
    { label : 'SECUNDARIA TECNICA'},
    { label : 'SUPERIOR ARTISTICA'},
    { label : 'SUPERIOR TECNICA'},
    { label : 'SUPERIOR UNIVERSITARIA'},
    { label : 'SUPERIOR POST GRADO'},
    { label : 'SUPERIOR DOCTORADO'},
  ])

  academicSituations = signal<any[]>(SITUATION_ACADEMIC)
  studyCenters = signal<any[]>(STUDY_CENTERS)
  academicDegrees = signal<any[]>(ACADEMIC_DEGREE)
  academicDegreeLevels = signal<any[]>(ACADEMIC_DEGREE_LEVELS)
  academicDegreeSpecialties = signal<any[]>(ACADEMIC_DEGREE_SPECIALTY)

  activedRoute = inject(ActivatedRoute)
  countries = signal<DtoResponseCountry[]>([])
  departments = signal<any[]>([])
  provincies = signal<any[]>([])
  cities = signal<any[]>([])

  constructor() {

    this.countryService.list().subscribe({
      next : (response) => {
        this.countries.set(response)
      },
      error : (error) => {
        console.error(error)
      }
    })

    // ON CHANGE ACADEMIC COUNTRY
    this.frmCreate.controls.academic_situation_country_id.valueChanges.subscribe(value => {
      const countryId = Number(value)
      if(!isNaN(countryId)){
        const country = this.countries().find(c => c.id === countryId) as DtoResponseCountry
        if(country){
          this.departments.set(country.departments)
        }
      }else{
        this.departments.set([])
        this.provincies.set([])
        this.cities.set([])
      }
    })

    // ON CHANGE ACADEMIC DEPARTMENT

    this.frmCreate.controls.academic_situation_department_id.valueChanges.subscribe(value => {
      const departmentId = Number(value)
      if(!isNaN(departmentId)){
        const department = this.departments().find(d => d.id === departmentId)
        if(department){
          this.provincies.set(department.provincies)
        }


      }else{
        this.provincies.set([])
        this.cities.set([])
      }
    })

    // ON CHANGE ACADEMIC PROVINCE
    this.frmCreate.controls.academic_situation_province_id.valueChanges.subscribe(value => {
      const provinceId = Number(value)
      if(!isNaN(provinceId)){
        const province = this.provincies().find(p => p.id === provinceId)
        this.cities.set(province?.cities)
      }
    })




    effect(() => {

      this.activedRoute.paramMap.subscribe(params => {
        const employeeId = Number(params.get('employee_id'))
        console.log("employeeId",employeeId)

        if(!isNaN(employeeId) && employeeId > 0){

          console.log("employeeId on create",employeeId);
          this.frmCreate.controls.employee_id.setValue(employeeId)

        }else{
          this.helperStore.showToast({severity:'error', summary:'Error', detail:'No se ha podido cargar la experiencia del empleado'})
        }
      })
    },{
      allowSignalWrites : true
    })
  }

  handleSubmit(){
    this.frmCreate.markAllAsTouched()
    if(this.frmCreate.status === 'VALID'){
      console.log(this.frmCreate.value)
      const values = this.frmCreate.getRawValue()
      this.academicTrainingService.store(values as any)
      .subscribe({
        next : (response) => {
          this.academicTrainingStore.doListByEmployee(this.frmCreate.controls.employee_id.value)
          this.academicTrainingStore.closeModalCreate()
          this.frmCreate.reset()
          this.helperStore.showToast({severity : 'success', summary : 'Exito', detail : response.message})
          console.log(response)
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

  onSelectQualificationFile(event : any){
    const [selectedFile] = event.currentFiles
    this.frmCreate.controls.qualification_file.setValue(selectedFile)
  }
  onSelectTuitionFile(event : any){
    const [selectedFile] = event.currentFiles
    this.frmCreate.controls.tuition_file.setValue(selectedFile)
  }
  onSelectAuthorizationFile(event : any){
    const [selectedFile] = event.currentFiles
    console.log("selectedFile",selectedFile);

    this.frmAuthorizationCertificate.controls.authorization_file.setValue(selectedFile)
  }


  onAddAuthorizationCertificate(){
    this.authorizationCertificates.update((certificates) => {
      return [...certificates,{
        authorization_certificate : this.frmAuthorizationCertificate.controls.authorization_certificate.value,
        authorization_start_date : this.frmAuthorizationCertificate.controls.authorization_start_date.value,
        authorization_end_date : this.frmAuthorizationCertificate.controls.authorization_end_date.value,
        authorization_file : this.frmAuthorizationCertificate.controls.authorization_file.value
      }]
    })

    this.frmCreate.controls.authorization_certificates.setValue(this.authorizationCertificates())
  }
  // FUNCTIONS VALIDATION
  getErrorMessage(controlName: string): string {
    const control = this.frmCreate.get(controlName as string)
    return getErrorByKey(controlName,control)
  }
}
