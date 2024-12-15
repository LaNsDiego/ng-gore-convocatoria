import { JobProfileAssignedService } from '@/app/services/job-profile-assigned.service';
import { JobTitleService } from '@/app/services/job-title.service';
import { HelperStore } from '@/app/stores/HelpersStore';
import { JobProfileAssignedStore } from '@/app/stores/JobProfileAssignedStore';
import { getErrorByKey, getErrosOnControls, isEmptyObject } from '@/helpers';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-job-profile-assigned',
  standalone: true,
  imports: [
    DialogModule,
    FloatLabelModule,
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    CommonModule,
    CheckboxModule,
    FormsModule
  ],
  templateUrl: './job-profile-assigned.component.html',
  styleUrl: './job-profile-assigned.component.css'
})
export class JobProfileAssignedComponent {

  jobProfileAssignedStore = inject(JobProfileAssignedStore)
  jobProfileAssignedService = inject(JobProfileAssignedService)
  jobtitleService = inject(JobTitleService)
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)

  frmCreate = this.formBuilder.group({
    project_requirement_detail_id : new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    jobtitle_id : new FormControl<null|number>(null,{ validators : [Validators.required] , nonNullable : true }),
    // selected_options : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
  })

  isSubmitting = signal(false)

  jobtitles = signal<any[]>([])
  selectedOptions = signal<any[]>([])
  jobtitleSelected = signal<any>(null)


  constructor(){
    effect(()=>{
      const projectRequiementDetail = this.jobProfileAssignedStore.projectReqDetailToCreate()
      if(projectRequiementDetail){
        console.log("PROJECT REQUIREMENT DETAIL",projectRequiementDetail);
        this.frmCreate.controls.project_requirement_detail_id.setValue(projectRequiementDetail.id)
        this.jobProfileAssignedService.getOneByProjectReqDetail(projectRequiementDetail.id).subscribe({
          next : (response) => {
            console.log("getOneByProjectReqDetail",response)
            if(response == null || isEmptyObject(response)){
              this.selectedOptions.set([])
            }else{
              this.frmCreate.controls.jobtitle_id.setValue(response.job_title_id)
              console.log("SELECTED OPTIONS",JSON.parse(response.selected_profiles))
              this.selectedOptions.set(JSON.parse(response.selected_profiles).map((profileId : any) => Number(profileId)))
            }

          },
          error : (error) => {
            console.error(error)
          }
        })
      }else{
        this.frmCreate.reset()
      }
    },{
      allowSignalWrites : true
    })

    this.jobtitleService.listWithProfiles().subscribe({
      next : (response) => {
        console.log("PROFILES",response);

        this.jobtitles.set(response)
      },
      error : (error) => {
        console.error(error)
      }
    })

    this.frmCreate.controls.jobtitle_id.valueChanges.subscribe((value) => {
      const jobtitleId = Number(value)
      if(!isNaN(jobtitleId)){
        const jobtitle = this.jobtitles().find((jobtitle : any) => jobtitle.id === jobtitleId)
        console.log("JOB TITLE",jobtitle)
        this.jobtitleSelected.set(jobtitle)
      }else{
        this.jobtitleSelected.set(null)
      }
    })
  }

  onCloseModalCreate(a : boolean){
    this.jobProfileAssignedStore.closeModalCreate()
    this.frmCreate.reset()
  }

  onClickProfileOption(profile : any){
    console.log("PROFILE",profile)
    console.log("selectedOptions2",this.selectedOptions())

    if(this.selectedOptions().includes(profile.id)){
      const newSelectedOptions = this.selectedOptions().filter((id : any) => id !== profile.id)
      this.selectedOptions.set(newSelectedOptions)
    }else{
      this.selectedOptions.update(prev => [...prev,profile.id])
    }
  }

  handleSubmit(){
    this.frmCreate.markAllAsTouched()
    if(this.frmCreate.status === 'VALID'){
      const values = this.frmCreate.getRawValue()
      console.log("VALUES",this.selectedOptions());

      this.jobProfileAssignedService.store({...values,selected_profiles : this.selectedOptions()})
      .subscribe({
        next : (response) => {
          console.log(response)
          this.jobProfileAssignedStore.closeModalCreate()
          this.frmCreate.reset()
          this.helperStore.showToast({severity : 'success', summary : 'Success', detail : response.message})
          // this.jobProfileAssignedStore.doList()
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
