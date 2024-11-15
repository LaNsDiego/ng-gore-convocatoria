
import { AllocationProductEntity } from "../../entities/AllocationProductEntity";
import { DtoResponseAllocationProductDetail } from "../allocation-product-detail/DtoResponseAllocationProductDetail";

export type DtoResponseAllocationProduct = AllocationProductEntity & { product_allocation_details : DtoResponseAllocationProductDetail[] }
