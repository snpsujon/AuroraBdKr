import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../models/auth.model';
import { ApiResponse } from '../models/api_response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/auth`;
  
  currentUser = signal<User | null>(null);

  constructor() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.currentUser.set(JSON.parse(userJson));
    }
  }

  login(credentials: any): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        if (res.isSuccess) {
          this.setSession(res.data);
        }
      })
    );
  }

  register(userData: any): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/register`, userData).pipe(
      tap(res => {
        if (res.isSuccess) {
          this.setSession(res.data);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  private setSession(authRes: AuthResponse) {
    localStorage.setItem('token', authRes.token);
    localStorage.setItem('refreshToken', authRes.refreshToken);
    const user: User = {
      userName: authRes.userName,
      email: authRes.email,
      roles: authRes.roles
    };
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
