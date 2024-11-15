import { ProductEntity } from "../../entities/ProductEntity";

export type DtoResponseProductWithStock = ProductEntity & { stock : number}
