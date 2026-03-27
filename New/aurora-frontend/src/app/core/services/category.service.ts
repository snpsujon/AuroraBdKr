import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, CategoryMenu } from '../models/api_response.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/categories`;

  getMenuCategories(): Observable<ApiResponse<CategoryMenu[]>> {
    return this.http.get<ApiResponse<CategoryMenu[]>>(`${this.apiUrl}/menu`);
  }
}
