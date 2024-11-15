import { DtoJobTitleCreate } from '@/app/domain/dtos/job-title/DtoJobTitleCreate';
import { JobTitleService } from '@/app/services/job-title.service';
import { HelperStore } from '@/app/stores/HelpersStore';
import { JobTitleStore } from '@/app/stores/JobTitleStore';
import { getErrorByKey } from '@/helpers';

import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-job-title-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,DialogModule,FloatLabelModule,ButtonModule,InputTextModule
  ],
  templateUrl: './job-title-create.component.html',
  styleUrl: './job-title-create.component.css'
})
export class JobTitleCreateComponent {
  jobTitleStore = inject(JobTitleStore)
  jobTitleService = inject(JobTitleService)
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)
  frmCreate = this.formBuilder.group({
    name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
  })

  onCloseModalCreate(a : boolean){
    this.jobTitleStore.closeModalCreate()
    this.frmCreate.reset()
  }

  handleSubmit(){
    this.frmCreate.markAllAsTouched()
    if(this.frmCreate.status === 'VALID'){
      const values = this.frmCreate.getRawValue()
      this.jobTitleService.store(values as DtoJobTitleCreate)
      .subscribe({
        next : (response) => {
          console.log({ response})
          this.jobTitleStore.closeModalCreate()
          this.frmCreate.reset()
          this.helperStore.showToast({severity : 'success', summary : 'Success', detail : 'JobTitle Service created successfully'})
          this.jobTitleStore.addEntity(response.created)
        },
        error : (error) => {
          console.log({error})
        }

      })
    }else{
      console.log(this.frmCreate)
      console.log(
        Object.keys(this.frmCreate.controls)
      .map((field ) => ({field,errors : this.frmCreate.get(field)?.errors , status : this.frmCreate.get(field)?.status}))
      )
    }

  }

  // FUNCTIONS VALIDATION
  getErrorMessageOnCreate(controlName: string): string {
    const control = this.frmCreate.get(controlName as string)
    return getErrorByKey(controlName,control)
  }

}

