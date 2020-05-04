import { Component, OnInit } from '@angular/core';
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import { DataService } from './services/data.service';
import { CommonUtilsService } from './services/common-utils.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cardboard-sandbox';

  scene: any;


  constructor(
    // private commonUtilsService: CommonUtilsService,
    // private dataService: DataService
  ){}

  ngOnInit(){
    // this.scene = this.dataService.getSmoothScrollData();

  }

}
