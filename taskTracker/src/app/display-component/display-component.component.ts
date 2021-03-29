import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-display-component',
  templateUrl: './display-component.component.html',
  styleUrls: ['./display-component.component.css']
})
export class DisplayComponentComponent implements OnInit {
  tasks:Array<Task>=[];
  displayedColumns: string[] = ['id', 'name', 'task', 'deadline'];
  dataSource = this.tasks;
  constructor(public taskSer:TaskService) { }

  ngOnInit(): void {
    this.taskSer.retrieveTasks().subscribe(result=>this.tasks=result,
      error=>console.log(error));
  }
  
}

