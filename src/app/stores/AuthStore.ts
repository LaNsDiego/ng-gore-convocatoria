import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { DtoDecodedJWT } from "@/app/domain/dtos/DtoDecodedJWT";
import { UserEntity } from "@/app/domain/entities/UserEntity";


export type AuthState = {
  userAuthenticated : UserEntity | null,
  isAuthenticated : boolean,
  permissions : any[]
}

const initialState : AuthState = {
  userAuthenticated : {
    id : 0,
    name : '',
    email : '',
    constraint : '',
    email_verified_at : '',
    password : '',
    remember_token : '',
    created_at : '',
    updated_at : '',
    role_id : 0,
    executor_unit : '',
  },
  isAuthenticated : false,
  permissions : []
}


export const AuthStore = signalStore(
  { providedIn: 'root' },

  withState<AuthState>(initialState),
  withMethods(
    (
      state,
    ) => ({
      isLoggedIn() {
        const tokenJWT = this.getJWT()
        return (tokenJWT && tokenJWT.length > 0) ? true : false
      },
      saveJWT(JWT: string) {
        localStorage.setItem('JWT',JWT)
      },
      getJWT() {
        return localStorage.getItem('JWT')
      },
      removeJWT() {
        localStorage.removeItem('JWT')
      },
      setUserAuthenticated(user: UserEntity) {
        patchState(state,{ userAuthenticated: user })
      },
      setPermissions(permissions : any[]) {
        patchState(state,{ permissions  })
      },
      decodeJWT(JWT : string) {
        const payload = JWT.split('.')[1]
        const decoded = window.atob(payload)
        return JSON.parse(decoded) as DtoDecodedJWT

        // return {
        //   user : {
        //     id : 0,
        //     name : '',
        //     email : '',
        //     constraint : '',
        //     email_verified_at : '',
        //     password : '',
        //     remember_token : '',
        //     created_at : '',
        //     updated_at : '',
        //     role_id : 0,
        //   }
        // }
      },
      updateIsAuthenticated(isAuthenticated : boolean) {
        patchState(state,{ isAuthenticated })
      }
    })
  )
)
