import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import {Question} from "../../models/question";
import { File } from 'ionic-native';
import { Platform } from 'ionic-angular';
declare var cordova: any;

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

  @Output() choice: EventEmitter<string> = new EventEmitter<string>();

  @Input() question: Question;

  hasImage: any;

  constructor(public platform: Platform, private audioService: AudioService) {
    console.log('Hello QuestionCard Component');
  }

  ngOnInit() {
    this.doesFileExist(`assets/images/`,`${this.question.key}.jpg`)
  }
  doesFileExist(path: string, file: string)
  {
    if (this.platform.is('cordova')) {
      const fs:string = cordova.file.applicationDirectory;
      console.log(fs);
      File.checkFile(fs + "www/" + path, `${this.question.key}.jpg`)
        .then(result => this.hasImage = result, err => this.hasImage = false);
    } else {
      let xhr = new XMLHttpRequest();
      xhr.open('HEAD', path + file, false);
      xhr.send();

      if (xhr.status == 404) {
        this.hasImage = false;
      } else {
        this.hasImage = true;
      }
    }
  }

  choiceMade(option: string) {
    this.choice.emit(option);
  }

  playAudio(){
    this.audioService.play(this.question.key);
  }
}
