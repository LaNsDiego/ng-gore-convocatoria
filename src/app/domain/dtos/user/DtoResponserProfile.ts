import { EmployeeEntity } from "../../entities/EmployeeEntity";
import { EstablishmentEntity } from "../../entities/EstablishmentEntity";
import { JobTitleEntity } from "../../entities/JobTitleEntity";
import { RoleEntity } from "../../entities/RoleEntity";
import { UserEntity } from "../../entities/UserEntity";

export type DtoResponseProfile = (UserEntity & { role : RoleEntity, 
    employees : (EmployeeEntity & { job_title: JobTitleEntity, establishment: EstablishmentEntity})[],  
})