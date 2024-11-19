import { CityEntity } from "../../entities/CityEntity";
import { CountryEntity } from "../../entities/CountryEntity";
import { DepartmentEntity } from "../../entities/DepartmentEntity";
import { EmployeeEntity } from "../../entities/EmployeeEntity";
import { JobTitleEntity } from "../../entities/JobTitleEntity";
import { ProvinceEntity } from "../../entities/ProvinceEntity";

export type DtoResponseEmployee = (EmployeeEntity & {
  address_city : CityEntity & {
    province : ProvinceEntity & {
      department : DepartmentEntity & {
        country : CountryEntity
      }
    }
  },
  birth_city : CityEntity & {
    province : ProvinceEntity & {
      department : DepartmentEntity & {
        country : CountryEntity
      }
    }
  }
})
