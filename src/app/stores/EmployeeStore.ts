import { DtoResponseEmployee } from "@/app/domain/dtos/employee/DtoResponseEmployee"
import { DtoResponseEmployeeList } from "@/app/domain/dtos/employee/DtoResponseEmployeeList"
import { EmployeeService } from "@/app/services/employee.service"
import { inject } from "@angular/core"
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"

export type EmployeeState = {
    isOpenCreate : boolean,
    isOpenEdit : boolean,
    entities : DtoResponseEmployeeList
    entityEdit : DtoResponseEmployee | null
}
const initialState : EmployeeState = {
    isOpenCreate : false,
    isOpenEdit : false,
    entities : [],
    entityEdit : null
}


export const EmployeeStore = signalStore(
    { providedIn: 'root' },
    withState<EmployeeState>(initialState),
    withMethods(
        (state,employeeService = inject(EmployeeService)) => ({
            openModalCreate(){
                patchState(state,{ isOpenCreate : true})
            },
            openModalEdit(entity : DtoResponseEmployee){
                patchState(state,{ isOpenEdit : true , entityEdit : entity })
            },
            closeModalCreate(){
                patchState(state,{ isOpenCreate : false})
            },
            closeModalEdit(){
                patchState(state,{ isOpenEdit : false , entityEdit : null})
            },
            addEntity(entity : DtoResponseEmployee){
                patchState(state,{ entities : [...state.entities(),entity]})
            },
            doList(){
                employeeService.list().subscribe({
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
