import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card, CardList, SortableSpecService } from "../specs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list: CardList;
  @Input() preview = false;
  @Output() addCard = new EventEmitter<string>();

  constructor(public specs: SortableSpecService) { }

  ngOnInit(): void {
  }

  trackById = (_: any, x: Card) =>  x.id;

}
