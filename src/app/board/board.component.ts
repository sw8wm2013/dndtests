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

  scrollElements: any;
  columns: any;
  cardsScroll: any;

  addListText: string;
  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  public onAddList: EventEmitter<List>;

  // @ViewChild('scrollthisnow') autoscroll: ElementRef;

  constructor(
    private _listService: ListService,
    private dialog: MatDialog,
    private dragulaService: DragulaService,
    private elRef: ElementRef
  ) {
    this.onAddList = new EventEmitter();
    this._listService.getAllLists();
  }


  ngOnInit(){
    this.dragulaService.createGroup('LIST_GROUP', {
      moves: (el, source, handle) => handle.className === "group-handle"
    });

    console.log('GET THE LISTS!');
    // this.setDefaultLists();
    this._listService.getAllLists()
      .subscribe((data) =>{
        data.forEach(list => {this.lists.push(list)
        });
      });

  }

  ngAfterViewInit(){
    console.log(' BOARD COMPONENT AFTER INIT');
    setTimeout(() => { this.initializeScroll(); }, 500);
    // const elements = Array.from(document.querySelectorAll('.list-wrapper'));
    // console.log('ELEMENTS', elements);
    // autoScroll(elements, {
    //   margin: 30,
    //   maxSpeed: 10,
    //   scrollWhenOutside: false,
    //   autoScroll: function () {
    //     return this.down;
    //   }
    // });
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

  initializeScroll(){
    console.log('INITALIZING SCROLL ON BOARD COMPONENT');
    this.columns = Array.from(this.elRef.nativeElement.querySelectorAll('.list-wrapper'));
    this.scrollElements = autoScroll([...this.columns], {
      margin: 100,
      speed: 800,
      scrollWhenOutside: false,
      autoScroll: function(){
        console.log('scrolling board comp');
        return this.down;
      }
    });
  }

  resetScroll(){
    [...this.columns].forEach(el => this.scrollElements.remove(el));
    this.columns = Array.from(this.elRef.nativeElement.querySelectorAll('.list-wrapper'));
    [...this.columns].forEach(el => this.scrollElements.add(el));
  }


}
