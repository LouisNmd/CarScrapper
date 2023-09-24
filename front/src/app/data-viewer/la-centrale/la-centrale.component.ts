import { Component, Input } from '@angular/core';

@Component({
  selector: 'la-centrale',
  templateUrl: './la-centrale.component.html',
  styleUrls: ['./la-centrale.component.scss']
})
export class LaCentraleComponent {

    @Input() displayName!: string;
}
