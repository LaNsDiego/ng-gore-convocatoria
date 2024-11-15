import { EmployeeEntity } from "../../entities/EmployeeEntity";
import { JobTitleEntity } from "../../entities/JobTitleEntity";

export type DtoResponseEmployee = (EmployeeEntity &  JobTitleEntity)
