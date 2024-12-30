import { PersonService } from '@/app/services/person.service';
import { ProjectService } from '@/app/services/project.service';
import { HelperStore } from '@/app/stores/HelpersStore';
import { ProjectStore } from '@/app/stores/ProjectStore';
import { getErrosOnControls } from '@/helpers';
import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DragDropModule } from 'primeng/dragdrop';
import { PickListModule, PickListMoveAllToSourceEvent, PickListMoveAllToTargetEvent, PickListMoveToSourceEvent, PickListMoveToTargetEvent } from 'primeng/picklist';
import { UserService } from '@/app/services/user.service';
import { CommonModule } from '@angular/common';
import { ProjectAssignationService } from '@/app/services/project-assignation.service';

@Component({
  selector: 'app-assignation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    FloatLabelModule,
    ButtonModule,
    InputTextModule,
    PickListModule,
    DragDropModule,
    CommonModule
  ],
  templateUrl: './project-assignation.component.html',
  styleUrl: './project-assignation.component.css'
})
export class ProjectAssignationComponent {
  projectStore = inject(ProjectStore)
  projectAssignationService = inject(ProjectAssignationService)
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)
  personService = inject(PersonService)
  userService = inject(UserService)

  frmCreate = this.formBuilder.group({
    project_requirement_id : new FormControl<number>(0,{ validators : [Validators.required ,Validators.min(1)] , nonNullable : true }),
    assignations : new FormControl<any[]>([],{ validators : [Validators.required] , nonNullable : true }),
  })

  userAssigned  : any[] = []
  userNotAssigned : any[] = []


  constructor(){

    effect(() => {
      const projectToAssign = this.projectStore.projectToAssign()
      if(projectToAssign){

        this.projectAssignationService.list(projectToAssign.id).subscribe({
          next : (response) => {
            this.userAssigned = response.map( u => ({
              user_id : u.user_id ,
              name : u.user.name ,
              id : u.id ,
              project_requeriment_id : u.project_requeriment_id
            }))
            console.log("ASSIGNED",this.userAssigned);

          },
          error : (error) => {
            console.error(error)
          }
        })
        this.projectAssignationService.userList(projectToAssign.id).subscribe({
          next : (response) => {
            this.userNotAssigned = response
            // this.userNotAssigned = response.map( u => ({
            //   user_id : u.id ,
            //   name : u.name ,
            //   id : 0 ,
            //   project_requeriment_id : projectToAssign.id
            // }))
            console.log("NOT ASIGGNED",this.userNotAssigned);
          },
          error : (error) => {
            console.error(error)
          }
        })



        this.frmCreate.patchValue({ project_requirement_id : projectToAssign.id })
      }else{
        this.frmCreate.reset()
      }
    },{
      allowSignalWrites : true
    })

  }


  onMoveToNotAssigned(event : PickListMoveToSourceEvent){
    console.log("onMoveToNotAssigned",event.items);
    this.projectAssignationService.delete(event.items).subscribe({
      next : (response) => {
        this.helperStore.showToast({severity : 'success', summary : 'Success', detail : response.message})
      },
      error : (error) => {
        console.error(error)
        this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
      }
    })
    // this.projectAssignationService.delete(event.items)
  }

  onMoveToAssigned(event : PickListMoveToTargetEvent){
    this.projectAssignationService.store(event.items).subscribe({
      next : (response) => {
        this.helperStore.showToast({severity : 'success', summary : 'Success', detail : response.message})
      },
      error : (error) => {
        console.error(error)
        this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
      }
    })
  }

  onMoveAllToNotAssigned(event : PickListMoveAllToSourceEvent){
    // console.log("onMoveAllToNotAssigned",event.items);
    this.projectAssignationService.delete(event.items).subscribe({
      next : (response) => {
        this.helperStore.showToast({severity : 'success', summary : 'Success', detail : response.message})
      },
      error : (error) => {
        console.error(error)
        this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
      }
    })
  }

  onMoveAllToAssigned(event : PickListMoveAllToTargetEvent){
    // console.log("onMoveAllToAssigned",event.items);
    this.projectAssignationService.store(event.items).subscribe({
      next : (response) => {
        this.helperStore.showToast({severity : 'success', summary : 'Success', detail : response.message})
      },
      error : (error) => {
        console.error(error)
        this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
      }
    })
  }

  // handleSubmit(){
  //   this.frmCreate.markAllAsTouched()
  //   if(this.frmCreate.status === 'VALID'){
  //     const values = this.frmCreate.getRawValue()
  //     this.projectService.store(values)
  //     .subscribe({
  //       next : (response) => {
  //         console.log(response)
  //         this.projectStore.closeModalCreate()
  //         this.frmCreate.reset()
  //         this.helperStore.showToast({severity : 'success', summary : 'Success', detail : response.message})
  //         this.projectStore.doList()
  //       },
  //       error : (error) => {
  //         console.error(error)
  //         this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
  //       }

  //     })
  //   }else{
  //     console.warn(getErrosOnControls(this.frmCreate))
  //   }

  // }

}
