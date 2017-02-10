import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LangSelectPage } from "../pages/lang-select/lang-select";
import { QuestionPage } from '../pages/question/question';
import { TranslateService } from 'ng2-translate';
import { Question } from '../models/question';
import {QuestionService} from "../services/question.service";


@Component({
  templateUrl: 'app.html',
  providers: [QuestionService]
})
export class MyApp implements OnInit{
  @ViewChild(Nav) nav: Nav;

  rootPage = LangSelectPage;
  pages: Array<{title: string, component: any}>;
  questions: Question[];

  constructor(platform: Platform, translate: TranslateService, public questionService: QuestionService) {
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
    ];

  }
  ngOnInit(){
    this.questions = this.questionService.getAllQuestions();
    this.questionService.setCurrentQuestion(this.questions[0]);
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

}
