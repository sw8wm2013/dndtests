import { CardService } from './../card/card.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { List } from './list';
import { Card } from '../card/card';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list: List;
  cards: Card[] = [];
  displayAddCard = false;


  constructor(
    private cardService: CardService
  ) { }

  onEnter(value: string) {
    console.log('Value of input', value);
    const position = this.cards.length + 1;
    const newCard: Card = {
      title: value,
      currentList: this.list.listId,
      position_on_board: position,
    };
    this.cardService.createNewCard(newCard)
    .subscribe( data => this.cards.push(data));
  }


  toggleDisplayAddCard() {
    this.displayAddCard = ! this.displayAddCard;
  }

  ngOnInit(): void {
    this.cardService.retrieveCardsByList(this.list.listId)
    .subscribe((data) => {
      data.forEach(card => {this.cards.push(card);
      });
    });
  }


}
