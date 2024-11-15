import { DtoResponseProductWithStock } from "../product/DtoResponseProductWithStock"

export type DtoProductAllocationCreate = {
    employee_id: number
    allocation_product_details : DtoResponseProductWithStock[]
}
