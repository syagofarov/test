import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CatService {
  constructor(private http: HttpClient) {
  }
  getCat(): Observable<Blob> {
    return this.http.get(`https://cataas.com/cat`, { responseType: 'blob' });
  }
  getCatWithText(text: string | null | undefined, size: number | null | undefined, color: string | null | undefined): Observable<Blob> {
    if (text == '') {
      return this.http.get(`https://cataas.com/cat`, { responseType: 'blob' });
    } else {
      return this.http.get(`https://cataas.com/cat/says/${text}?fontSize=${size}&fontColor=${color}`, { responseType: 'blob' });
    }
  }
  getCatGif(): Observable<Blob> {
    return this.http.get(`https://cataas.com/cat/gif`, { responseType: 'blob' });
  }

  getCatByTag(tag: string): Observable<Blob> {
    return this.http.get(`https://cataas.com/cat/${tag}`, { responseType: 'blob' });
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`https://cataas.com/api/tags`);
  }
}