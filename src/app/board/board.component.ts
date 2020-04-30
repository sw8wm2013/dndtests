import { RemoveCard } from './../store';
import { CardService } from './../card/card.service';
import { SortableSpecService } from './../specs';
import { ItemTypes } from './../item-types';
import { CreateBoardComponent } from './../create-board/create-board.component';
import { ListService } from './../list/list.service';

import { Component, OnInit, Output, EventEmitter, Optional } from '@angular/core';
import { List } from '../list/list';
import { Card } from '../card/card';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCard } from '../store';
import { DraggedItem, SkyhookSortableRenderer } from '@angular-skyhook/sortable';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  defaultLists: List[];
  lists: List[] = [];
  showForm: boolean = false;
  ItemTypes = ItemTypes;

  addListText: string;
  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  public onAddList: EventEmitter<List>;

  constructor(
    private _listService: ListService,
    private dialog: MatDialog,
    public specs: SortableSpecService,
    private cardService: CardService,
    private listService: ListService,
    @Optional() public render: SkyhookSortableRenderer<List>,

  ) {
    this.onAddList = new EventEmitter();
    this._listService.getAllLists();
  }

  addCard(listId: number, title: string){
    new AddCard(listId, title)
  }

  removeCard(ev: DraggedItem<Card>){
    new RemoveCard(ev);
  }

  ngOnInit(){
    console.log('GET THE LISTS!');
    // this.setDefaultLists();
    this._listService.getAllLists()
      .subscribe((data) =>{
        data.forEach(list => {this.lists.push(list)
        });
      }

      )

  }

  // setDefaultLists(): void {
  //   const lists: List[] = [
  //     {
  //       listId: 1,
  //       name: 'To Do',
  //       cards: [],
  //       position_on_board: 1,
  //     },
  //     {
  //       listId: 2,
  //       name: 'Doing',
  //       cards: [],
  //       position_on_board: 2,
  //     },
  //     {
  //       listId: 3,
  //       name: 'Done',
  //       cards: [],
  //       position_on_board:3,
  //     }
  //   ]
  //   this.defaultLists = lists;
  // }

  openDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data= {
      id: 1,
      title: 'Name of New List'
    }
   let dialogRef =  this.dialog.open(CreateBoardComponent, dialogConfig);

   dialogRef.afterClosed().subscribe((data) => this.lists.push(data))


  }
  toggleNewListInput(){
    this.showForm = !this.showForm;
    console.log('Add new list has been clicked', this.showForm );

  }


}
