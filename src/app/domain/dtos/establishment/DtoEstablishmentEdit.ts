export interface DtoEstablishmentEdit {
    id : number
    code : string
    parent_id ?: number
    name : string
    acronym : string
    establishment_type_id : number
    location_id  : number
    responsible_id? : number
}
  