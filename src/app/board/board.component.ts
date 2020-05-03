
import { CreateBoardComponent } from './../create-board/create-board.component';
import { ListService } from './../list/list.service';

import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { List } from '../list/list';
import { Card } from '../card/card';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SortableSpecService } from '../spec';
import { ItemTypes } from '../item-types';
import { DraggedItem } from '@angular-skyhook/sortable';

import autoScroll from 'dom-autoscroller';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  ItemTypes = ItemTypes;

  @ViewChild('autoscroll') autoscroll: ElementRef;

  constructor(public specs: SortableSpecService) { }

  addCard(listId: number, title: string) {
      // this.store.dispatch(new AddCard(listId, title));
  }

  removeCard(ev: DraggedItem<Card>) {
      // this.store.dispatch(new RemoveCard(ev));
  }

  ngOnInit(){

  }

  ngAfterViewInit(){
    autoScroll([
      this.autoscroll.nativeElement
     ], {
      margin: 10,
      maxSpeed: 4,
      scrollWhenOutside: true,
      autoScroll() {
       return this.down;
      }
    });
  }

  // openDialog(){
  //   const dialogConfig = new MatDialogConfig();

  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.data= {
  //     id: 1,
  //     title: 'Name of New List'
  //   }
  //  let dialogRef =  this.dialog.open(CreateBoardComponent, dialogConfig);

  //  dialogRef.afterClosed().subscribe((data) => this.lists.push(data))


  // }
  // toggleNewListInput(){
  //   this.showForm = !this.showForm;
  //   console.log('Add new list has been clicked', this.showForm );

  // }


}
