export type DtoProductEdit = {
    id: number;
    image: File | null;
    serial_number: string;
    rental_price: number;
    acquisition_cost: number;
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
