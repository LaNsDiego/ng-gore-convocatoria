import { EmployeeEntity } from "../../entities/EmployeeEntity";
import { EstablishmentEntity } from "../../entities/EstablishmentEntity";
import { ProductEntity } from "../../entities/ProductEntity";
import { ProductTypeEntity } from "../../entities/ProductTypeEntity";

export type DtoResponseProduct = (ProductEntity & { employee : EmployeeEntity, product_type:ProductTypeEntity, establishment:EstablishmentEntity, stock: number} )
