import { inject } from "@angular/core"
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"
import { ProjectService } from "../services/project.service"
import { DtoResponseProject } from "../domain/dtos/project/DtoResponseProject"

export type ProjectState = {
    isOpenCreate : boolean,
    isOpenEdit : boolean,
    entities : DtoResponseProject[]
    entityEdit : DtoResponseProject | null
}
const initialState : ProjectState = {
    isOpenCreate : false,
    isOpenEdit : false,
    entities : [],
    entityEdit : null,
}


export const ProjectStore = signalStore(
    { providedIn: 'root' },
    withState<ProjectState>(initialState),
    withMethods(
        (state,projectService = inject(ProjectService)) => ({
            openModalCreate(){
                patchState(state,{ isOpenCreate : true})
            },
            closeModalCreate(){
                patchState(state,{ isOpenCreate : false})
            },
            closeModalEdit(){
                patchState(state,{ isOpenEdit : false , entityEdit : null})
            },
            addEntity(entity : DtoResponseProject){
                patchState(state,{ entities : [...state.entities(),entity]})
            },
            openModalEdit(entity : DtoResponseProject){
              patchState(state,{ isOpenEdit : true , entityEdit : entity})
            },
            doList(){
                projectService.list().subscribe({
                    next : (response) => {
                            patchState(state,{ entities : response})
                    },
                    error : (error) => {
                        console.error(error)
                    }
                })
            }
        })
    )
)
