import { JobTitleEntity } from '@/app/domain/entities/JobTitleEntity';
import { JobProfileService } from '@/app/services/job-profile.service';
import { JobTitleService } from '@/app/services/job-title.service';
import { HelperStore } from '@/app/stores/HelpersStore';
import { JobProfileStore } from '@/app/stores/JobProfileStore';
import { getErrorByKey, getErrosOnControls } from '@/helpers';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-job-profile-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    FloatLabelModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule
  ],
  templateUrl: './job-profile-edit.component.html',
  styleUrl: './job-profile-edit.component.css'
})
export class JobProfileEditComponent {
  jobProfileStore = inject(JobProfileStore)
  jobProfileService = inject(JobProfileService)
  jobTitleService = inject(JobTitleService)
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)


  jobTitles = signal<JobTitleEntity[]>([])
  statusOptions = signal<any[]>([
    { label : 'Activo' },
    { label : 'Inactivo' },
  ])

  frmCreate = this.formBuilder.group({
    id : new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    job_title_id : new FormControl<number|null>(null,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    request_name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    description : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    status : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
  })

  constructor() {
    this.jobTitleService.list().subscribe({
      next : (entities) => {
        this.jobTitles.set(entities)
      },
      error : (error) => {
        console.error(error)
      }
    })

    effect(() => {
      const entityToEdit = this.jobProfileStore.entityEdit()
      if(entityToEdit){
        console.log(entityToEdit);

        this.frmCreate.patchValue(entityToEdit)
        this.frmCreate.controls.job_title_id.setValue(Number(entityToEdit.job_title_id))

      }
    },{
      allowSignalWrites : true
    })
  }


  handleSubmit(){
    this.frmCreate.markAllAsTouched()
    if(this.frmCreate.status === 'VALID'){
      const values = this.frmCreate.getRawValue()
      this.jobProfileService.update(values)
      .subscribe({
        next : (response) => {
          this.jobProfileStore.closeModalEdit()
          this.frmCreate.reset()
          this.helperStore.showToast({severity : 'success', summary : 'Success', detail : response.message})
          this.jobProfileStore.doList()
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

  // FUNCTIONS VALIDATION
  getErrorMessageOnCreate(controlName: string): string {
    const control = this.frmCreate.get(controlName as string)
    return getErrorByKey(controlName,control)
  }
}
