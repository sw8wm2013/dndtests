import { ListService } from './../list/list.service';
import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { List } from '../list/list';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent implements OnInit {
  submitted: boolean = false;
  listForm: FormGroup;
  lists: List[];
  description: string;

  @Input() showForm: boolean;
  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  public onAddList: EventEmitter<List>;


  constructor(
    public fb: FormBuilder,
    private listService: ListService,
    private dialogRef: MatDialogRef<CreateBoardComponent>,
    @Inject(MAT_DIALOG_DATA) data)
   {
    this.mainForm();
    this.onAddList = new EventEmitter();
    this.description = data.description;
   }

  ngOnInit(): void {
    // this.listForm = this.fb.group({
    //   name:['', [Validators.required]],
    // })
  }


  mainForm(){
    this.listForm = this.fb.group({
      name:['', [Validators.required]],
    })
  }

  get myForm(){
    return this.listForm.controls;
  }


  addNewList(){
    this.submitted = true;
    if(!this.listForm.valid){
      return false;
    } else {
      const newList: List = {
        // _id: this.generateRandomId(),
        name: this.listForm.value.name,
      };
      console.log('NEW LIST', newList);
      this.dialogRef.close(this.listForm.value)
      this.listService.createNewList(newList)
      .subscribe(data =>{
        console.log('CREATED NEW LIST?', data);
        this.onAddList.emit(data);
        this.dialogRef.close(data);
      })
    }
    }

    close(){
      this.dialogRef.close()
    }


}
