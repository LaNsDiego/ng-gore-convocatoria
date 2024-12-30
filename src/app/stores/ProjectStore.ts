import { inject } from "@angular/core"
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"
import { ProjectService } from "../services/project.service"
import { DtoResponseProject } from "../domain/dtos/project/DtoResponseProject"
import { ProjectDetailService } from "../services/project-detail.service"

export type ProjectState = {
    isOpenCreate : boolean,
    isOpenEdit : boolean,
    entities : DtoResponseProject[]
    entityEdit : DtoResponseProject | null
    entityToView : any | null
    projectToAssign : any | null
    projectDetailToEditRRHH : any | null
    projectDetailToEdit : any | null
    requirementDetails : any[]
    balanceAmountAsSpecific : any
}
const initialState : ProjectState = {
    isOpenCreate : false,
    isOpenEdit : false,
    entities : [],
    entityEdit : null,
    entityToView : null,
    projectDetailToEditRRHH : null,
    projectToAssign : null,
    projectDetailToEdit : null,
    requirementDetails : [],
    balanceAmountAsSpecific : null
}


export const ProjectStore = signalStore(
    { providedIn: 'root' },
    withState<ProjectState>(initialState),
    withMethods(
        (
          state,projectService = inject(ProjectService),
          projectDetailService = inject(ProjectDetailService)
        ) => ({
            openModalCreate(){
                patchState(state,{ isOpenCreate : true})
            },
            closeModalCreate(){
                patchState(state,{ isOpenCreate : false})
            },
            openModalAssignation(projectToAssign : any){
                patchState(state,{ projectToAssign  })
            },
            closeModalAssignation(){
                patchState(state,{ projectToAssign : null})
            },
            openModalView(entityToView : any){
                patchState(state,{ entityToView })
            },
            closeModalView(){
                patchState(state,{ entityToView : null})
            },
            closeModalEdit(){
                patchState(state,{ isOpenEdit : false , entityEdit : null})
            },
            addEntity(entity : DtoResponseProject){
                patchState(state,{ entities : [...state.entities(),entity]})
            },
            openModalEdit(entity : DtoResponseProject){
              patchState(state,{ isOpenEdit : true , entityEdit : entity})
            },
            setProjectDetailToEditRRHH(projectDetail:any){
                patchState(state,{ projectDetailToEditRRHH : projectDetail})
            },
            setProjectDetailToEdit(projectDetail:any){
                patchState(state,{ projectDetailToEdit : projectDetail})
            },
            doList(){
                projectService.list().subscribe({
                    next : (response) => {
                      patchState(state,{ entities : response})
                    },
                    error : (error) => {
                        console.error(error)
                    }
                })
            },
            setEmployeeRequirements(requirementDetails : any[]){
                patchState(state,{ requirementDetails })
            },
            doListByProjectRequirement(project_requirement_id : number){
              projectDetailService.listByProjectRequirement(project_requirement_id).subscribe({
                next : (response) => {
                  patchState(state,{ requirementDetails : response})
                },
                error : (error) => {
                  console.error(error)
                }
              })
            },
            reset(){
              patchState(state,initialState)
            },
            doRealSaldo(){
              projectService.realSaldo({
                functional_sequence : state.entityToView().functional_sequence,
                specific_expenditure : state.entityToView().specific_expenditure
              }).subscribe({
                next : (response) => {
                  if(response != null || response.hasOwnProperty('amount_as_specified')){
                    patchState(state,{ balanceAmountAsSpecific : response.amount_as_specified })
                    // // this.frmCreate.controls.amount_as_specified.setValue(response.amount_as_specified)
                    // this.frmCreate.controls.balance_amount_as_specified.setValue(response.amount_as_specified)
                  }
                },
                error : (error) => {
                  console.error(error)
                  // this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
                }
              })
            }
        })
    )
)
