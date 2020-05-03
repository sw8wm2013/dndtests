import { CardService } from './../card/card.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { List } from './list';
import { Card } from '../card/card';

import autoScroll from 'dom-autoscroller';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list: List;
  cards: Card[] = [];
  displayAddCard = false;

  @ViewChild('scrollthisnow') autoscroll: ElementRef;

  constructor(
    private cardService: CardService
  ) { }

  onEnter(value: string) {
    console.log('Value of input', value);
    console.log('LIST', this.list);
    const position = this.cards.length + 1;
    const newCard: Card = {
      title: value,
      currentList: this.list._id,
      position_on_board: position,
    };
    this.cardService.createNewCard(newCard)
    .subscribe( data => this.cards.push(data));
  }


  toggleDisplayAddCard() {
    this.displayAddCard = ! this.displayAddCard;
  }

  ngOnInit(): void {
    this.cardService.retrieveCardsByList(this.list._id)
    .subscribe((data) => {
      data.forEach(card => {this.cards.push(card);
      });
    });
  }

  ngAfterViewInit(){
    console.log('AFTER INIT LIST COMPONENT');
    autoScroll([
      this.autoscroll.nativeElement
     ], {
      margin: 15,
      maxSpeed: 4,
      scrollWhenOutside: true,
      autoScroll() {
       return this.down;
      }
    });
  }


}
