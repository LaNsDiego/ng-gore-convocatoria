export interface DtoKardexCreateVehicle {
    supplier_id: number;
    employee_id: number;
    responsible_employee_id: number;
    product_type_id: number;
    serial_number: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    rental_price: number;
    comment: string;
    image: string | null; 
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
    type_machinery: string;
}
