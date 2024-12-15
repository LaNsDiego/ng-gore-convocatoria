import { inject } from "@angular/core"
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"
import { DtoResponseTraining } from "../domain/dtos/training/DtoResponseTraining"
import { TrainingService } from "../services/training.service"
import { DtoResponseEmployee } from "../domain/dtos/employee/DtoResponseEmployee"

export type TrainingState = {
    isOpenCreate : boolean,
    isOpenEdit : boolean,
    entities : DtoResponseTraining[]
    entityEdit : DtoResponseTraining | null
    employeeToCreate : DtoResponseEmployee | null
}
const initialState : TrainingState = {
    isOpenCreate : false,
    isOpenEdit : false,
    entities : [],
    entityEdit : null,
    employeeToCreate : null
}


export const TrainingStore = signalStore(
    { providedIn: 'root' },
    withState<TrainingState>(initialState),
    withMethods(
        (state,trainingService = inject(TrainingService)) => ({
            openModalCreate(entity : DtoResponseEmployee){
                patchState(state,{ isOpenCreate : true , employeeToCreate : entity })
            },
            openModalEdit(entity : DtoResponseTraining){
                patchState(state,{ isOpenEdit : true , entityEdit : entity })
            },
            closeModalCreate(){
                patchState(state,{ isOpenCreate : false  , employeeToCreate : null})
            },
            closeModalEdit(){
                patchState(state,{ isOpenEdit : false , entityEdit : null})
            },
            addEntity(entity : DtoResponseTraining){
                patchState(state,{ entities : [...state.entities(),entity]})
            },
            doListByTraining(training_id : number){
                trainingService.list(training_id).subscribe({
                    next : (entities) => {
                      console.log("trainings",entities);

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
