import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LangSelectPage } from "../pages/lang-select/lang-select";
import { QuestionPage } from '../pages/question/question';
import { ChatPage } from '../pages/chat/chat';
import { TranslateService } from 'ng2-translate';
import { Question } from '../models/question';
import {QuestionService} from "../services/question.service";
import {QuestionCategory} from "../models/questioncategory";
import {PatientSelectPage} from "../pages/patient-select/patient-select";
import { PatientService } from "../services/patient.service";
import {CueCardCategory} from "../models/cuecardcategory";
import {CueCard} from "../models/cuecard";
import {CueCardService} from "../services/cuecard.service";
import {CuecardPage} from "../pages/cuecard/cuecard";


@Component({
  templateUrl: 'app.html',
})
export class MyApp implements OnInit{
  @ViewChild(Nav) nav: Nav;

  rootPage = LangSelectPage;
  langSelect: {title: 'Language Selection', component: LangSelectPage};
  pselect = {title: 'Patient Select', component: PatientSelectPage};
  pages: Array<{title: string, component: any}>;
  questionCategories: QuestionCategory[];
  questions: Question[];
  cueCardCategories: CueCardCategory[];
  cuecards: CueCard[];
  searchActive: Boolean;
  //searchItems: Question[];
  searchItems: any[];
  segment: string;
  inputVal: string;

  constructor(platform: Platform,
              translate: TranslateService,
              public questionService: QuestionService,
              public patientService: PatientService,
              public cueCardService: CueCardService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');
      // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use('en');
    });
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Language Selection', component: LangSelectPage },
      { title: 'Conversational Health Assessment Tool (CHAT)', component: ChatPage}
    ];

  }
  ngOnInit(){
    this.searchActive = false;
    this.segment = 'cuecards';
    this.questionCategories = this.questionService.getCategories();
    this.questions = this.questionService.getAllQuestions();
    this.questionService.setCurrentQuestion(this.questions[0]);
    this.cueCardCategories = this.cueCardService.getCategories();
    this.cuecards = this.cueCardService.getAllCueCards();
    this.cueCardService.setCurrentCueCard(this.cuecards[0]);
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  openQuestionPage(question: Question){
    console.log(question);
    this.questionService.setCurrentQuestion(question);
    console.log(this.questionService.getCurrentQuestion());
    this.nav.setRoot(QuestionPage);
  }
  openCueCardPage(cuecard: CueCard){
    console.log(cuecard);
    this.cueCardService.setCurrentCueCard(cuecard);
    console.log(this.cueCardService.getCurrentCueCard());
    this.nav.setRoot(CuecardPage);
  }

  openComponentPage(component: any){
    if(this.segment == 'cuecards'){
      this.openCueCardPage(component);
    } else if(this.segment == 'questions') {
      this.openQuestionPage(component);
    }
  }
  getSearchItems(val: string) {
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.inputVal = val;
      this.searchActive = true;
      if(this.segment == 'cuecards'){
        this.searchItems = this.cueCardService.getAllCueCards().filter((cuecard) => {
          return (cuecard.englishName.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      } else if(this.segment == 'questions'){
        this.searchItems = this.questionService.getAllQuestions().filter((question) => {
         return (question.englishName.toLowerCase().indexOf(val.toLowerCase()) > -1);
         })
      }
    } else {
      this.searchActive = false;
    }
  }
  segmentChanged(){
    this.getSearchItems(this.inputVal);
  }
  openMenuItem(item: string){
    if(this.segment == 'cuecards'){
      let selected = this.cueCardService.getAllCueCards().find((cuecard) => {
        return cuecard.englishName == item;
      })
      this.openCueCardPage(selected);
    } else if(this.segment == 'questions'){
      let selected = this.questionService.getAllQuestions().find((question) => {
        return question.englishName == item;
      })
      this.openQuestionPage(selected);
    }

  }

  pageStrings(){
    return this.pages.map(page => page.title);
  }

  openPageByString(title: string){
    let page = this.pages.find(p => p.title == title);
    this.openPage(page);
  }

  openCueCardCategory(category: CueCardCategory){
    this.nav.setRoot(CuecardPage,{category: category});
  }
}
