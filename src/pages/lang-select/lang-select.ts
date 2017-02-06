import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LangOption } from "../../models/langoption";
import { TranslateService } from 'ng2-translate';
import { MenuController } from 'ionic-angular';
/*
  Generated class for the LangSelect page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
const LANGS: LangOption [] = [
  {iso: 'en', name: 'English', iconPath: 'https://flags.fmcdn.net/data/flags/normal/au.png'},
  {iso: 'el', name: 'Ελληνικά', iconPath: 'https://flags.fmcdn.net/data/flags/normal/gr.png'},
];

@Component({
  selector: 'page-lang-select',
  templateUrl: 'lang-select.html'
})
export class LangSelectPage {
  languages = LANGS;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public translate: TranslateService, public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LangSelectPage');
  }

  langSelected(lang: LangOption){
    console.log('Selected: ' + lang.name);
    this.translate.use(lang.iso);
    this.menuCtrl.open();
  }
}
