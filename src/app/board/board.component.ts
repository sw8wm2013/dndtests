import { SortableSpecService, CardList, CardTree, tree } from './../specs';
import { Component, OnInit } from '@angular/core';
import { ItemTypes } from "../item-types";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  ItemTypes = ItemTypes;
  lists: tree; // NEED TO IMPORT THE INITAL TREE FROM THE SPEC

  ngOnInit(){
    console.log('BOARD LISTS', this.lists);
  }
  constructor(public specs: SortableSpecService) { }

  addCard(listId: number, title: string) {
      // this.store.dispatch(new AddCard(listId, title));
  }

  // removeCard(ev: DraggedItem<Card>) {
  //     // this.store.dispatch(new RemoveCard(ev));
  // }

}
