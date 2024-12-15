import { inject } from "@angular/core"
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"
import { DtoResponseWorkExperience } from "../domain/dtos/work-experience/DtoResponseWorkExperience"
import { WorkExperienceService } from "../services/work-experience.service"
import { DtoResponseEmployee } from "../domain/dtos/employee/DtoResponseEmployee"

export type WorkExperienceState = {
    isOpenCreate : boolean,
    isOpenEdit : boolean,
    entities : DtoResponseWorkExperience[]
    entityEdit : DtoResponseWorkExperience | null
    employeeToCreate : DtoResponseEmployee | null
    calculatedExperience : any| null
}
const initialState : WorkExperienceState = {
    isOpenCreate : false,
    isOpenEdit : false,
    entities : [],
    entityEdit : null,
    employeeToCreate : null,
    calculatedExperience : null
}


export const WorkExperienceStore = signalStore(
    { providedIn: 'root' },
    withState<WorkExperienceState>(initialState),
    withMethods(
        (state,employeeService = inject(WorkExperienceService)) => ({
            openModalCreate(entity : DtoResponseEmployee){
                patchState(state,{ isOpenCreate : true , employeeToCreate : entity })
            },
            openModalEdit(entity : DtoResponseWorkExperience){
                patchState(state,{ isOpenEdit : true , entityEdit : entity })
            },
            closeModalCreate(){
                patchState(state,{ isOpenCreate : false})
            },
            closeModalEdit(){
                patchState(state,{ isOpenEdit : false , entityEdit : null})
            },
            addEntity(entity : DtoResponseWorkExperience){
                patchState(state,{ entities : [...state.entities(),entity]})
            },
            setCalculatedExperience(calculatedExperience : any){
              patchState(state,{ calculatedExperience })
            },
            doListByEmployee(
              {employee_id , callback } :
              {employee_id : number , callback?: (result: any) => any }
            ){
                employeeService.list(employee_id).subscribe({
                    next : (entities) => {
                      if(callback){
                        callback(entities)
                      }
                      patchState(state,{ entities })
                    },
                    error : (error) => {
                        console.log({error})
                    }
                })
            }
        })
    )
)
