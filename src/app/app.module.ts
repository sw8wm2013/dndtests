import { ListService } from './list/list.service';
import { SortableSpecService } from './specs';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { SkyhookDndModule } from "@angular-skyhook/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SkyhookMultiBackendModule } from "@angular-skyhook/multi-backend";
import { SkyhookSortableModule } from "@angular-skyhook/sortable";
import { default as HTML5Backend } from 'react-dnd-html5-backend';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { ListComponent } from './list/list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateBoardComponent } from './create-board/create-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CardComponent,
    ListComponent,
    CreateBoardComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SkyhookDndModule.forRoot({ backend: HTML5Backend }),
    SkyhookMultiBackendModule,
    SkyhookSortableModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  providers: [
    SortableSpecService,
    ListService,
  {
    provide: MatDialogRef,
    useValue: {}
  },
  {
    provide:MAT_DIALOG_DATA,
    useValue:{}
  }],
  bootstrap: [AppComponent],
  entryComponents: [CreateBoardComponent]
})
export class AppModule { }
