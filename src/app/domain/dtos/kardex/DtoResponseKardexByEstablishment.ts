import { BrandEntity } from "../../entities/BrandEntity";
import { DetailKardexEntity } from "../../entities/DetailKardexEntity";
import { EstablishmentEntity } from "../../entities/EstablishmentEntity";
import { KardexEntity } from "../../entities/KardexEntity";
import { MovementTypeEntity } from "../../entities/MovementTypeEntity";
import { ProductEntity } from "../../entities/ProductEntity";
import { ProductTypeEntity } from "../../entities/ProductTypeEntity";

export type DtoResponseKardexByEstablishment = (KardexEntity &
  {
    product_type : ProductTypeEntity &
    { brand : BrandEntity}
  } &
  {
    detail_kardex_count:number ,
    detail_kardex : (
        DetailKardexEntity &
        {
          product : ProductEntity,
          movement_type : MovementTypeEntity,
          establishment : EstablishmentEntity,
        }
    )[]
  }
)
