import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})

export class AddCardComponent  {
  @Output() add = new EventEmitter<string>();

  addForm = new FormGroup({
      title: new FormControl()
  });

  onSubmit() {
      this.add.emit(this.addForm.get("title").value);
      this.addForm.reset();
  }

}
