import { CampaingEntity } from "../../entities/CampaingEntity";
import { ProgramationEntity } from "../../entities/ProgramationEntity";
import { DtoResponseProgramationList } from "../programation/DtoResponseProgramationList";

export type DtoResponseCampaing = (CampaingEntity & { programations : DtoResponseProgramationList })
