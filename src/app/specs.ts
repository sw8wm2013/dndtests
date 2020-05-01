import { DraggedItem } from '@angular-skyhook/sortable';
import { CardService } from './card/card.service';
import { ListService } from './list/list.service';
import { Injectable } from "@angular/core";
import { SortableSpec } from "@angular-skyhook/sortable";


import { ItemTypes } from './item-types';
import { Card } from './card/card';
import { List } from './list/list';

import {produce} from 'immer';


@Injectable()
export class SortableSpecService {

  constructor(
    private listService: ListService,
    private cardService: CardService,
    ) {
      let initialList: List[] = [];
      this.listService.getAllLists()
      .subscribe(data => data.forEach(list => {
        console.log('IN HERE');
        initialList.push(list)
        console.log('INITAL LIST NOW', initialList);
      }))
      this.retrievedLists = initialList
     }


  retrievedLists = [];
  // private initialList: List[];
  private savedLists = this.retrievedLists;
  public lists = this.retrievedLists;



  moveList(item: DraggedItem<List>){
    return produce(this.lists, draft => {
      if(item.isInternal){
        draft.splice(item.index, 1)
      }
      draft.splice(item.hover.index, 0);
    })
  }

  // tslint:disable-next-line: member-ordering
  boardSpec: SortableSpec<List> = {
    type: ItemTypes.LIST,
    trackBy: list => list._id,
    hover: item => {
      this.lists = this.moveList(item);
    },
    drop: item => {
      this.lists = this.savedLists = this.moveList(item);
    },
    endDrag: _item => {
      this.lists = this.savedLists;
    }
  };

  moveCard(item: DraggedItem<Card>){
    return produce (this.savedLists, draft => {
      const { listId: from, index: fromIndex} = item;
      const {listId: to, index: toIndex} = item.hover;
      console.info('from', from, fromIndex, 'to', to, toIndex);
      let fromList = draft.find(x => x._id ===from);
      let toList = draft.find(x=> x._id ===to);
      if(!fromList) return;
      if (item.isInternal){
        fromList.cards.splice(fromIndex, 1);
      }
      if(!toList) return;
      let neu = {
        ...item.data,
        listId: to,
      }
      toList.cards.splice(toIndex, 0, neu);
    });
  }

  // tslint:disable-next-line: member-ordering
  listSpec: SortableSpec<Card> = {
    type: ItemTypes.CARD,
    trackBy: card => card._id,
    hover: item => {this.retrievedLists = this.moveCard(item)},
    drop: item => {this.retrievedLists = this.savedLists = this.moveCard(item)},
    endDrag: _item => {this.retrievedLists = this.savedLists},
  };


      // tslint:disable-next-line: contextual-lifecycle
      ngOnInit(){
        // console.log('LISTS', this.lists);
        // this.listService.getAllLists()
        // .subscribe(data => data.forEach(list => {
        //   console.log('IN HERE');
        //   this.initialList.push(list)
        //   console.log('INITAL LIST NOW', this.initialList);
        // }))
      }

}
