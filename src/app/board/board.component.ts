// import { RemoveCard } from './../store';
import { CardService } from './../card/card.service';
import { SortableSpecService } from './../specs';
import { ItemTypes } from './../item-types';
import { CreateBoardComponent } from './../create-board/create-board.component';
import { ListService } from './../list/list.service';

import { Component, OnInit, Output, EventEmitter, Optional } from '@angular/core';
import { List } from '../list/list';
import { Card } from '../card/card';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { AddCard } from '../store';
import { DraggedItem, SkyhookSortableRenderer } from '@angular-skyhook/sortable';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  defaultLists: List[];
  lists: List[] = [];
  list: List;
  showForm: boolean = false;
  ItemTypes = ItemTypes;

  addListText: string;
  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  public onAddList: EventEmitter<List>;

  // placeholder$ = this.render && this.render.source.listen(m => m.isDragging());
  placeholder$ = this.render && this.render.source.listen(m => console.log(m));
  isOver$ = this.render && this.render.target.listen(m => m.canDrop() && m.isOver());

  constructor(
    private _listService: ListService,
    private dialog: MatDialog,
    public specs: SortableSpecService,
    private cardService: CardService,
    private listService: ListService,
    @Optional() public render ?: SkyhookSortableRenderer<List>,

  ) {
    this.onAddList = new EventEmitter();
    this._listService.getAllLists();
    console.log('Render', render);
  }

  trackById = (_: any, x: List) =>  x._id;


  ngOnInit(){
    this.listService.getAllLists()
      .subscribe((data) =>{data.forEach(list => {this.lists.push(list)});
      })
  }



  openDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data= {
      id: 1,
      title: 'Name of New List'
    };
   const dialogRef =  this.dialog.open(CreateBoardComponent, dialogConfig);

  //  dialogRef.afterClosed().subscribe((data) => this.lists.push;(data))
   dialogRef.afterClosed().subscribe((data) => console.log(data))
  }

  toggleNewListInput(){
    this.showForm = !this.showForm;
    console.log('Add new list has been clicked', this.showForm );
  }



}
