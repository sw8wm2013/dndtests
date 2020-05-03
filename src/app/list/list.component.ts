import { CardService } from './../card/card.service';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { List } from './list';
import { Card } from '../card/card';
import { CommonUtilsService } from '../services/common-utils.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() column;
  @Input() scene;
  // @Input() scene;
  // @Input() list: List;
  // cards: Card[] = [];
  // displayAddCard = false;

  colHeight: any;

  constructor(
    private commonUtilsService: CommonUtilsService,
    private elRef: ElementRef
    // private cardService: CardService
  ) { }


  ngOnInit() {
  }

  onCardDrop(columnId: any, dropResult: any) {
    const { removedIndex, addedIndex, payload, droppedElement } = dropResult;
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const scene = Object.assign({}, this.scene);
      const column = scene.children.filter(p => p.id === columnId)[0];
      const columnIndex = scene.children.indexOf(column);
      const newColumn = Object.assign({}, column);
      newColumn.children = this.commonUtilsService.applyDrag(newColumn.children, dropResult);
      scene.children.splice(columnIndex, 1, newColumn);
      this.scene = scene;
    }
  }

  onDragStart(event) {
    // console.log(event);
  }

  onDragEnd(event) {
    // console.log(event);
  }

  getCardPayload(columnId: any) {
    return (index) => {
      return this.scene.children.filter(p => p.id === columnId)[0].children[index];
    };
  }

  /**
   * Function to log all events fired
   *
   * @param {*} params
   * @memberof ColumnComponent
   */
  log(...params) {
    console.log(...params);
  }

  // onEnter(value: string) {
  //   console.log('Value of input', value);
  //   console.log('LIST', this.list);
  //   const position = this.cards.length + 1;
  //   const newCard: Card = {
  //     title: value,
  //     currentList: this.list._id,
  //     position_on_board: position,
  //   };
  //   this.cardService.createNewCard(newCard)
  //   .subscribe( data => this.cards.push(data));
  // }


  // toggleDisplayAddCard() {
  //   this.displayAddCard = ! this.displayAddCard;
  // }

  // ngOnInit(): void {
  //   this.cardService.retrieveCardsByList(this.list._id)
  //   .subscribe((data) => {
  //     data.forEach(card => {this.cards.push(card);
  //     });
  //   });
  // }


}
