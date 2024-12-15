import { inject } from "@angular/core"
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"
import { AcademicTrainingService } from "../services/academic-training.service"
import { DtoResponseEmployee } from "../domain/dtos/employee/DtoResponseEmployee"
import { DtoResponseAcademicTraining } from "../domain/dtos/academic-training/DtoResponseAcademicTraining"

export type AcademicTrainingState = {
    isOpenCreate : boolean,
    isOpenEdit : boolean,
    entities : DtoResponseAcademicTraining[]
    entityEdit : DtoResponseAcademicTraining | null
    employeeToCreate : DtoResponseEmployee | null
}
const initialState : AcademicTrainingState = {
    isOpenCreate : false,
    isOpenEdit : false,
    entities : [],
    entityEdit : null,
    employeeToCreate : null
}


export const AcademicTrainingStore = signalStore(
    { providedIn: 'root' },
    withState<AcademicTrainingState>(initialState),
    withMethods(
        (state,employeeService = inject(AcademicTrainingService)) => ({
            openModalCreate(entity : DtoResponseEmployee){
                patchState(state,{ isOpenCreate : true , employeeToCreate : entity })
            },
            openModalEdit(entity : DtoResponseAcademicTraining){
                patchState(state,{ isOpenEdit : true , entityEdit : entity })
            },
            closeModalCreate(){
                patchState(state,{ isOpenCreate : false})
            },
            closeModalEdit(){
                patchState(state,{ isOpenEdit : false , entityEdit : null})
            },
            addEntity(entity : DtoResponseAcademicTraining){
                patchState(state,{ entities : [...state.entities(),entity]})
            },
            doListByEmployee(employee_id : number){
                employeeService.list(employee_id).subscribe({
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
