import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentesService {

  private URL = "http://localhost:8080/api/componentes";

  constructor(private httpClient: HttpClient) { }

  public getAllComponents(): Observable<any> {
    return this.httpClient.get(this.URL);
  }

  public saveData(data: string): Observable<any> {
    return this.httpClient.get(`${this.URL}/save-data/${data}`);
  }

  public updateComponent(elemento: string, estado: number): Observable<any> {
    return this.httpClient.get(`${this.URL}/${elemento}/${estado}`);
  }
  
}
