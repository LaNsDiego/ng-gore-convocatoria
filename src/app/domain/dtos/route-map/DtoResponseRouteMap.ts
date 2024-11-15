import { DtoResponseResourceMapAssignmentList } from "../resource-map-assignment/DtoResponseResourceMapAssignmentList"

export type DtoResponseRouteMap = {
  id : number
  name : string
  point_center : string
  locations : DtoResponseResourceMapAssignmentList
  road_ways : DtoResponseResourceMapAssignmentList
  sectors : DtoResponseResourceMapAssignmentList
}
