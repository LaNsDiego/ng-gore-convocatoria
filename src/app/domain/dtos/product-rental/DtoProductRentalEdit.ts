export type DtoProductRentalEdit = {
    id: number;
    code: string;
    product_id: number;
    price_per_hour: number;
    employee_id: number;
    establishment_id: number;
    start_date: string;
    end_date: string;
    total_hours: number;
    total_price: number;
    is_external: boolean;
    number_dni: string;
    full_name: string;
    mileage_traveled: number;
    status: string;
    detail: any;
    assigned_products: any;
}
  