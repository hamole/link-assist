import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {QuestionService} from "../../services/question.service";
import {Question} from "../../models/question";

/*
  Generated class for the Question page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage implements OnInit{
  question: Question;

  constructor(public navCtrl: NavController, public navParams: NavParams, public questionService: QuestionService) {}

  ngOnInit(){
    console.log(this.questionService.getAllQuestions());
    console.log('Current q:' + this.questionService.getCurrentQuestion());
    this.question = this.questionService.getCurrentQuestion();
    console.log('Question page has q:' + this.question.englishName);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }

}
