import { PeriodRequirementDetailService } from '@/app/service/period-requirement-detail.service';
import { HelperStore } from '@/app/stores/HelpersStore';
import { PeriodRequirementDetailStore } from '@/app/stores/PeriodRequirementDetail';
import { getErrorByKey, getErrosOnControls, getMonthNameFromDDMMYY } from '@/helpers';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-period-req-detail',
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
        CommonModule,
        TableModule,
        DropdownModule,
        CalendarModule,
        InputTextareaModule,
        TooltipModule
  ],
  templateUrl: './period-req-detail.component.html',
  styleUrl: './period-req-detail.component.css'
})
export class PeriodReqDetailComponent {

  periodRequirementDetailStore = inject(PeriodRequirementDetailStore)
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)
  periodRequirementDetailService = inject(PeriodRequirementDetailService)
  isSubmitting = signal(false)

  amountToRestore = signal(0)
  monthNames = signal([
    {label : 'Enero'},
    {label : 'Febrero'},
    {label : 'Marzo'},
    {label : 'Abril'},
    {label : 'Mayo'},
    {label : 'Junio'},
    {label : 'Julio'},
    {label : 'Agosto'},
    {label : 'Septiembre'},
    {label : 'Octubre'},
    {label : 'Noviembre'},
    {label : 'Diciembre'},
  ])

  years = signal([
    {label : 2021},
    {label : 2022},
    {label : 2023},
    {label : 2024},
    {label : 2025},
    {label : 2026},
    {label : 2027},
    {label : 2028},
    {label : 2029},
    {label : 2030},
  ])

  frmCreate = this.formBuilder.group({
    project_requirement_detail_id : new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    year : new FormControl<number|null>(null,{ validators : [Validators.required] , nonNullable : true }),
    start_date : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    end_date : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    start_month_name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    end_month_name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    observation : new FormControl<string>('',{ validators : [] , nonNullable : true }),
  })


  constructor(){

    this.frmCreate.controls.start_date.valueChanges.subscribe((value)=>{

      if(value){
        this.frmCreate.controls.start_month_name.setValue(getMonthNameFromDDMMYY(value))
      }
    })
    this.frmCreate.controls.end_date.valueChanges.subscribe((value)=>{

      if(value){
        this.frmCreate.controls.end_month_name.setValue(getMonthNameFromDDMMYY(value))
      }
    })

    effect(()=> {
      const projectDetailReq = this.periodRequirementDetailStore.projectReqDetailToCrud()
      if(projectDetailReq){

        this.frmCreate.patchValue({
          project_requirement_detail_id : projectDetailReq.id
        })

        this.periodRequirementDetailStore.doList(projectDetailReq.id)

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
      this.periodRequirementDetailService.store(values)
      .subscribe({
        next : (response) => {
          const projectDetailReq = this.periodRequirementDetailStore.projectReqDetailToCrud()
          this.periodRequirementDetailStore.doList(projectDetailReq.id)
          this.helperStore.showToast({severity : 'success', summary : 'Success', detail : response.message})
          this.frmCreate.reset()
          this.frmCreate.controls.project_requirement_detail_id.setValue(projectDetailReq.id)
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

  onDelete(row : any){
    console.log("delete",row);
    this.periodRequirementDetailService.delete(row.id).subscribe({
      next : (response) => {
        const projectDetailReq = this.periodRequirementDetailStore.projectReqDetailToCrud()
        this.periodRequirementDetailStore.doList(projectDetailReq.id)

        this.helperStore.showToast({severity : 'success', summary : 'Success', detail : response.message})
      },
      error : (error) => {
        console.error(error)
        this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
      }
    })
  }

  getErrorMessage(controlName: string): string {
    const control = this.frmCreate.get(controlName as string)
    return getErrorByKey(controlName,control)
  }
}
