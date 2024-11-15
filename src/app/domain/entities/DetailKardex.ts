export type DetailKardex = {
    id: number;
    kardex_id: number;
    product_id: number;
    employee_id: number;
    movement_type_id: number;
    movement: 'ENTRADA' | 'SALIDA' | 'PRESTAMO';
    quantity: number;
    unit_price?: number | null;
    total_price?: number | null;
    comment?: string | null;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
  }