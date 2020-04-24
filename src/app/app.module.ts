import { SortableSpecService } from './specs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SkyhookDndModule } from "@angular-skyhook/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SkyhookMultiBackendModule } from "@angular-skyhook/multi-backend";
import { SkyhookSortableModule } from "@angular-skyhook/sortable";


import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { ListComponent } from './list/list.component';
import { AddCardComponent } from './add-card/add-card.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CardComponent,
    ListComponent,
    AddCardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SkyhookDndModule,
    SkyhookMultiBackendModule,
    SkyhookSortableModule,
    ReactiveFormsModule,
  ],
  providers: [SortableSpecService],
  bootstrap: [AppComponent]
})
export class AppModule { }
