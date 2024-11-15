export type DtoIncidentCreate = {
    first_name: string;
    last_name: string;
    dni: string;
    photo: File | null;
    photos : any[]
    staff_security_id: number;

    reason : string
    vehicle_plate : string
    vehicle_id : number
    code : string
    sector_id : number
    action_to_take : string
}
