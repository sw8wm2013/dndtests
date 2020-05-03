import { CreateBoardComponent } from './../create-board/create-board.component';
import { ListService } from './../list/list.service';

import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { List } from '../list/list';
import { Card } from '../card/card';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DragulaService } from 'ng2-dragula';

import autoScroll from 'dom-autoscroller';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  defaultLists: List[];
  lists: List[] = [];
  showForm: boolean = false;

  addListText: string;
  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  public onAddList: EventEmitter<List>;

  @ViewChild('scrollthisnow') autoscroll: ElementRef;

  constructor(
    private _listService: ListService,
    private dialog: MatDialog,
    private dragulaService: DragulaService
  ) {
    this.onAddList = new EventEmitter();
    this._listService.getAllLists();
  }


  ngOnInit(){
    this.dragulaService.createGroup('DRAGULA_CONTAINER', {});
    console.log('GET THE LISTS!');
    // this.setDefaultLists();
    this._listService.getAllLists()
      .subscribe((data) =>{
        data.forEach(list => {this.lists.push(list)
        });
      });

  }

  ngAfterViewInit(){
    console.log('AFTER INIT');
    autoScroll([
      this.autoscroll.nativeElement
     ], {
      margin: 35,
      maxSpeed: 4,
      scrollWhenOutside: true,
      autoScroll() {
       return this.down;
      }
    });
  };

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
