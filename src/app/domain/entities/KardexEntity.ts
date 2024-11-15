export type KardexEntity = {
    id: number;
    date: string;
    product_type_id: number;
    quantity: number;
    unit_cost: number;
    total_cost: number;
    establishment_id: number;
    created_at?: string;
    updated_at?: string;
}