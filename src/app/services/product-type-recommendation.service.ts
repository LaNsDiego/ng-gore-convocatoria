import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoResponseProductTypeRecommendationList } from '../domain/dtos/product-type-recomendation/DtoResponseProductTypeRecommendationList';
import { environment } from '@/environments/environment';
import { DtoProductTypeRecommendationCreate } from '../domain/dtos/product-type-recomendation/DtoProductTypeRecommendationCreate';
import { DtoResponseProductTypeRecommendation } from '../domain/dtos/product-type-recomendation/DtoResponseProductTypeRecommendation';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeRecommendationService {

  constructor(
    private http: HttpClient
  ) { }

  list(){
    return this.http.get<DtoResponseProductTypeRecommendationList>(`${environment.apiUrl}/product-type-recommendations/list`)
  }

  store(values : DtoProductTypeRecommendationCreate){
      return this.http.post<{message : string , created : DtoResponseProductTypeRecommendation}>(`${environment.apiUrl}/product-type-recommendations/store`, values)
  }
}
