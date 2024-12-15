import { ModuleGroupEntity } from "../../entities/ModuleGroupEntity"
import { SystemModuleEntity } from "../../entities/SystemModuleEntity"

export type DtoResponseModuleGroup =  ModuleGroupEntity & {
  system_modules : (SystemModuleEntity & {module_permissions : { id : number , action :string , has_access : boolean} [] })[]
}
