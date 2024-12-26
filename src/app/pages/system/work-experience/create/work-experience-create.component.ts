import { WorkExperienceService } from '@/app/services/work-experience.service';
import { HelperStore } from '@/app/stores/HelpersStore';
import { WorkExperienceStore } from '@/app/stores/WorkExperienceStore';
import { calcularExperienciaTotal, getErrorByKey, getErrosOnControls } from '@/helpers';
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
  workExperienceService = inject(WorkExperienceService)
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)
  frmCreate = this.formBuilder.group({
    employee_id : new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    sector : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    experience_type : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    entity : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    job_title : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    functions_performed : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    start_date : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : false}),
    end_date : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : false}),
    document_name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : false}),
    file : new FormControl<File|null>(null,{ validators : [Validators.required] , nonNullable : true }),
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
      const employee = this.workExperienceStore.employeeToCreate()
      const isOpen = this.workExperienceStore.isOpenCreate()
      if(employee && isOpen){
        // console.log("EMPLOYE TO CREATE EXPERIENCE",employee);

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
    this.workExperienceStore.closeModalCreate()

  }

  handleSubmit(){
    this.frmCreate.markAllAsTouched()
    if(this.frmCreate.status === 'VALID'){
      console.log(this.frmCreate.value)
      const values = this.frmCreate.getRawValue()
      this.workExperienceService.store(values as any)
      .subscribe({
        next : (response) => {
          this.workExperienceStore.doListByEmployee({
            employee_id : this.frmCreate.controls.employee_id.value,
            callback : (r) => this.workExperienceStore.setCalculatedExperience(this.calcularExperiencia(r))
          })
          this.workExperienceStore.closeModalCreate()
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

  // FUNCTIONS VALIDATION
  getErrorMessage(controlName: string): string {
    const control = this.frmCreate.get(controlName as string)
    return getErrorByKey(controlName,control)
  }


  calcularExperiencia(experiencias: any[]) {

    // Calcular experiencias por filtro
    const experienciaPublica = calcularExperienciaTotal(experiencias, exp => exp.sector === 'publico');
    const experienciaEspecifica = calcularExperienciaTotal(experiencias, exp => exp.experience_type === 'ESPECIFICA');
    const experienciaGeneral = calcularExperienciaTotal(experiencias, exp => exp.experience_type === 'GENERAL');

    return {
      experienciaEspecifica,
      experienciaPublica,
      experienciaGeneral
    }
  }
}
