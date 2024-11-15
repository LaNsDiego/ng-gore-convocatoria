import { EmployeeEntity } from "../../entities/EmployeeEntity";
import { EstablishmentEntity } from "../../entities/EstablishmentEntity";
import { EstablishmentTypeEntity } from "../../entities/EstablishmentTypeEntity";

export type DtoResponseEstablishmentWithKardex = (EstablishmentEntity &  {kardex_count:number, establishment_type : EstablishmentTypeEntity, responsible : EmployeeEntity } )
