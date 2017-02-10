/**
 * Created by hamish on 7/2/17.
 */
import { Injectable } from '@angular/core';
import {TranslateService, LangChangeEvent} from "ng2-translate";
import { Question } from '../models/question';
import { QuestionOption } from '../models/questionoption';

const YES =  new QuestionOption(0,'YES','secondary','answer-button','checkmark');
const NO =  new QuestionOption(1,'NO','danger','answer-button','close');

const GP = new QuestionOption(0,'GP','','answer-button','');



const QUESTIONS= [
  new Question('GLASSES', 'Do you usually wear glasses?',[YES,NO]),
  new Question('HEARING', 'Do you usually wear a hearing aid?',[YES,NO])
];


@Injectable()
export class QuestionService {
  currentLang: string;
  currentQuestion: Question;

  constructor(translate: TranslateService) {
    this.currentLang = translate.currentLang;
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
    });
  };

  setCurrentQuestion(question: Question){
    this.currentQuestion = question;
  }

  getCurrentQuestion(){
    return this.currentQuestion;
  }
  getAllQuestions(){
    return QUESTIONS;
  }
}
