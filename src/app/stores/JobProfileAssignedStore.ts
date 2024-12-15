import { inject } from "@angular/core"
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"
import { DtoResponseEmployee } from "../domain/dtos/employee/DtoResponseEmployee"
import { DtoResponseJobProfile } from "../domain/dtos/job-profile/DtoResponseJobProfile"
import { JobProfileService } from "../services/job-profile.service"


export type JobProfileAssignedState = {
    projectReqDetailToCreate : any|null,
    entities : DtoResponseJobProfile[]
}
const initialState : JobProfileAssignedState = {
  projectReqDetailToCreate : null,
    entities : [],
}


export const JobProfileAssignedStore = signalStore(
    { providedIn: 'root' },
    withState<JobProfileAssignedState>(initialState),
    withMethods(
        (
          state,
          jobProfileService = inject(JobProfileService),
          // jobProfileAssigned = inject(JobProfileService),

        ) => ({
            openModalCreate(projectRequirementToCreate : any){
                patchState(state,{ projectReqDetailToCreate: projectRequirementToCreate })
            },
            closeModalCreate(){
                patchState(state,{ projectReqDetailToCreate : null})
            },

        })
    )
)
