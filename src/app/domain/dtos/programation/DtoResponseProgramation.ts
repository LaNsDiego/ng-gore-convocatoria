import { ProgramationEntity } from "../../entities/ProgramationEntity";
import { ProgramationScheduleEntity } from "../../entities/ProgramationScheduleEntity";

export type DtoResponseProgramation = (ProgramationEntity & { programation_schedules : ProgramationScheduleEntity[] })


