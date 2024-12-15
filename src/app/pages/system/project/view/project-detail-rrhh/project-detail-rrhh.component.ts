import { ProjectDetailService } from '@/app/services/project-detail.service';
import { HelperStore } from '@/app/stores/HelpersStore';
import { ProjectStore } from '@/app/stores/ProjectStore';
import { getErrorByKey, getErrosOnControls } from '@/helpers';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';

@Component({
  selector: 'app-project-detail-rrhh',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    FloatLabelModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    KeyFilterModule,
    InputNumberModule,
    CommonModule
  ],
  templateUrl: './project-detail-rrhh.component.html',
  styleUrl: './project-detail-rrhh.component.css'
})
export class ProjectDetailRrhhComponent {

  projectStore = inject(ProjectStore)
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)
  projectDetailService = inject(ProjectDetailService)
  isSubmitting = signal(false)

  frmCreate = this.formBuilder.group({
    id : new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    amount_rrhh : new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    observation : new FormControl<string>('',{ validators : [] , nonNullable : true }),
  })

  constructor(){
    effect(()=> {
      const projectDetailReq = this.projectStore.projectDetailToEditRRHH()
      if(projectDetailReq){
        this.frmCreate.patchValue({
          id : projectDetailReq.id,
          amount_rrhh : projectDetailReq.amount_rrhh,
          observation : projectDetailReq.observation
        })
      }else{
        this.frmCreate.reset()
      }
    },{
      allowSignalWrites : true
    })
  }


  handleSubmit(){
    this.frmCreate.markAllAsTouched()
    if(this.frmCreate.status === 'VALID'){
      const values = this.frmCreate.getRawValue()
      this.projectDetailService.update(values)
      .subscribe({
        next : (response) => {
          console.log(response)
          this.projectStore.setProjectDetailToEditRRHH(null)
          this.frmCreate.reset()
          this.helperStore.showToast({severity : 'success', summary : 'Success', detail : response.message})
          this.projectStore.doListByProjectRequirement(this.projectStore.entityToView().id)
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

  getErrorMessage(controlName: string): string {
    const control = this.frmCreate.get(controlName as string)
    return getErrorByKey(controlName,control)
  }
}
