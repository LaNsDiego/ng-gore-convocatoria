import { inject } from "@angular/core"
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"
import { DtoResponseWorkExperience } from "../domain/dtos/work-experience/DtoResponseWorkExperience"
import { WorkExperienceService } from "../services/work-experience.service"

export type WorkExperienceState = {
    isOpenCreate : boolean,
    isOpenEdit : boolean,
    entities : DtoResponseWorkExperience[]
    entityEdit : DtoResponseWorkExperience | null
}
const initialState : WorkExperienceState = {
    isOpenCreate : false,
    isOpenEdit : false,
    entities : [],
    entityEdit : null
}


export const WorkExperienceStore = signalStore(
    { providedIn: 'root' },
    withState<WorkExperienceState>(initialState),
    withMethods(
        (state,employeeService = inject(WorkExperienceService)) => ({
            openModalCreate(){
                patchState(state,{ isOpenCreate : true})
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
            doList(){
                employeeService.list().subscribe({
                    next : (entities) => {
                      console.log("employees",entities);

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
