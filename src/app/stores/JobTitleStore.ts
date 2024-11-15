
import { DtoResponseJobTitle } from "@/app/domain/dtos/job-title/DtoResponseJobTitle"
import { DtoResponseJobTitleList } from "@/app/domain/dtos/job-title/DtoResponseJobTitleList"
import { JobTitleService } from "@/app/services/job-title.service"
import { inject } from "@angular/core"
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"

export type JobTitleState = {
    isOpenCreate : boolean,
    isOpenEdit : boolean,
    entities : DtoResponseJobTitleList
    entityEdit : DtoResponseJobTitle | null
}
const initialState : JobTitleState = {
    isOpenCreate : false,
    isOpenEdit : false,
    entities : [],
    entityEdit : null,
}


export const JobTitleStore = signalStore(
    { providedIn: 'root' },
    withState<JobTitleState>(initialState),
    withMethods(
        (state,jobtitleService = inject(JobTitleService)) => ({
            openModalCreate(){
                patchState(state,{ isOpenCreate : true})
            },
            closeModalCreate(){
                patchState(state,{ isOpenCreate : false})
            },
            closeModalEdit(){
                patchState(state,{ isOpenEdit : false , entityEdit : null})
            },
            addEntity(entity : DtoResponseJobTitle){
                patchState(state,{ entities : [...state.entities(),entity]})
            },
            openModalEdit(entity : DtoResponseJobTitle){
              patchState(state,{ isOpenEdit : true , entityEdit : entity})
            },
            doList(){
                jobtitleService.list().subscribe({
                    next : (response) => {
                            patchState(state,{ entities : response})
                    },
                    error : (error) => {
                        console.log({error})
                    }
                })
            }
        })
    )
)
