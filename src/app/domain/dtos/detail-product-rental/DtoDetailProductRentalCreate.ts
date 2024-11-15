import { ConstructionEntity } from "../../entities/ConstructionEntity";
import { WorkActivityEntity } from "../../entities/WorkActivityEntity";

export type DtoDetailProductRentalCreate= {
    product_rental_id: number;
    work_activity_id: number;
    work_activity: string;
    date: string;
    start_hour: string;
    end_hour: string;
    total_hours: number;
    total_price: number;
    construction_id: number ;
    construction:string
    location_detail: string;
}
