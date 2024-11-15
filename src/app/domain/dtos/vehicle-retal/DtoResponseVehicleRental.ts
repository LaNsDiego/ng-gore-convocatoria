
import { ProviderEntity } from "../../entities/ProviderEntity";
import { VehicleEntity } from "../../entities/VehicleEntity";
import { VehicleRentalEntity } from "../../entities/VehicleRentalEntity";

export type DtoResponseVehicleRental = (VehicleRentalEntity & { vehicle : VehicleEntity, provider : ProviderEntity })
