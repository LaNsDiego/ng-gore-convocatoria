import { ConstructionEntity } from "../../entities/ConstructionEntity";
import { DetailProductRentalEntity } from "../../entities/DetailProductRentalEntity";
import { WorkActivityEntity } from "../../entities/WorkActivityEntity";

export type DtoResponseDetailProductRental = (DetailProductRentalEntity & { work_activity : string, construction: string })
