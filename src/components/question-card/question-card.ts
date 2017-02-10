import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import {Question} from "../../models/question";

/*
  Generated class for the QuestionCard component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'question-card',
  templateUrl: 'question-card.html',
  providers: [AudioService]
})
export class QuestionCardComponent implements OnInit {

  @Output()
  choice: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  question: Question;


  constructor(private audioService: AudioService) {
    console.log('Hello QuestionCard Component');
  }

  ngOnInit() {
  }
  choiceMade(option: string) {
    this.choice.emit(option);
  }

  playAudio(){
    this.audioService.play(this.question.key);
  }
}
