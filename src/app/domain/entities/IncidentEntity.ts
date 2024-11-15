export type IncidentEntity = {
  id : number
  wanted_person_id : number
  staff_security_id : number
  time : string

  reason : string
  vehicle_plate : string
  vehicle_id : number
  code : string
  sector_id : number
  action_to_take : string

  created_at : string
  updated_at : string
}
