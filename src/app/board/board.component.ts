import { SortableSpecService, CardList, CardTree } from './../specs';
import { Component, OnInit } from '@angular/core';
import { ItemTypes } from "../item-types";
import { SpecResult } from 'protractor/built/plugins';
import { CardStore } from '../cardstore';
import { ListSchema } from '../listschema';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  ItemTypes = ItemTypes;
  cardStore: CardStore;
  lists: ListSchema[];

  constructor(public specs: SortableSpecService) { }

  setMockData(): void {
    this.cardStore = new CardStore();
    const lists: ListSchema[] = [
      {
        listId: 1,
        name: 'To Do',
        cards: []
      },
      {
        listId: 2,
        name: 'Doing',
        cards: []
      },
      {
        listId: 3,
        name: 'Done',
        cards: []
      }
    ]
    this.lists = lists;
  }

  ngOnInit(){
    this.setMockData();
  }


}
