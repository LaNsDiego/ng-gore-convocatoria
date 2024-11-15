
import { EmployeeEntity } from "../../entities/EmployeeEntity";
import { ProductEntity } from "../../entities/ProductEntity";
import { WorkActivityEntity } from "../../entities/WorkActivityEntity";
import { ProductRentalEntity } from "../../entities/ProductRentalEntity";
import { DetailProductRentalEntity } from "../../entities/DetailProductRentalEntity";
import { EstablishmentEntity } from "../../entities/EstablishmentEntity";
import { ConstructionEntity } from "../../entities/ConstructionEntity";
import { ProductTypeEntity } from "../../entities/ProductTypeEntity";
import { DetailKardexEntity } from "../../entities/DetailKardexEntity";
import { MeasurementUnitEntity } from "../../entities/MeasurementUnitEntity";
import { AssignedProductRentalEntity } from "../../entities/AssignedProductRentalEntity";


export type DtoResponseProductRental = (ProductRentalEntity & {
    product : (ProductEntity & {
        product_type: ProductTypeEntity}), employee : EmployeeEntity ,establishment : EstablishmentEntity,
        detail_product_rentals : (DetailProductRentalEntity & { 
        work_activity: WorkActivityEntity, construction: ConstructionEntity 
    })[],
    assigned_product_rentals : (AssignedProductRentalEntity & { 
        detail_kardex: (DetailKardexEntity  & { 
            product: (ProductEntity  & { 
                product_type: (ProductTypeEntity & {
                    measurement_unit: MeasurementUnitEntity
                }) }) 
            }) 
    })[]
 })
