import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
/*
  Generated class for the Hearing page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-hearing',
  templateUrl: 'hearing.html'
})
export class HearingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {}

  question = "HEARING"

  ionViewDidLoad() {
    console.log('ionViewDidLoad HearingPage');
  }

  logChoice(event){
    console.log(event);
    this.menuCtrl.open();
  }
}
