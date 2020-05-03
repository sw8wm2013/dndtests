import { Component, ElementRef } from '@angular/core';
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import { spillTarget } from '@angular-skyhook/sortable';
import { ItemTypes } from './item-types';
import { SkyhookDndService } from '@angular-skyhook/core';
import { Card } from './spec';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cardboard-sandbox';
  faTrash = faTrash;

  cardSpill = spillTarget<Card>(this.dnd, ItemTypes.CARD, {
    // see implementation details in store.ts
    // hover: item => this.store.dispatch(new Spill(item)),
    // can also add a drop method, useful for 'remove on spill' functionality
    // drop: item => this.store.dispatch(new RemoveCard(item))
});

  constructor(
      private dnd: SkyhookDndService,
      private el: ElementRef,
  ) { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
      // spill = anywhere in this container component
      // could easily be document.body
      // this.cardSpill.connectDropTarget(this.el.nativeElement);
  }
  ngOnDestroy() {
      // it's a regular drop target! don't forget to unsubscribe.
      this.cardSpill.unsubscribe();
  }
}

