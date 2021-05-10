import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShortUrlService {
  url = environment.bitly_url;


  constructor(private http: HttpClient) {}

  getUrlShort(nameUrl: string): Observable<any> {
    const body = {
      long_url: nameUrl,
    };

    return this.http.post(this.url, body);
  }
}
