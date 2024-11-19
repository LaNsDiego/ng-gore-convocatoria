import { CityEntity } from "../../entities/CityEntity";
import { CountryEntity } from "../../entities/CountryEntity";
import { DepartmentEntity } from "../../entities/DepartmentEntity";
import { ProvinceEntity } from "../../entities/ProvinceEntity";

export type DtoResponseCountry = CountryEntity & {
  departments : (DepartmentEntity & {
    provinces : (ProvinceEntity & {
      cities : CityEntity[]
    })[]
  })[]
}
