import { FuelConsumptionEntity } from "../../entities/FuelConsumptionEntity";
import { VehicleEntity } from "../../entities/VehicleEntity";

export type DtoResponseFuelConsumption = (FuelConsumptionEntity & { vehicle : VehicleEntity })
