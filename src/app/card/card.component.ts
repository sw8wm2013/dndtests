import { CardService } from './card.service';
import { Component, OnInit, Input } from '@angular/core';
import { Card } from './card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
 @Input() card: Card;

  constructor( private cardService: CardService) { }

  ngOnInit(): void {

  }

  deleteCard(){
    console.log('CARD ID', this.card._id);
    this.cardService.deleteCard(this.card._id)
  }
}
