import { Component } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
})
export class HeaderComponent {
  constructor(private dateService: DateService) {}
  todayDate = this.formatDate(new Date());

  formatDate(date: Date) {
    const formatedTime = this.dateService.formatTime(date);
    const formatedDate = this.dateService.formatDate(date);

    return `${formatedDate} - ${formatedTime}`;
  }
}
