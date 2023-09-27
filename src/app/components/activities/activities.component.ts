import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarService } from 'src/app/services/calendar.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  private allRecords = [];
  public displayedRecords: any[] = [];
  private readonly PAGE_SIZE = 10;
  private currentPage = 0;


  constructor(private calendarService: CalendarService) {
    this.loadMore();
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.calendarService.get10k(2021, 1).subscribe((data: any) => {
      this.allRecords = data;
      this.displayedRecords = this.allRecords
      console.log(this.allRecords);

      this.loadMore();
    });
  }

  loadMore() {
    const start = this.currentPage * this.PAGE_SIZE;
    const end = start + this.PAGE_SIZE;
    this.displayedRecords = [...this.displayedRecords, ...this.allRecords.slice(start, end)];
    this.currentPage++;
  }

  onScroll() {
    this.loadMore();
  }

}

