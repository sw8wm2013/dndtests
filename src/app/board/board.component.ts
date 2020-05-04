import { CreateBoardComponent } from './../create-board/create-board.component';
import { ListService } from './../list/list.service';

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { List } from '../list/list';
import { Card } from '../card/card';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContainerComponent, DraggableComponent } from 'ngx-smooth-dnd';
import { CommonUtilsService } from '../services/common-utils.service';
import { DataService } from '../services/data.service';



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  scene: any;
  defaultLists: List[];
  lists: List[] = [];
  showForm: boolean = false;

  addListText: string;
  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  public onAddList: EventEmitter<List>;

  constructor(
    private listService: ListService,
    private dialog: MatDialog,
    private commonUtilsService: CommonUtilsService,
    private dataService: DataService
  ) {
    this.onAddList = new EventEmitter();
    this.listService.getAllLists();
  }


  ngOnInit(){
    console.log('GET THE LISTS!');
    this.scene = this.dataService.getSmoothScrollData();
    console.log('THIS SCENE', this.scene);
    // this.setDefaultLists();
    // this.listService.getAllLists()
    //   .subscribe((data) =>{
    //     data.forEach(list => {this.lists.push(list)
    //     });
    //   }

    //   )

  }

  onColumnDrop(dropResult: any) {
    const scene = Object.assign({}, this.scene);
    scene.children = this.commonUtilsService.applyDrag(scene.children, dropResult);
    this.scene = scene;
  }

  // onListDrop(dropResult: any) {
  //   const scene = Object.assign({}, this.scene);
  //   scene.children = this.commonUtilsService.applyDrag(scene.children, dropResult);
  //   this.scene = scene;
  // }

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
