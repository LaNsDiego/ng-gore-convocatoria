import { DtoJobTitleCreate } from '@/app/domain/dtos/job-title/DtoJobTitleCreate';
import { JobTitleService } from '@/app/services/job-title.service';
import { HelperStore } from '@/app/stores/HelpersStore';
import { JobTitleStore } from '@/app/stores/JobTitleStore';
import { getErrorByKey } from '@/helpers';

import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-job-title-create',
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
  templateUrl: './job-title-create.component.html',
  styleUrl: './job-title-create.component.css'
})
export class JobTitleCreateComponent {
  jobTitleStore = inject(JobTitleStore)
  jobTitleService = inject(JobTitleService)
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)


  statusOptions = signal<any[]>([
    { label : 'Activo' },
    { label : 'Inactivo' },
  ])

  frmCreate = this.formBuilder.group({
    code : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    status : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    observation : new FormControl<string>('',{ validators : [] , nonNullable : true }),
  })

  constructor(){
    effect(() => {
      const isOpen = this.jobTitleStore.isOpenCreate()
      if(isOpen){
        this.jobTitleService.nextCode().subscribe({
          next : (generatedCode) => {
            this.frmCreate.controls.code.setValue(generatedCode)
          },
          error : (err) => {
            console.error(err)
          }
        })
      }
    },{
      allowSignalWrites : true
    })
  }

  onCloseModalCreate(a : boolean){
    this.jobTitleStore.closeModalCreate()
    this.frmCreate.reset()
  }

  handleSubmit(){
    this.frmCreate.markAllAsTouched()
    if(this.frmCreate.status === 'VALID'){
      const values = this.frmCreate.getRawValue()
      this.jobTitleService.store(values)
      .subscribe({
        next : (response) => {
          console.log(response)
          this.jobTitleStore.closeModalCreate()
          this.frmCreate.reset()
          this.helperStore.showToast({severity : 'success', summary : 'Success', detail : response.message})
          this.jobTitleStore.doList()
        },
        error : (error) => {
          console.error(error)
          this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
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

