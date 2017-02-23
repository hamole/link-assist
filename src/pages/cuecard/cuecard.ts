import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CueCard} from "../../models/cuecard";
import {CueCardService} from "../../services/cuecard.service";
import {CueCardCategory} from "../../models/cuecardcategory";

/*
  Generated class for the Cuecard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cuecard',
  templateUrl: 'cuecard.html'
})
export class CuecardPage implements OnInit{

  cuecard: CueCard;
  cueCardCategory: CueCardCategory;
  cueCardsInCategory: CueCard[];
  categoryDisplay: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cueCardService: CueCardService) {}

  ngOnInit(){
    if(this.navParams.get('category')){
      this.cueCardCategory = this.navParams.get('category');
      this.cueCardsInCategory = this.cueCardService.getAllCueCards().filter((cuecard) => {
        return cuecard.category.name == this.cueCardCategory.name;
      })
      this.categoryDisplay = true;
    } else {
      this.categoryDisplay = false;
    }
    this.cuecard = this.cueCardService.getCurrentCueCard();
  }

  getTitle():string{
    if(this.categoryDisplay){
      return this.cueCardCategory.name
    } else {
      return this.cuecard.englishName
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CuecardPage');
  }

}
