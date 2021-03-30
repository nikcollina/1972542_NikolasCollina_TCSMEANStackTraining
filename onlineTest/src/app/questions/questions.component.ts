import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { Question } from '../question.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  
  results:Boolean=false;
  questions:Array<Question>=[];
  answers:Array<String>=[];
  result:String="";
  correct:Array<Boolean>=[];
  pass:Boolean=false;
 
  constructor(public qSer:QuestionService) { }

  ngOnInit(): void {
      this.qSer.retrieveTasks().subscribe(result=>this.questions=result,
        error=>console.log(error));

  }

  submitTest(value:any){
    let numCorrect = 0
    for (let i = 0; i < this.answers.length; i++) {
      if (this.answers[i] == this.questions[i].correct) {
        numCorrect++
        this.correct[i]=true
      }
      else {
        this.correct[i]=false
      }
    }
    this.result="Result: "+numCorrect+"/"+this.answers.length
    if (numCorrect >= 7) {
      this.result+=" Pass";
      this.pass=true;
    }
    else {
      this.result+=" Fail";
      this.pass=false;
    }
    this.results=!this.results
  }
  get getIndicies(){
    return Array.from(this.questions.keys());
  }
  toggleResults(){
    this.results = !this.results
    this.answers = []
  }
}