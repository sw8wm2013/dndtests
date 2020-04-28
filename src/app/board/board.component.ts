import { ListService } from './../list/list.service';

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { List } from '../list/list';
import { Card } from '../card/card';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  lists: List[];
  showForm: boolean = false;

  addListText: string;
  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  public onAddList: EventEmitter<List>;

  constructor(
    private _listService: ListService,
  ) {
    this.onAddList = new EventEmitter();
  }


  ngOnInit(){

  }

  toggleNewListInput(){

    this.showForm = !this.showForm;
    console.log('Add new list has been clicked', this.showForm );

  }


}
