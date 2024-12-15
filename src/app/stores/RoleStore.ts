

import { DtoResponsedRole } from "@/app/domain/dtos/role/DtoResponsedRole"
import { DtoResponsedRoleList } from "@/app/domain/dtos/role/DtoResponsedRoleList"
import { RoleService } from "@/app/services/role.service"
import { inject } from "@angular/core"
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"

export type dRoleState = {
    isOpenCreate : boolean,
    isOpenEdit : boolean,
    isSubmitting : boolean,
    entityEdit : DtoResponsedRole | null,
    selectedEntity : DtoResponsedRole | null,
    entities : DtoResponsedRoleList
}
const initialState : dRoleState = {
    isOpenCreate : false,
    isOpenEdit : false,
    isSubmitting : false,
    entityEdit : null,
    selectedEntity : null,
    entities : [],
}


export const RoleStore = signalStore(
    { providedIn: 'root' },
    withState<dRoleState>(initialState),
    withMethods(
        (state,roleService = inject(RoleService)) => ({
            openModalCreate(){
                patchState(state,{ isOpenCreate : true})
            },
            openModalEdit(entity : DtoResponsedRole){
                patchState(state,{ entityEdit : entity , isOpenEdit : true})
            },
            closeModalCreate(){
                patchState(state,{ isOpenCreate : false})
            },
            closeModalEdit(){
                patchState(state,{ isOpenEdit : false , entityEdit : null})
            },
            setSubmitting(isSubmitting : boolean){
                patchState(state,{ isSubmitting })

            },
            doList(){
                roleService.list().subscribe({
                    next : (entities) => {
                        patchState(state,{ entities })
                    },
                    error : (error) => {
                        console.log({error})
                    }
                })

            },
            selectRole(role : DtoResponsedRole | null){
              patchState(state,{ selectedEntity : role})
            }
        })
    )
)
