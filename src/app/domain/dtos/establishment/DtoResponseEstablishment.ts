import { EmployeeEntity } from "../../entities/EmployeeEntity";
import { EstablishmentEntity } from "../../entities/EstablishmentEntity";
import { LocationEntity } from "../../entities/LocationEntity";

export type DtoResponseEstablishment = (EstablishmentEntity  &  { employees_count: number, establishment : EstablishmentEntity, parent : EstablishmentEntity, location : LocationEntity, responsible : EmployeeEntity, children_recursive?: DtoResponseEstablishment[] } )
