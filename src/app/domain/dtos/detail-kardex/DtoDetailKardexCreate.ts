
export interface DtoDetailKardexCreate {
    product_type_id: number;
    serial_number: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    comment: string;
    image: string; 
    images: File[]; 
    license_plate: string;
    siga_code: string;
    accounting_account: string;
    order_number: string;
    pecosa_number: string;
    dimensions: string;
    chassis: string;
    engine: string;
    color: string;
    manufacture_year: string;
    historical_value: number;
    status: string;
}