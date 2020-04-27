import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card, CardList, SortableSpecService } from "../specs";
import { ListSchema } from '../listschema';
import { CardStore } from '../cardstore';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list: ListSchema;
  @Input() cardStore: CardStore;
  displayAddCard = false;


  constructor(public specs: SortableSpecService) { }

  toggleDisplayAddCard() {
    this.displayAddCard = ! this.displayAddCard;
  }

  onEnter(value: string) {
    const cardId =  this.cardStore.newCard(value);
    this.list.cards.push(cardId);
  }


  ngOnInit(): void {
  }

  trackById = (_: any, x: Card) =>  x.id;

}
