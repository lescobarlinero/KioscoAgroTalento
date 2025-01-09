import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Multimedia } from '../../types/multimedia';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  
  private apiUrlMM = 'https://totem-ag-api-d5eqccdxebdaf3ek.eastus-01.azurewebsites.net/multimedias'; // Replace with your backend API URL
  private apiUrlMMTypes = 'https://totem-ag-api-d5eqccdxebdaf3ek.eastus-01.azurewebsites.net/multimedia-types'; // Replace with your backend API URL

  constructor(private http:HttpClient) { }

  getMultimedias(fetchRelated: boolean = false): Observable<any> {
    return this.http.get<any>(`${this.apiUrlMM}?fetchRelated=${fetchRelated}`);
  }

  getMultimediaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlMM}/${id}`);
  }

  getMultimediaTypes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlMMTypes}`);
  }

  createMultimedia(multimedia: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', multimedia.name);
    formData.append('multimediaType', multimedia.multimediaTypeId);
    formData.append('url', multimedia.url);
    formData.append('tags', multimedia.selectedTags);
    if (multimedia.file) {
      formData.append('file', multimedia.file);
    }
    return this.http.post<any>(`${this.apiUrlMM}`, formData);
  }

  updateMultimedia(id: number, multimedia: any): Observable<Multimedia> {
    const formData = new FormData();
    formData.append('name', multimedia.name);
    formData.append('multimediaType', multimedia.multimediaTypeId);
    formData.append('url', multimedia.url);
    formData.append('tags', multimedia.selectedTags || '');
    if (multimedia.file) {
      formData.append('file', multimedia.file);
    }
    return this.http.put<Multimedia>(`${this.apiUrlMM}/${id}`, formData);
  }

  deleteMultimedia(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlMM}/${id}`);
  }
}
