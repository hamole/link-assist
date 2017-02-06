import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import {TranslateService, LangChangeEvent} from "ng2-translate";

@Injectable()
export class AudioService {
  currentLang: string;

  constructor(public plt: Platform, translate: TranslateService) {
    this.currentLang = translate.currentLang;
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
    });
  };

  play(key: string) {
    let audio = new Audio(`assets/audio/${this.currentLang}/${key.toLowerCase()}.mp3`);
    audio.play();
  };
}
