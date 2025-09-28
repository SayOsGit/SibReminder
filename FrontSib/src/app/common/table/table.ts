import { Component, Input } from '@angular/core';
import { Reminder } from '../../data/interfaces/reminder.interface';
import { Status } from '../../data/interfaces/stasus.interface';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-table',
  imports: [DatePipe],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table {
  @Input() reminder!: Reminder[];
  @Input() statuses!: Status[];
  constructor(private router: Router){

  }
  statusName(statusId: number): string{
    const status = this.statuses?.find(s => s.id === statusId);
    return status ? status.name : 'error';
  }
  onEdit(reminder: Reminder):void{
  this.router.navigate(['/edit', reminder.id]);
  }
}
