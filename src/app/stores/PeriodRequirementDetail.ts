import { inject } from "@angular/core"
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"
import { PeriodRequirementDetailService } from "../service/period-requirement-detail.service"

export type ProjectRequirementDetailState = {
    isOpenCreate : boolean,
    isOpenEdit : boolean,
    entities : any[]
    entityEdit : any | null
    projectReqDetailToCrud : any | null
}
const initialState : ProjectRequirementDetailState = {
    isOpenCreate : false,
    isOpenEdit : false,
    entities : [],
    entityEdit : null,
    projectReqDetailToCrud : null
}


export const PeriodRequirementDetailStore = signalStore(
    { providedIn: 'root' },
    withState<ProjectRequirementDetailState>(initialState),
    withMethods(
        (state,periodRequirementDetailService = inject(PeriodRequirementDetailService)) => ({
          openModalCrud(entity : any){
                patchState(state,{ projectReqDetailToCrud : entity })
            },
            closeModalCrud(){
                patchState(state,{ projectReqDetailToCrud : null})
            },
            doList(projectReqDetailId : number){
                periodRequirementDetailService.list(projectReqDetailId).subscribe({
                    next : (entities) => {
                      // console.log("PERIODS",entities);

                      patchState(state,{ entities })
                    },
                    error : (error) => {
                        console.error(error)
                    }
                })
            }
        })
    )
)
