/**
 * Created by Hamish on 22/02/2017.
 */
/**
 * Created by hamish on 7/2/17.
 */
import { Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent} from "ng2-translate";
import { CueCard } from '../models/cuecard';
import {CueCardCategory} from "../models/cuecardcategory";
import {CUECARDS,CATEGORIES} from "../data/cuecards";

@Injectable()
export class CueCardService {
  currentLang: string;
  currentCueCard: CueCard;
  allCueCards: CueCard[];
  categories: CueCardCategory[];

  constructor(translate: TranslateService) {
    this.currentLang = translate.currentLang;
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
    });
    this.categories = CATEGORIES;
    this.allCueCards = CUECARDS;
  };

  setCurrentCueCard(CueCard: CueCard){
    this.currentCueCard = CueCard;
  }

  getCurrentCueCard(){
    return this.currentCueCard;
  }

  getCategories(){
    return this.categories;
  }

  getAllCueCards(){
    return this.allCueCards;
  }
  getCueCardsForCategory(category: CueCardCategory){
    return this.allCueCards.filter(CueCard => CueCard.category == category);
  }
  getCueCardStringsForCategory(category: CueCardCategory) {
    return this.allCueCards.filter(CueCard => CueCard.category == category).map(CueCard => CueCard.englishName);
  }
}
