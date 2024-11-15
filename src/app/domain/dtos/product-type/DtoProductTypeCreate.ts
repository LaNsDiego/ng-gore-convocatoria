export interface DtoProductTypeCreate {
    name: string;
    description?: string;
    model: string;
    tags?: string[];
    brand_id: number;
}
