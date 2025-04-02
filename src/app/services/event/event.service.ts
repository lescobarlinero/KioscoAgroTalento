import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../../types/event';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  
  private apiUrl = 'https://totem-ag-api-d5eqccdxebdaf3ek.eastus-01.azurewebsites.net/events'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getEventById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateEvent(id: number, data: Event): Observable<Event> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('date', data.date);
    formData.append('themeId', data.themeId.toString());
    formData.append('active', data.active.toString());
    if (data.image) {
      formData.append('image', data.image);
    }
    return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
  }

  createEvent(data: Event): Observable<Event> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('date', data.date);
    formData.append('themeId', data.themeId.toString());
    formData.append('active', data.active.toString());
    if (data.image) {
      formData.append('image', data.image);
    }
    return this.http.post<any>(`${this.apiUrl}`, formData);
  }

  deleteEvent(eventId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${eventId}`);
  }

  getMultimediaForEvent(eventId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${eventId}/multimedia`);
  }

  addMultimediaToEvent(eventId: number, multimediaId: number, iconClass: string | undefined, isCarrousel: boolean, sortingOrder: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${eventId}/multimedia`, { multimediaId, iconClass, isCarrousel });
  }

  removeMultimediaFromEvent(eventId: number, multimediaId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${eventId}/multimedia`, {body: { multimediaId }});
  }
}
