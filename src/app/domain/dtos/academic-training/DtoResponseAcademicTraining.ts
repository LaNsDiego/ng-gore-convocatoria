import { AcademicTrainingEntity } from "../../entities/AcademicTrainingEntity";
import { CityEntity } from "../../entities/CityEntity";
import { CountryEntity } from "../../entities/CountryEntity";
import { DepartmentEntity } from "../../entities/DepartmentEntity";
import { ProvinceEntity } from "../../entities/ProvinceEntity";

export type DtoResponseAcademicTraining = AcademicTrainingEntity & {
   academic_situation_city :  CityEntity & {
      province : ProvinceEntity & {
        department :  DepartmentEntity & { country : CountryEntity}
      }
   }
}
