import { SkyhookSortableRenderer } from '@angular-skyhook/sortable';
import { SortableSpecService } from './../specs';
import { CardService } from './../card/card.service';
import { Component, OnInit, Input, Output, EventEmitter, Optional } from '@angular/core';
import { List } from './list';
import { Card } from '../card/card';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list: List;
  @Input() preview: boolean = false;
  @Input() placeholder: boolean = false;
  cards: Card[] = [];
  displayAddCard = false;


  constructor(
    private cardService: CardService,
    public specs: SortableSpecService,
    @Optional() public render: SkyhookSortableRenderer<Card>
  ) { }

  trackById = (_: any, x: Card) =>  x._id;

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

  clickingTest(){
    console.log('CLICKED');
  }


}
