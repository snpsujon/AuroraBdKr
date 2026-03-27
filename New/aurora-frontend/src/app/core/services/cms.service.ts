import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, Slider, Brand } from '../models/api_response.model';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/cms`;

  getSliders(): Observable<ApiResponse<Slider[]>> {
    return this.http.get<ApiResponse<Slider[]>>(`${this.apiUrl}/sliders`);
  }

  getBrands(): Observable<ApiResponse<Brand[]>> {
    return this.http.get<ApiResponse<Brand[]>>(`${this.apiUrl}/brands`);
  }

  getComboOffers(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/combooffers`);
  }
}
