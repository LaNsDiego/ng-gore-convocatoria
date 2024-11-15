import { EmployeeEntity } from "../../entities/EmployeeEntity";
import { RoleEntity } from "../../entities/RoleEntity";
import { UserEntity } from "../../entities/UserEntity";

export type DtoResponseUser = (UserEntity & { role : RoleEntity, employees : EmployeeEntity[],  })
