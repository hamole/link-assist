import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { File } from 'ionic-native';
import { Platform } from 'ionic-angular';
import {CueCard} from "../../models/cuecard";
declare var cordova: any;

/*
 Generated class for the CueCard component.

 See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 for more info on Angular 2 Components.
 */
@Component({
  selector: 'cuecard',
  templateUrl: 'cuecard.html',
})
export class CueCardComponent implements OnInit {

  //@Output() choice: EventEmitter<string> = new EventEmitter<string>();

  @Input() cuecard: CueCard;

  hasImage: any;

  constructor(public platform: Platform) {
    console.log('Hello CueCard Component');
  }

  ngOnInit() {
    this.doesFileExist(`assets/images/cuecards/`,`${this.cuecard.key}.PNG`)
  }
  doesFileExist(path: string, file: string)
  {
    if (this.platform.is('cordova')) {
      const fs:string = cordova.file.applicationDirectory;
      console.log(fs);
      File.checkFile(fs + "www/" + path, file)
        .then(result => console.log(result), err => this.hasImage = false);
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

  //choiceMade(option: string) {
  //  this.choice.emit(option);
  //}

}
