export type DtoResponseResourceMapAssignment = {
  id : number
  resource_id : number
  route_map_id : number
  type_map_resource: string
  updated_at : string
  created_at : string
  location : { id : number, name : string , geojson : string }
  sector : { id : number, name : string , geojson : string }
  road_way : { id : number, name : string , geojson : string }
}
