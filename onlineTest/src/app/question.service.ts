import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from "./question.model";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(public http:HttpClient) { }

  retrieveTasks():Observable<Question[]>{
    return this.http.get<Question[]>("http://localhost:3000/Questions");
  }

}
