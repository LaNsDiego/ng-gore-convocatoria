import { EmployeeEntity } from "../entities/EmployeeEntity"
import { UserEntity } from "../entities/UserEntity"

export type DtoDecodedJWT = {
    iss: string
    iat: number
    exp: number
    nbf: number
    jti: string
    sub: string
    prv: string
    user: UserEntity & { employees: EmployeeEntity[] }
}
