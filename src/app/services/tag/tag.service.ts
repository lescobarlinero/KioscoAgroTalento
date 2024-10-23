import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../../types/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  
  constructor(private http:HttpClient) { }
  
  private apiUrlTags = 'http://localhost:3001/tags'; // Replace with your backend API URL
  
  getTags(): Observable<Tag[]> {
    return this.http.get<any>(`${this.apiUrlTags}`);
  }
  
  getTagById(tagId: number): Observable<Tag> {
    return this.http.get<any>(`${this.apiUrlTags}/${tagId}`);
  }

  createTag(data: any): Observable<Tag> {
    return this.http.post<Tag>(`${this.apiUrlTags}`, data);
  }

  updateTag(tagId: number, value: any): Observable<Tag> {
    return this.http.put<Tag>(`${this.apiUrlTags}/${tagId}`, value);
  }
}
