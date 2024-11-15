import { BrandEntity } from "../../entities/BrandEntity";
import { MeasurementUnitEntity } from "../../entities/MeasurementUnitEntity";
import { ProductEntity } from "../../entities/ProductEntity";
import { ProductTypeEntity } from "../../entities/ProductTypeEntity";

export type DtoResponseProductType = (ProductTypeEntity & { brand :  BrandEntity, measurement_unit :  MeasurementUnitEntity, product_without_serie: ProductEntity})