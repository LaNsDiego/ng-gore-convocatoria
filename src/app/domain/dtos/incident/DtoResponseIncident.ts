import { IncidentEntity } from "../../entities/IncidentEntity";
import { IncidentPhotoEntity } from "../../entities/IncidentPhotoEntity";
import { DtoResponseProduct } from "../product/DtoResponseProduct";

export type DtoResponseIncident = IncidentEntity & { photos : IncidentPhotoEntity[] , vehicle : DtoResponseProduct }
