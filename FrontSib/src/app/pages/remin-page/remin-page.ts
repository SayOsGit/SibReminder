import { Component, inject, Input } from '@angular/core';
import { Forma } from "../../common/forma/forma";
import { Reminder } from '../../data/interfaces/reminder.interface';
import { Status } from '../../data/interfaces/stasus.interface';
import { Reminderes } from '../../data/services/reminderes';
import { Statuses } from '../../data/services/statuses';

@Component({
  selector: 'app-remin-page',
  imports: [Forma],
  templateUrl: './remin-page.html',
  styleUrl: './remin-page.scss'
})
export class ReminPage {
reminderes = inject(Reminderes)
  reminders:Reminder[] = []
  statuses = inject(Statuses)
  statuss:Status[] =[]
  constructor(){
    this.reminderes.getReminders().subscribe( val =>{
      this.reminders = val
      console.log('Данные получены1:', this.reminders);
    })
    this.statuses.getStatuses().subscribe( val=>{
      this.statuss = val
      console.log('Данные получены2:', this.statuss);
    }
    )
  }
  getStatusName(statusId : number): string{
    const status = this.statuss.find(s => s.id == statusId)
    return status? status.name : "Неизвестный статус"
  } 
}
