export type DtoResponseTreeRoleHasPermissionList = {
  id:            number
  role_id:       number
  permission_id: number
  has_access:    boolean
  created_at:    string
  updated_at:    string
  permission:    PermissionPermission
}[]

type PermissionPermission = {
  id:               number
  action:           string
  module_system_id: number
  created_at:       string
  updated_at:       string
  module_system:    {
    id : number
    description: string
    created_at: string
    updated_at: string
    name : string
    module_group : {
      id : number
      name : string
    }
  }
}
