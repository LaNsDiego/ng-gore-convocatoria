export type DiaryPartEntity = {
    id : number
    project_id : number
    is_external : boolean
    responsible_employee_id : number
    dni : string
    name : string
    start_date : string
    end_date : string
    vehicle_id: number
    operator_employee_id: number
    total_hours: number
    status: string
    created_at : string
    updated_at : string
}
