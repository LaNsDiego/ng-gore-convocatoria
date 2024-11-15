
import { ConstructionEntity } from "../../entities/ConstructionEntity";
import { EmployeeEntity } from "../../entities/EmployeeEntity";
import { EstablishmentEntity } from "../../entities/EstablishmentEntity";
import { LocationEntity } from "../../entities/LocationEntity";

export type DtoResponseConstruction = (ConstructionEntity & { location : LocationEntity,resident : EmployeeEntity, establishment : EstablishmentEntity} )