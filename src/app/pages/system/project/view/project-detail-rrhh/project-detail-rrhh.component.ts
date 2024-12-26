import { ProjectDetailService } from '@/app/services/project-detail.service';
import { HelperStore } from '@/app/stores/HelpersStore';
import { ProjectStore } from '@/app/stores/ProjectStore';
import { getErrorByKey, getErrosOnControls } from '@/helpers';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
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

  saldo = input.required<number>()
  amountToRestore = signal(0)

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
        if(projectDetailReq.amount_rrhh == 0 ){
          this.amountToRestore.set(projectDetailReq.amount_required)
        }else{
          this.amountToRestore.set(projectDetailReq.amount_rrhh)
        }
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
      const differenceRresult = Number(this.saldo()) + Number(this.amountToRestore()) - this.frmCreate.controls.amount_rrhh.value
      console.log("differenceRresult",`${this.saldo()}  + ${this.amountToRestore()} - ${this.frmCreate.controls.amount_rrhh.value} = ${differenceRresult} ` );

      if( differenceRresult < 0){
        this.helperStore.showToast({severity : 'error', summary : 'Error', detail : `Saldo insuficiente. Excedente de ${differenceRresult * (-1)}`})
        return

      }

      this.projectDetailService.update(values)
      .subscribe({
        next : (response) => {
          console.log(response)
          this.projectStore.setProjectDetailToEditRRHH(null)
          this.frmCreate.reset()
          this.helperStore.showToast({severity : 'success', summary : 'Success', detail : response.message})
          this.projectStore.doRealSaldo()
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
