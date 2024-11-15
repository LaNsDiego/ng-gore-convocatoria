import { AllocationProductDetailEntity } from "../../entities/AllocationProductDetailEntity";
import { MeasurementUnitEntity } from "../../entities/MeasurementUnitEntity";
import { ProductTypeEntity } from "../../entities/ProductTypeEntity";

export type DtoResponseAllocationProductDetail = AllocationProductDetailEntity &
  {
    product_type : (ProductTypeEntity & { measurement_unit : MeasurementUnitEntity})

  }
