import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Status } from '../interfaces/stasus.interface';

@Injectable({
  providedIn: 'root'
})
export class Statuses {
  http = inject(HttpClient)
  baseApiUrl = 'https://localhost:7103/api/Status'

  getStatuses() {
    return this.http.get<Status[]>(`${this.baseApiUrl}`)
  }
}
