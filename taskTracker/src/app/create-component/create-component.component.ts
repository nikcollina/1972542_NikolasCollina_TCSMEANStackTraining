import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-create-component',
  templateUrl: './create-component.component.html',
  styleUrls: ['./create-component.component.css']
})
export class CreateComponentComponent implements OnInit {

  constructor(public taskSer:TaskService) { }

  ngOnInit(): void {
  }

  storeTask(taskRef:any) {
    this.taskSer.storeTask(taskRef);
  }
}
