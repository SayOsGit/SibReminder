import { Component, inject } from '@angular/core';
import { Reminderes } from '../../data/services/reminderes';
import { Reminder } from '../../data/interfaces/reminder.interface';
import { Status } from '../../data/interfaces/stasus.interface';
import { Statuses } from '../../data/services/statuses';
import { Forma } from '../../common/forma/forma';

@Component({
  selector: 'app-edit-page',
  imports: [Forma],
  templateUrl: './edit-page.html',
  styleUrl: './edit-page.scss'
})
export class EditPage {
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
