import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { List } from './list';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list: List;
  displayAddCard = false;


  constructor() { }





  ngOnInit(): void {
  }


}
