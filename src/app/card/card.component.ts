import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../specs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  @Input() preview = false;
  @Input() placeholder = false;

  constructor() { }

  ngOnInit(): void {
  }

}
