import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Status } from '../interfaces/stasus.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Statuses {
  http = inject(HttpClient)
  baseApiUrl = environment.baseApiUrl

  getStatuses() {
    return this.http.get<Status[]>(`${this.baseApiUrl}/Status`)
  }
}
