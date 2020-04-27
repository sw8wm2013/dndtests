import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../specs';
import { CardSchema } from '../cardschema';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: CardSchema;

  constructor() { }

  ngOnInit(): void {
  }

}
