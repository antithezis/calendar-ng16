import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from "../activities/activities.component";
import { CalendarComponent } from "../calendar/calendar.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    imports: [CommonModule, ActivitiesComponent, CalendarComponent]
})
export class DashboardComponent {

}
