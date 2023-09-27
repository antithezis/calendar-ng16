import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CalendarService {
  constructor(private http: HttpClient) { }
  // constructor logic here

  getData(year: number, month: number) {
    return this.http.get('assets/data.json');
  }

  get10k(year: number, month: number) {
    return this.http.get('assets/data10k.json');
  }

}


