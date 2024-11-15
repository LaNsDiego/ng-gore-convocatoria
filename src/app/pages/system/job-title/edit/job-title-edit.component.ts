import { DtoJobTitleEdit } from '@/app/domain/dtos/job-title/DtoJobTitleEdit';
import { JobTitleEntity } from '@/app/domain/entities/JobTitleEntity';
import { JobTitleService } from '@/app/services/job-title.service';
import { HelperStore } from '@/app/stores/HelpersStore';
import { JobTitleStore } from '@/app/stores/JobTitleStore';
import { getErrorByKey } from '@/helpers';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-job-title-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,CommonModule,DialogModule,FloatLabelModule,InputTextModule,ButtonModule
  ],
  templateUrl: './job-title-edit.component.html',
  styleUrl: './job-title-edit.component.css'
})
export class JobTitleEditComponent {
  jobtitleStore = inject(JobTitleStore)
  jobtitleService = inject(JobTitleService)
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)
  uploadedFiles: any[] = [];

  frmEdit  = this.formBuilder.group({
    id : new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true} ),
    name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),

  })

  jobtitles = signal<JobTitleEntity[]>([])

  constructor() {

    effect(async () => {
      const entityEdit = this.jobtitleStore.entityEdit()
      console.log(`updated entity edit`,entityEdit);
      if(entityEdit != null){
        this.frmEdit.patchValue(entityEdit)
      }
    },{
      allowSignalWrites : true
    });

  }


  ngAfterViewInit(){
    const entityEdit = this.jobtitleStore.entityEdit()
    if( entityEdit != null){
      console.log("after",entityEdit);
      this.frmEdit.patchValue(entityEdit)
    }else{
      console.warn("entityEdit is null",entityEdit)
    }
  }


  onCloseModal(a : boolean){
    this.jobtitleStore.closeModalEdit()
    this.frmEdit.reset()
  }

  handleSubmit(){
    // this.frmEdit.controls['status'].setValue('USADO')
    this.frmEdit.markAllAsTouched()
    console.log(this.frmEdit.getRawValue())
    if(this.frmEdit.status === 'VALID'){
      const values = this.frmEdit.getRawValue()
      this.jobtitleService.update(values as DtoJobTitleEdit)
      .subscribe({
        next : (response) => {
          console.log({response})
          this.jobtitleStore.closeModalEdit()
          this.frmEdit.reset()
          this.helperStore.showToast({severity : 'success', summary : 'Success', detail : 'JobTitle Service created successfully'})
          this.jobtitleStore.doList()
        },
        error : (error) => {
          console.log({error})
        }

      })
    }else{
      console.log(this.frmEdit)
      console.log(
        Object.keys(this.frmEdit.controls)
      .map((field ) => ({field,errors : this.frmEdit.get(field)?.errors , status : this.frmEdit.get(field)?.status}))
      )
    }

  }

  onShowModalCreate(event : any){
    console.log({event})
  }

  listJobTitles(){
    return this.jobtitleService.list()
  }

  // FUNCTIONS VALIDATION
  getErrorMessage(controlName: string): string {
    const control = this.frmEdit.get(controlName as string)
    return getErrorByKey(controlName,control)
  }
}
