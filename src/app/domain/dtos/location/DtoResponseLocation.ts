import { LocationEntity } from "../../entities/LocationEntity";
import { SectorEntity } from "../../entities/SectorEntity";

export type DtoResponseLocation = (LocationEntity & { sector : SectorEntity })
