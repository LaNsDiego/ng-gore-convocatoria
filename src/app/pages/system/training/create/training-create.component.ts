import { DtoResponseCountry } from '@/app/domain/dtos/country/DtoResponseCountry';
import { CountryService } from '@/app/services/country.service';
import { TrainingService } from '@/app/services/training.service';
import { HelperStore } from '@/app/stores/HelpersStore';
import { TrainingStore } from '@/app/stores/TrainingStore';
import { getErrorByKey, getErrosOnControls } from '@/helpers';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-training-create',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    FloatLabelModule,
    ReactiveFormsModule,
    CalendarModule,
    FieldsetModule,
    FileUploadModule,
    ButtonModule,
    DialogModule,
  ],
  templateUrl: './training-create.component.html',
  styleUrl: './training-create.component.css'
})
export class TrainingCreateComponent {
  trainingStore = inject(TrainingStore)
  trainingService = inject(TrainingService)
  // jobTitleService = inject(JobTitleService)
  // personService = inject(PersonService)
  countryService = inject(CountryService)
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)
  frmCreate = this.formBuilder.group({
    employee_id : new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    study_type : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    topic : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    start_date : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    end_date : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    participation_type : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    institution : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : false}),
    country_id : new FormControl<number|null>(null,{ validators : [Validators.required] , nonNullable : false}),
    department_id : new FormControl<number|null>(null,{ validators : [Validators.required] , nonNullable : false}),
    provincie_id : new FormControl<number|null>(null,{ validators : [Validators.required] , nonNullable : false}),
    city_id : new FormControl<number|null>(null,{ validators : [Validators.required] , nonNullable : false}),
    semester : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : false}),
    credits : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : false}),
    hours : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : false}),
    constancy_type : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : false}),
    mode : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : false}),

    date_expedition : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    qualification_entity_control : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    issue_date : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    registry_number : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    registry_center : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    date_resolution : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    number_resolution : new FormControl<string>('',{ validators : [] , nonNullable : false}),
    file : new FormControl<File|null>(null,{ validators : [] , nonNullable : true }),
    file_register : new FormControl<File|null>(null,{ validators : [] , nonNullable : true }),
  })


  studyTypes = signal<any[]>([
    { label: 'Diplomado' },
    { label: 'Seminario' },
    { label: 'Taller' },
    { label: 'Curso' },
    { label: 'Especialización' },
    { label: 'Capacitación' },
    { label: 'Actualización' },
    { label: 'Otros' }
  ])

  participationTypes = signal<any[]>([
    { label: 'Presencial' },
    { label: 'Virtual' },
    { label: 'Otros' },
    { label: 'No especificado' }
  ])
  constancyTypes = signal<any[]>([
    { label: 'Física' },
    { label: 'Virtual' },
    { label: 'Otros' },
    { label: 'No especificado' }
  ])

  semesters = signal<any[]>([
    { label: 'Primer semestre' },
    { label: 'Segundo semestre' },
    { label: 'Tercer semestre' },
    { label: 'Cuarto semestre' },
    { label: 'Quinto semestre' },
    { label: 'Sexto semestre' },
    { label: 'Séptimo semestre' },
    { label: 'Octavo semestre' },
    { label: 'Noveno semestre' },
    { label: 'Décimo semestre' },

  ])

  modes = signal<any[]>([
    { label: 'Presencial' },
    { label: 'Virtual' },
    { label: 'Mixta' },
    { label: 'Otras' },
    { label: 'No especificado' },

  ])

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


    this.frmCreate.controls.country_id.valueChanges.subscribe(value => {
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


    this.frmCreate.controls.department_id.valueChanges.subscribe(value => {
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


    this.frmCreate.controls.provincie_id.valueChanges.subscribe(value => {
      const provinceId = Number(value)
      if(!isNaN(provinceId)){
        const province = this.provincies().find(p => p.id === provinceId)
        this.cities.set(province?.cities)
      }
    })

    effect(() => {
      const employee = this.trainingStore.employeeToCreate()
      if(employee){
        this.frmCreate.controls.employee_id.setValue(employee.id)
      }else{
        this.frmCreate.reset()
      }
    },{
      allowSignalWrites : true
    })
  }

  onCloseModalCreate(){
    this.frmCreate.reset()
    this.trainingStore.closeModalCreate()
  }

  handleSubmit(){
    this.frmCreate.markAllAsTouched()
    if(this.frmCreate.status === 'VALID'){
      console.log(this.frmCreate.value)
      const values = this.frmCreate.getRawValue()
      this.trainingService.store(values as any)
      .subscribe({
        next : (response) => {
          this.trainingStore.doListByTraining(this.frmCreate.controls.employee_id.value)
          this.trainingStore.closeModalCreate()
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

  onSelectFile(event : any){
    const [selectedFile] = event.currentFiles
    this.frmCreate.controls.file.setValue(selectedFile)
  }

  onSelectFileRegister(event : any){
    const [selectedFile] = event.currentFiles
    this.frmCreate.controls.file_register.setValue(selectedFile)
  }

  // FUNCTIONS VALIDATION
  getErrorMessage(controlName: string): string {
    const control = this.frmCreate.get(controlName as string)
    return getErrorByKey(controlName,control)
  }
}
