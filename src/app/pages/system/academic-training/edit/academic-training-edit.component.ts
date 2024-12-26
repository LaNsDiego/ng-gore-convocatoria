import { DtoResponseCountry } from '@/app/domain/dtos/country/DtoResponseCountry';
import { AcademicTrainingService } from '@/app/services/academic-training.service';
import { AuthorizationCertificateService } from '@/app/services/authorization-certificate.service';
import { CountryService } from '@/app/services/country.service';
import { AcademicTrainingStore } from '@/app/stores/AcademicTrainingStore';
import { HelperStore } from '@/app/stores/HelpersStore';
import { emptyFile, getErrorByKey, getErrosOnControls } from '@/helpers';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
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
  selector: 'app-academic-training-edit',
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
  templateUrl: './academic-training-edit.component.html',
  styleUrl: './academic-training-edit.component.css'
})
export class AcademicTrainingEditComponent {
academicTrainingStore = inject(AcademicTrainingStore)
  workExperienceService = inject(AcademicTrainingService)
  countryService = inject(CountryService)
  authorizationCertificateService = inject(AuthorizationCertificateService)
  helperStore = inject(HelperStore)
  confirmationService = inject(ConfirmationService)
  formBuilder = inject(FormBuilder)

  frmEdit = this.formBuilder.group({
    id : new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    employee_id : new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),

    educational_level : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    education_country_id : new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
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
    academic_training_id : new FormControl<number>(0,{ validators : [Validators.required] , nonNullable : false}),
    authorization_certificate : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : false}),
    authorization_start_date : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : false}),
    authorization_end_date : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : false}),
    authorization_file : new FormControl<File|null>(null,{ validators : [Validators.required] , nonNullable : true }),
  })

  authorizationCertificates = signal<any[]>([])

  educationalLevels = signal<any[]>([
    { label : 'SUPERIOR UNIVERSITARIO'},
    { label : 'TECNICA'},
  ])

  academicSituations = signal<any[]>([
    { label : 'TITULADO'},
    { label : 'BACHILLER'},
    { label : 'EGRESADO'},
  ])
  studyCenters = signal<any[]>([
    { label : 'UNIVERSIDAD PRIVADA DE TACNA'},
    { label : 'UNIVESIDAD NACIONAL JORGE BASADRE'},
    { label : 'UNIVERSIDAD NACIONAL DE INGENIERIA'},
  ])
  academicDegrees = signal<any[]>([
    { label : 'INGENIERIA'},
    { label : 'CIENCIAS DE LA SALUD'},
  ])
  academicDegreeLevels = signal<any[]>([
    { label : 'PREGRADO'},
    { label : 'POSTGRADO'},
  ])

  academicDegreeSpecialties = signal<any[]>([
    { label : "Ingeniería Civil"},
    { label : "Ingeniería de Sistemas"},
    { label : "Ingeniería Industrial"},
    { label : "Ingeniería Ambiental"},
    { label : "Ingeniería Electrónica"},
    { label : "Ingeniería Mecánica"},
    { label : "Ingeniería Mecatrónica"},
    { label : "Ingeniería de Minas"},
    { label : "Ingeniería Agrónoma"},
    { label : "Ingeniería Pesquera"},
    { label : "Ingeniería de Software"},
    { label : "Ingeniería de Energías Renovables"},
    { label : "Ingeniería Química"},
    { label : "Ingeniería Aeroespacial"},
    { label : "Ingeniería Biomédica"},
    { label : "Medicina Humana"},
    { label : "Enfermería"},
    { label : "Odontología"},
    { label : "Psicología"},
    { label : "Tecnología Médica"},
    { label : "Farmacia y Bioquímica"},
    { label : "Nutrición"},
    { label : "Medicina Veterinaria"}  ,
  ])

  experienceTypes = signal<any[]>([
    { label : 'ESPECIFICA'},
    { label : 'GENERAL'},
  ])

  countries = signal<DtoResponseCountry[]>([])
  departments = signal<any[]>([])
  provincies = signal<any[]>([])
  cities = signal<any[]>([])

  constructor() {

    effect(()=> {
      const entityEdit = this.academicTrainingStore.entityEdit()
      if(entityEdit){
        console.log("entityEdit",entityEdit);

        this.frmEdit.patchValue({
          ...entityEdit,
          academic_situation_country_id : entityEdit.academic_situation_city.province.department.country.id ,
          academic_situation_department_id : entityEdit.academic_situation_city.province.department.id ,
          academic_situation_province_id : entityEdit.academic_situation_city.province.id ,
          tuition_file :  emptyFile(entityEdit.full_path_tuition_file),
          qualification_file :  emptyFile(entityEdit.full_path_qualification_file),
        })

        console.log("form",this.frmEdit.value);

        this.authorizationCertificateService.listByAcademicTraining(entityEdit.id).subscribe({
          next : (response) => {
            this.authorizationCertificates.set(response)
          },
          error : (error) => {
            console.error(error)
          }
        })
        // this.authorizationCertificates.set(entityEdit.authorization_certificates)
      }
    },{
      allowSignalWrites : true
    })
    this.countryService.list().subscribe({
      next : (response) => {
        this.countries.set(response)
      },
      error : (error) => {
        console.error(error)
      }
    })

    // ON CHANGE ACADEMIC COUNTRY
    this.frmEdit.controls.academic_situation_country_id.valueChanges.subscribe(value => {
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

    this.frmEdit.controls.academic_situation_department_id.valueChanges.subscribe(value => {
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
    this.frmEdit.controls.academic_situation_province_id.valueChanges.subscribe(value => {
      const provinceId = Number(value)
      if(!isNaN(provinceId)){
        const province = this.provincies().find(p => p.id === provinceId)
        this.cities.set(province?.cities)
      }
    })




    effect(() => {
      const employee = this.academicTrainingStore.employeeToCreate()
      if(employee){
        this.frmEdit.controls.employee_id.setValue(employee.id)
      }else{
        this.frmEdit.reset()
      }
    },{
      allowSignalWrites : true
    })
  }



  handleSubmit(){
    this.frmEdit.markAllAsTouched()
    if(this.frmEdit.status === 'VALID'){

      const values = this.frmEdit.getRawValue()
      console.log("values",values);

      this.workExperienceService.update(values as any)
      .subscribe({
        next : (response) => {
          this.academicTrainingStore.doListByEmployee(this.frmEdit.controls.employee_id.value)
          this.academicTrainingStore.closeModalEdit()
          this.frmEdit.reset()
          this.helperStore.showToast({severity : 'success', summary : 'Exito', detail : response.message})
          console.log(response)
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

  onSelectQualificationFile(event : any){
    const [selectedFile] = event.currentFiles
    this.frmEdit.controls.qualification_file.setValue(selectedFile)
  }
  onSelectTuitionFile(event : any){
    const [selectedFile] = event.currentFiles
    this.frmEdit.controls.tuition_file.setValue(selectedFile)
  }
  onSelectAuthorizationFile(event : any){
    const [selectedFile] = event.currentFiles
    console.log("selectedFile",selectedFile);

    this.frmAuthorizationCertificate.controls.authorization_file.setValue(selectedFile)
  }

  onDeleteAuthorizationCertificate(authorizationCertificate : any){

    if(authorizationCertificate){
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

            this.authorizationCertificateService.delete(authorizationCertificate.id).subscribe({
              next : (response) => {
                this.authorizationCertificateService.listByAcademicTraining(this.frmEdit.controls.id.value).subscribe({
                  next : (response) => {
                    this.authorizationCertificates.set(response)
                  },
                  error : (error) => {
                    console.error(error)
                  }
                })
                this.helperStore.showToast({severity : 'success', summary : 'Exito', detail : response.message})
              },
              error : (error) => {
                this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
                console.error(error)
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


  onAddAuthorizationCertificate(){
    this.frmAuthorizationCertificate.markAllAsTouched()
    if(this.frmAuthorizationCertificate.status === 'VALID'){
      this.frmAuthorizationCertificate.controls.academic_training_id.setValue(this.frmEdit.controls.id.value)
      const values = this.frmAuthorizationCertificate.getRawValue()
      this.authorizationCertificateService.store(values).subscribe({
        next : (response) => {
          this.authorizationCertificateService.listByAcademicTraining(this.frmEdit.controls.id.value).subscribe({
            next : (response) => {
              this.authorizationCertificates.set(response)
            },
            error : (error) => {
              console.error(error)
            }
          })
          this.helperStore.showToast({severity : 'success', summary : 'Exito', detail : response.message})
          this.frmAuthorizationCertificate.reset()
        },
        error : (error) => {
          this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
          console.error(error)
        }
      })
    }
    // this.authorizationCertificates.update((certificates) => {
    //   return [...certificates,{
    //     authorization_certificate : this.frmAuthorizationCertificate.controls.authorization_certificate.value,
    //     authorization_start_date : this.frmAuthorizationCertificate.controls.authorization_start_date.value,
    //     authorization_end_date : this.frmAuthorizationCertificate.controls.authorization_end_date.value,
    //     authorization_file : this.frmAuthorizationCertificate.controls.authorization_file.value
    //   }]
    // })

    // this.frmEdit.controls.authorization_certificates.setValue(this.authorizationCertificates())
  }
  // FUNCTIONS VALIDATION
  getErrorMessage(controlName: string): string {
    const control = this.frmEdit.get(controlName as string)
    return getErrorByKey(controlName,control)
  }
}
