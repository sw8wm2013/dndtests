import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import { DragulaService } from 'ng2-dragula';

import autoScroll from 'dom-autoscroller';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'cardboard-sandbox';


  @ViewChild('autscroll') autoscroll: ElementRef;

  // characters = [
  //   {id: 1, firstName: 'Jeffery', lastName: 'Houser'},
  //   {id: 2, firstName: 'Annie', lastName: 'Anderson'},
  //   {id: 3, firstName: 'Bob', lastName: 'Boberson'},
  //   {id: 4, firstName: 'Candy', lastName: 'Canderson'},
  //   {id: 5, firstName: 'Davey', lastName: 'Daverson'},
  //   {id: 6, firstName: 'Kacey', lastName: 'Musgraves'},
  //   {id: 7, firstName: 'Maggie', lastName: 'Rogers'},
  //   {id: 8, firstName: 'Taylor', lastName: 'Swift'},
  //   {id: 5, firstName: 'Ellie', lastName: 'Goulding'},
  //   {id: 5, firstName: 'Sara', lastName: 'B'},
  //   {id: 5, firstName: 'Phoebe', lastName: 'Bridgers'},
  //   {id: 5, firstName: 'Busy', lastName: 'Phillips'},
  //   {id: 5, firstName: 'Jenny', lastName: 'Mollen'},
  //   {id: 5, firstName: 'Samantha', lastName: 'Irby'},

  // ]

  // constructor(private dragulaService: DragulaService){}



  ngOnInit(){



  }

  ngAfterViewInit(){

    // const elements = Array.from(document.querySelectorAll('.wrapper'));
    // console.log('ELEMENTS', elements);
    // autoScroll(elements, {
    //   margin: 30,
    //   maxSpeed: 10,
    //   scrollWhenOutside: false,
    //   autoScroll: function () {
    //     return this.down;
    //   }
    // });
  }
}
