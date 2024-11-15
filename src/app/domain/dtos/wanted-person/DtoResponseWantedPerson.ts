import { WantedPersonEntity } from "../../entities/WantedPersonEntity";
import { DtoResponseIncidentList } from "../incident/DtoResponseIncidentList";

export type DtoResponseWantedPerson = WantedPersonEntity & { incidents : DtoResponseIncidentList}
