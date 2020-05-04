import { CardService } from './../card/card.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { List } from './list';
import { Card } from '../card/card';

import autoScroll from 'dom-autoscroller';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list: List;
  cards: Card[] = [];
  displayAddCard = false;

  scrollElements: any;
  cardsScroll: any;

  // @ViewChild('autoscroll') autoscroll: ElementRef;

  constructor(
    private cardService: CardService,
    private elRef: ElementRef,
    private dragulaService: DragulaService,
  ) {}

  onEnter(value: string) {
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
    setTimeout(() => { this.initializeScroll(); }, 500);
    //  autoScroll([
    //    this.autoscroll.nativeElement
    //   ], {
    //    margin: 15,
    //    maxSpeed: 700,
    //    scrollWhenOutside: true,
    //    autoScroll() {
    //      console.log('AUTOSCROLL?');
    //     return this.down;
    //    }
    //  });
  }
  // card-wrapper

  initializeScroll(){
    console.log('INITALIZING SCROLL ON LIST COMPONENT', this.cardsScroll);
    this.cardsScroll = Array.from(this.elRef.nativeElement.querySelectorAll('.autoscroll-wrapper'));
    console.log('CARDS ON SCROLL', this.cardsScroll);
    this.scrollElements = autoScroll([...this.cardsScroll], {
      margin: 100,
      speed: 500,
      scrollWhenOutside: false,
      autoScroll: function(){
        console.log('scrollin list comp', this.scrolling);
        return this.down;
      }
    });
  }

  resetScroll(){
    [...this.cardsScroll].forEach(el => this.scrollElements.remove(el));
    this.cardsScroll = Array.from(this.elRef.nativeElement.querySelectorAll('.autoscroll-wrapper'));
    [...this.cardsScroll].forEach(el => this.scrollElements.add(el));
  }

}
