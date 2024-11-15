import { RoleEntity } from "../entities/RoleEntity"

export type DtoResponseJWT = {
  access_token : string
  token_type : string
  expires_in : number
  role : RoleEntity & { permissions : any[]}
}
