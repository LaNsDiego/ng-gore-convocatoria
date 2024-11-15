export type DtoResponseDashboard = {
    employees:number,
    vehicles:number,
    service_patrols:number,
    programations:number
    fuel_consumption:number
    monthly_incidents : any
    top_products : {total_movement:number , name : string}[]
}
