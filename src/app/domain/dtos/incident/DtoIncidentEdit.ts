export type DtoIncidentEdit = {
  id: number;
  description: string;
  staff_security_id: number;
  time : string
  photos: File[]
  deleted_photos : string[]

  action_to_take: string;
  reason: string;
  vehicle_plate: string;
  vehicle_id: number;
  code: string;
  sector_id: number;

}
