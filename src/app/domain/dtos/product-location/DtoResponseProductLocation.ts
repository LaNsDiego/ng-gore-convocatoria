
import { LocationEntity } from "../../entities/LocationEntity";
import { LocationTypeEntity } from "../../entities/LocationTypeEntity";
import { ProductEntity } from "../../entities/ProductEntity";
import { ProductLocationEntity } from "../../entities/ProductLocationEntity";

export type DtoResponseProductLocation = (ProductLocationEntity &  { product : ProductEntity, location : (LocationEntity & {location_type : LocationTypeEntity})} )