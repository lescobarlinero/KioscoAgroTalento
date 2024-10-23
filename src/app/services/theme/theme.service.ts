import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Theme } from '../../types/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private apiUrl = 'http://localhost:3001/themes'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  getThemes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getThemeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createTheme(theme: Theme): Observable<any> {
    const formData = new FormData();
    formData.append('name', theme.name);
    formData.append('primaryColor', theme.primaryColor);
    formData.append('secondaryColor', theme.secondaryColor);
    formData.append('tertiaryColor', theme.tertiaryColor);
    if (theme.banner) {
      formData.append('banner', theme.banner);
    }
    if (theme.logo) {
      formData.append('logo', theme.logo);
    }
    if (theme.background) {
      formData.append('background', theme.background);
    }
    return this.http.post<any>(`${this.apiUrl}`, formData);
  }

  updateTheme(theme: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', theme.name);
    formData.append('primaryColor', theme.primaryColor);
    formData.append('secondaryColor', theme.secondaryColor);
    formData.append('tertiaryColor', theme.tertiaryColor);
    if (theme.banner) {
      formData.append('banner', theme.banner);
    }
    if (theme.logo) {
      formData.append('logo', theme.logo);
    }
    if (theme.background) {
      formData.append('background', theme.background);
    }
    return this.http.put<any>(`${this.apiUrl}/${theme.id}`, formData);
  }
}
