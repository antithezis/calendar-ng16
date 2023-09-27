import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarService } from 'src/app/services/calendar.service';

import { Event } from '../../interfaces/interfaces';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  private calendarService = inject(CalendarService)

  daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Augosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  
  currentMonth!: string;  // El nombre del mes
  currentMonthIndex!: number; // El índice del mes
  currentYear!: number;
  daysInMonth: any[] = [];  // Agregamos esta línea

  eventsByDate: { [date: string]: Event[] } = {};



  ngOnInit(): void {
    const date = new Date();
    this.currentMonthIndex = date.getMonth();
    this.currentMonth = this.months[this.currentMonthIndex];
    this.currentYear = date.getFullYear();
    this.loadDays();
    this.loadEventsForMonth();

  }

  loadEventsForMonth(): void {
    this.calendarService.getData(this.currentYear, this.currentMonthIndex).subscribe((events: Object) => {
      this.loadEvents(events);
    });
  }

  loadDays(): void {
    let firstDay = new Date(this.currentYear, this.currentMonthIndex, 1).getDay();
    firstDay = firstDay === 0 ? 6 : firstDay - 1; // Si es 0 (Domingo) se convierte en 6, de lo contrario se resta 1.
    const totalDays = new Date(this.currentYear, this.currentMonthIndex + 1, 0).getDate();

    this.daysInMonth = [];

    // Fill the gaps before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      this.daysInMonth.push(null);
    }

    for (let i = 1; i <= totalDays; i++) {
      this.daysInMonth.push(i);
    }

    // Rellenar el final con celdas vacías hasta completar una semana completa
    while (this.daysInMonth.length % 7 !== 0) {
      this.daysInMonth.push(null);
    }

  }

  loadEvents(events: Object): void {
    this.eventsByDate = {};

    for (const event of events as Event[]) {
      if (!this.eventsByDate[event.date]) {
        this.eventsByDate[event.date] = [];
      }
      this.eventsByDate[event.date].push(event);
    }

    console.log(this.eventsByDate);

  }

  getEventsForDate(date: string): Event[] {
    console.log(date);

    return this.eventsByDate[date] || [];
  }

  generateDateString(year: number, month: number, day: number): string {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  hasEventsForDate(date: string): boolean {
    return this.eventsByDate[date] && this.eventsByDate[date].length > 0;
  }

  prevMonth(): void {
    this.currentMonthIndex--;
    if (this.currentMonthIndex < 0) {
      this.currentMonthIndex = 11;
      this.currentYear--;
    }
    this.currentMonth = this.months[this.currentMonthIndex];
    this.loadDays();
  }

  nextMonth(): void {
    this.currentMonthIndex++;
    if (this.currentMonthIndex > 11) {
      this.currentMonthIndex = 0;
      this.currentYear++;
    }
    this.currentMonth = this.months[this.currentMonthIndex];
    this.loadDays();
  }
}


