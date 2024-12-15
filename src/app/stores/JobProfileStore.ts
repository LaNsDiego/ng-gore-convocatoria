import { inject } from "@angular/core"
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"
import { JobProfileService } from "../services/job-profile.service"
import { DtoResponseJobProfile } from "../domain/dtos/job-profile/DtoResponseJobProfile"

export type JobProfileState = {
    isOpenCreate : boolean,
    isOpenEdit : boolean,
    entities : DtoResponseJobProfile[]
    entityEdit : DtoResponseJobProfile | null
}
const initialState : JobProfileState = {
    isOpenCreate : false,
    isOpenEdit : false,
    entities : [],
    entityEdit : null
}


export const JobProfileStore = signalStore(
    { providedIn: 'root' },
    withState<JobProfileState>(initialState),
    withMethods(
        (state,jobProfileService = inject(JobProfileService)) => ({
            openModalCreate(){
                patchState(state,{ isOpenCreate : true})
            },
            openModalEdit(entity : DtoResponseJobProfile){
                patchState(state,{ isOpenEdit : true , entityEdit : entity })
            },
            closeModalCreate(){
                patchState(state,{ isOpenCreate : false})
            },
            closeModalEdit(){
                patchState(state,{ isOpenEdit : false , entityEdit : null})
            },
            addEntity(entity : DtoResponseJobProfile){
                patchState(state,{ entities : [...state.entities(),entity]})
            },
            setEntityToEdit(entity : DtoResponseJobProfile|null){
                patchState(state,{ entityEdit : entity })
            },
            doList(){
                jobProfileService.list().subscribe({
                    next : (entities) => {
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
