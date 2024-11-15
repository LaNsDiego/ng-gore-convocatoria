import { VehicleEntity } from "../../entities/VehicleEntity"

export interface DtoPatrolServiceCreate {
  patrol_service: DtoPartialHeaderPatrolServiceCreate,
  vehicles : VehicleEntity[],
  schedule : DtoPartialSchedulePatrolServiceCreate
}


export type DtoPartialHeaderPatrolServiceCreate = {
  name : string
  start_date : string
  description : string
  gallons_provided : number
  employee_manager_id : number
}

export type DtoPartialSchedulePatrolServiceCreate = {
  start_date : string
  schedule : string
  sector_id : number
}
