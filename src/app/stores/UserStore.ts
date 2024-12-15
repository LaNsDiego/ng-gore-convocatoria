
import { DtoResponseUser } from "@/app/domain/dtos/user/DtoResponseUser"
import { DtoResponseUserList } from "@/app/domain/dtos/user/DtoResponseUserList"
import { inject } from "@angular/core"
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"
import { UserService } from "../services/user.service"

export type UserState = {
    isOpenCreate : boolean,
    isOpenEdit : boolean,
    entityEdit : DtoResponseUser | null,
    entities : DtoResponseUserList
}
const initialState : UserState = {
    isOpenCreate : false,
    isOpenEdit : false,
    entityEdit : null,
    entities : [],
}


export const UserStore = signalStore(
    { providedIn: 'root' },
    withState<UserState>(initialState),
    withMethods(
        (state,userService = inject(UserService)) => ({
            openModalCreate(){
                patchState(state,{ isOpenCreate : true})
            },
            openModalEdit(entity : DtoResponseUser){
                patchState(state,{ entityEdit : entity , isOpenEdit : true})
            },
            closeModalCreate(){
                patchState(state,{ isOpenCreate : false})
            },
            closeModalEdit(){
                patchState(state,{ isOpenEdit : false , entityEdit : null})
            },
            // addEntity(entity : DtoResponseUser){
            //     patchState(state,{ entities : [...state.entities(),entity]})
            // },
            doList(){
                userService.list().subscribe({
                    next : (entities) => {
                        patchState(state,{ entities })
                    },
                    error : (error) => {
                        console.log({error})
                    }
                })

            },
        })
    )
)
