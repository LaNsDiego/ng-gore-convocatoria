import { WorkExperienceService } from '@/app/services/work-experience.service';
import { HelperStore } from '@/app/stores/HelpersStore';
import { WorkExperienceStore } from '@/app/stores/WorkExperienceStore';
import { calcularExperienciaTotal, emptyFile, getErrorByKey, getErrosOnControls } from '@/helpers';
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
  selector: 'app-work-experience-edit',
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
  templateUrl: './work-experience-edit.component.html',
  styleUrl: './work-experience-edit.component.css'
})
export class WorkExperienceEditComponent {
workExperienceStore = inject(WorkExperienceStore)
  workExperienceService = inject(WorkExperienceService)
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)
  frmEdit = this.formBuilder.group({
    id : new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    employee_id : new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    sector : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    experience_type : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    entity : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    job_title : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    functions_performed : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    start_date : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : false}),
    end_date : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : false}),
    document_name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : false}),
    file : new FormControl<File|null>(null,{ validators : [] , nonNullable : true }),
  })


  isSubmitting = signal(false)
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
      const workExperience = this.workExperienceStore.entityEdit()
      if(workExperience){
        // this.frmEdit.controls.employee_id.setValue(employee.id)
        this.frmEdit.patchValue({
          ...workExperience,
          file : emptyFile(workExperience.full_path_file)
        })
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
      console.log(this.frmEdit.value)
      const values = this.frmEdit.getRawValue()
      this.isSubmitting.set(true)
      this.workExperienceService.update(values as any)
      .subscribe({
        next : (response) => {
          this.isSubmitting.set(false)
          this.workExperienceStore.doListByEmployee({
            employee_id : this.frmEdit.controls.employee_id.value,
            callback : (r) => this.workExperienceStore.setCalculatedExperience(this.calcularExperiencia(r))
          })
          this.workExperienceStore.closeModalEdit()
          this.frmEdit.reset()
          this.helperStore.showToast({severity : 'success', summary : 'Exito', detail : response.message})
          console.log(response)
        },
        error : (error) => {
          this.isSubmitting.set(false)
          this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
          console.error(error)
        }

      })
    }else{
      console.warn(getErrosOnControls(this.frmEdit))
    }

  }

  onSelectFile(event : any){
    const [selectedFile] = event.currentFiles
    this.frmEdit.controls.file.setValue(selectedFile)
  }

  // FUNCTIONS VALIDATION
  getErrorMessage(controlName: string): string {
    const control = this.frmEdit.get(controlName as string)
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
