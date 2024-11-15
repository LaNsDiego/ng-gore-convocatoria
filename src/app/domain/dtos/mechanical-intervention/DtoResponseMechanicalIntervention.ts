import { MechanicalInterventionEntity } from "../../entities/MechanicalInterventionEntity";
import { ProductEntity } from "../../entities/ProductEntity";

export type DtoResponseMechanicalIntervention = (MechanicalInterventionEntity & { vehicle : ProductEntity})
