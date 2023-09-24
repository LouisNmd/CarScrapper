import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'la-centrale',
  templateUrl: './la-centrale.component.html',
  styleUrls: ['./la-centrale.component.scss']
})
export class LaCentraleComponent implements OnInit {

  constructor(private apiService: ApiService) {}

  @Input() brand!: string;
  @Input() model!: string;

  data: any = undefined;

  ngOnInit(): void {
    this.apiService.getLaCentrale(this.brand, this.model).then(response => {
      return response.json();
    }).then(data => {
      this.data = data;
    });
  }
}
