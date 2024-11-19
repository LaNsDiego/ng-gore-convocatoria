import { JobProfileEntity } from "../../entities/JobProfileEntity";
import { JobTitleEntity } from "../../entities/JobTitleEntity";

export type DtoResponseJobProfile = JobProfileEntity & { job_title : JobTitleEntity }
