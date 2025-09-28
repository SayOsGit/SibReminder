import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Reminder } from '../interfaces/reminder.interface';

@Injectable({
  providedIn: 'root'
})
export class Reminderes {
  http = inject(HttpClient)
  baseApiUrl = 'https://localhost:7103/api'

  getReminders() {
    return this.http.get<Reminder[]>(`${this.baseApiUrl}/Reminders`)
  }
  postReminder( reminder: Partial<Reminder>){
    return this.http.post<Reminder>(`${this.baseApiUrl}/Reminders`, reminder)
  }
  updateReminder(id: number, reminder: Partial<Reminder>){
    return this.http.put(`${this.baseApiUrl}/Reminders/${id}`, reminder);
  }
  getReminder(id: number){
    return this.http.get<Reminder>(`${this.baseApiUrl}/Reminders/${id}`)
  }
}
