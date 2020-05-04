
import { Component, OnInit, Input, Output, EventEmitter, Optional, ElementRef, ViewChild } from '@angular/core';

import { SortableSpecService, CardList, Card } from '../spec';
import { SkyhookSortableRenderer } from '@angular-skyhook/sortable';

import autoScroll from 'dom-autoscroller';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent  {

  @Input() list: CardList;
  @Input() preview = false;
  @Output() addCard = new EventEmitter<string>();

  @ViewChild('card') card: ElementRef;
  scrollElements: any;
  cardScroll: any;

  // we won't use these, but you can listen to any old monitor state if you like.
  // there is a shortcut for m.isDragging() for use in a template, called render?.isDragging$
  placeholder$ = this.render && this.render.source.listen(m => m.isDragging());
  isOver$ = this.render && this.render.target.listen(m => m.canDrop() && m.isOver());

  // You can inject any attached directives in a component
  // - When in the <skyhook-preview>, the directive isn't attached, so make it @Optional()
  // - Also must be public if you're using it in your template, until the Ivy renderer lands
  constructor(
      public specs: SortableSpecService,
      @Optional() public render: SkyhookSortableRenderer<CardList>,
      private elRef: ElementRef,
  ) { }

  trackById = (_: any, x: Card) =>  x.id;


  ngAfterViewInit(){
    console.log(' BOARD COMPONENT AFTER INIT');
    setTimeout(() => { this.initializeScroll(); }, 500);
  };

  initializeScroll(){
    console.log('INITALIZING SCROLL ON BOARD COMPONENT');
    // this.cardScroll = Array.from(this.elRef.nativeElement.querySelectorAll('.card-handle'));
    this.cardScroll = this.card;
    console.log('CARD SCROLL', this.card);
    this.scrollElements = autoScroll([...this.cardScroll], {
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
    [...this.cardScroll].forEach(el => this.scrollElements.remove(el));
    this.cardScroll = Array.from(this.elRef.nativeElement.querySelectorAll('.list-wrapper'));
    [...this.cardScroll].forEach(el => this.scrollElements.add(el));
  }


}
