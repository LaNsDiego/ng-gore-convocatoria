import { EstablishmentEntity } from "../../entities/EstablishmentEntity";
import { KardexEntity } from "../../entities/KardexEntity";
import { ProductTypeEntity } from "../../entities/ProductTypeEntity";

;

export type DtoResponseKardex = (KardexEntity &  { product_type : ProductTypeEntity, establishment : EstablishmentEntity} )