import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  http = inject(HttpClient)
  constructor() { }


  fetchFuelConsumptionReport() {
    return this.http.get<any>(`${environment.apiUrl}/reports/fuel-consumption-data`)
  }

  postFuelConsumptionReport(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/reports/fuel-consumption`, data)
  }

  wantedPeopleReportByDateRange(data: {start_date : string, end_date : string}) {
    return this.http.post<any>(`${environment.apiUrl}/reports/wanted-people-date-range`, data)
  }

  wantedPersonReport(data: {wanted_person_id: number}) {
    return this.http.post<any>(`${environment.apiUrl}/reports/wanted-person`, data)
  }

  productRentalsReportByRange(params : { start_date : string, end_date : string , vehicle_id : number, employee_id : number ,establishment_id : number }) {
    return this.http.post<any>(`${environment.apiUrl}/reports/product-rental`, params)
  }
}
