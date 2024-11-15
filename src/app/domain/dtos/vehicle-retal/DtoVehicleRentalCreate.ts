export interface DtoVehicleRentalCreate {
  vehicle_id : number
  provider_id : number
  start_date: string
  end_date: string
  daily_cost: number
  total_cost: number
  mileage: number
}
