import { Component, Input, OnInit, Output } from '@angular/core';
import { Status } from '../../data/interfaces/stasus.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Reminder } from '../../data/interfaces/reminder.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Reminderes } from '../../data/services/reminderes';
import { firstValueFrom } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-forma',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forma.html',
  styleUrl: './forma.scss'
})
export class Forma implements OnInit{
  isEditMode = false;
  reminderId: number | null = null;
  public form = new FormGroup({
    shortDesc: new FormControl<string | null>(null),
    fullDesc: new FormControl<string | null>(null),
    dateCreate: new FormControl<string | null>(null),
    dateFinish: new FormControl<string | null>(null),
    status: new FormControl<number | null>(null)
  })
  constructor(private router: Router, private newReminder: Reminderes, private route: ActivatedRoute) {
    
  }
  @Input() reminder!: Reminder[];
  @Input() statuses!: Status[];
  statusName(statusId: number): string{
    const status = this.statuses?.find(s => s.id === statusId);
    return status ? status.name : 'error';
  }
  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if(id){
        this.isEditMode = true;
        this.reminderId = +id;
        this.loadReminder(+id);
      }
  }
loadReminder(id: number): void {
  this.newReminder.getReminder(id).subscribe({
    next: (reminder) => {
      this.form.patchValue({
        shortDesc: reminder.shortDesc,
        fullDesc: reminder.fullDesc,
        dateCreate: this.formatDate(reminder.dateCreate),
        dateFinish: this.formatDate(reminder.dateFinish),
        status: reminder.statusId
      });
    }
  });
}
  formatDate(date: Date | string | null | undefined): string | null {
    if (!date) {
      return null;
    }
    const dateString = date instanceof Date ? date.toISOString() : date;
    return dateString.slice(0, 16);
}
  goBack():void{
    this.router.navigate(['/']);
  }
async onSave():Promise<void>{
  this.form.markAllAsTouched();
  this.form.updateValueAndValidity();
  if(this.form.invalid){
    console.log('Form error', this.form.errors);
    return;
  }
  const formValue = this.form.value;
  try
  {
  if(this.isEditMode && this.reminderId){
      const body = {
      id: this.reminderId,
      shortDesc: formValue.shortDesc,
      fullDesc: formValue.fullDesc,
      dateCreate: formValue.dateCreate ? new Date(formValue.dateCreate).toISOString() : null,
      dateFinish: formValue.dateFinish ? new Date(formValue.dateFinish).toISOString() : null,
      statusId: Number(formValue.status)
    };
    //@ts-ignore
    await firstValueFrom(this.newReminder.updateReminder(this.reminderId,body));
  }
  else{
      const body = {
      shortDesc: formValue.shortDesc,
      fullDesc: formValue.fullDesc,
      dateCreate: formValue.dateCreate ? new Date(formValue.dateCreate).toISOString() : null,
      dateFinish: formValue.dateFinish ? new Date(formValue.dateFinish).toISOString() : null,
      statusId: Number(formValue.status)
    };
    //@ts-ignore
    await firstValueFrom(this.newReminder.postReminder(body));
  }
  console.log('200')
  this.router.navigate(['/']); 
  }
 catch (error: any) {
    console.error('Ошибка:', error);
    if (error.error?.errors) {
      console.log('Ошибки валидации:', error.error.errors);
      const messages = Object.values(error.error.errors).flat();
      alert('Ошибки:\n' + messages.join('\n'));
    } else {
      alert('400');
    }
  }
}
}
