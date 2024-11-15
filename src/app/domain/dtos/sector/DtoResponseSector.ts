import { SectorEntity } from "../../entities/SectorEntity";
import { SectorTypeEntity } from "../../entities/SectorTypeEntity";

export type DtoResponseSector = (SectorEntity & { sector_type : SectorTypeEntity } )
