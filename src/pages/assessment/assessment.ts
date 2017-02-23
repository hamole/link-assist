import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {StructuredAssessment} from "../../models/structuredassessment";
import {Question} from "../../models/question";
import {TranslateService} from "ng2-translate";

/*
  Generated class for the Assessment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-assessment',
  templateUrl: 'assessment.html'
})
export class AssessmentPage implements OnInit{

  assessment: StructuredAssessment;
  questionIndex: number;
  currentQuestion: Question;
  callbackPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService) {}

  ngOnInit(){
    this.assessment = this.navParams.get('assessment');
    this.callbackPage = this.navParams.get('callbackPage');
    this.currentQuestion = this.assessment.questions[0];
    this.questionIndex = 0;
  }

  nextQuestion(answer: string){
    this.assessment.answers.push(answer);
    this.questionIndex++;
    if(this.questionIndex > this.assessment.questions.length - 1){
      this.translate.use('en');
      this.navCtrl.setRoot(this.callbackPage, {'completedAssessment': this.assessment});
    } else {
      this.currentQuestion = this.assessment.questions[this.questionIndex];
    }
  }


}
