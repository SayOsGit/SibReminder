import { Component, inject, signal } from '@angular/core';
import { Table } from '../../common/table/table';
import { Router} from '@angular/router';
import { Reminder } from '../../data/interfaces/reminder.interface';
import { Status } from '../../data/interfaces/stasus.interface';
import { Reminderes } from '../../data/services/reminderes';
import { Statuses } from '../../data/services/statuses';

@Component({
  selector: 'app-main-page',
  imports: [Table],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss'
})
export class MainPage {
  protected readonly title = signal('sib');
  reminderes = inject(Reminderes)
  reminders:Reminder[] = []
  statuses = inject(Statuses)
  statuss:Status[] =[]
  constructor(private router: Router){
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
  goNewReminder():void{
    this.router.navigate(['/reminder']);  
  }
}
