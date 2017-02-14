/**
 * Created by hamish on 7/2/17.
 */
import { Injectable } from '@angular/core';
import {TranslateService, LangChangeEvent} from "ng2-translate";
import { Question } from '../models/question';
import { QuestionOption } from '../models/questionoption';
import {QuestionCategory} from "../models/questioncategory";

const YES =  new QuestionOption(0,'YES','secondary','answer-button','checkmark');
const NO =  new QuestionOption(1,'NO','danger','answer-button','close');

const GP = new QuestionOption(0,'GP','','answer-button','');

const GENERAL = new QuestionCategory('General');
const CARDIAC = new QuestionCategory('Cardiac');
const GIT = new QuestionCategory('Gastrointestinal');
const PERIPHERAL = new QuestionCategory('Peripheral Vascular');

const CATEGORIES = [
  GENERAL,
  CARDIAC,
  GIT,
  PERIPHERAL,
];


const QUESTIONS= [
  new Question('GLASSES', 'Do you usually wear glasses?',GENERAL,[YES,NO]),
  new Question('HEARING', 'Do you usually wear a hearing aid?',GENERAL,[YES,NO]),
  new Question('DRUGLIST', 'Can you show me which medications you take?',GENERAL,[YES,NO]),
  new Question('HEARTPROBLEM', 'Do you have heart trouble?',CARDIAC,[YES,NO]),
  new Question('HYPERTENSION', 'Do you have high blood pressure?',CARDIAC,[YES,NO]),
  new Question('RHEUMFEVER', 'Have you ever had rheumatic fever?',CARDIAC,[YES,NO]),
  new Question('HEARTIMPLANTS', 'Do you have any implants in your heart?',CARDIAC,[YES,NO]),
  new Question('ANGINA', 'Do you ever have chest pain?',CARDIAC,[YES,NO]),
  new Question('OEDEMA', 'Do you get swelling of your feet or legs?',CARDIAC,[YES,NO]),
  new Question('ABDOPAIN', 'Do you have abdominal pain?',GIT,[YES,NO]),
  new Question('NAUSEA', 'Do you feel nauseous?',GIT,[YES,NO]),
  new Question('VOMITING', 'Have you been vomiting?',GIT,[YES,NO]),
  new Question('DIARRHEA', 'Have you had diarrhea?',GIT,[YES,NO]),
  new Question('APPETITE', 'Have you noticed any changes in your appetite?',GIT,[YES,NO]),
  new Question('CLAUDICATION', 'Do you sometimes get pain in your calves after walking?',PERIPHERAL,[YES,NO]),
  new Question('LEGCRAMPS', 'Do you get cramps in your legs?',PERIPHERAL,[YES,NO]),
  new Question('DVT', 'Have you ever had a clot in your legs before?',PERIPHERAL,[YES,NO]),
];


@Injectable()
export class QuestionService {
  currentLang: string;
  currentQuestion: Question;
  allQuestions: Question[];
  categories: QuestionCategory[];

  constructor(translate: TranslateService) {
    this.currentLang = translate.currentLang;
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
    });
    this.categories = CATEGORIES;
    this.allQuestions = QUESTIONS;
  };

  setCurrentQuestion(question: Question){
    this.currentQuestion = question;
  }

  getCurrentQuestion(){
    return this.currentQuestion;
  }

  getCategories(){
    return this.categories;
  }

  getAllQuestions(){
    return QUESTIONS;
  }
  getQuestionsForCategory(category: QuestionCategory){
    return this.allQuestions.filter(question => question.category == category);
  }
  getQuestionStringsForCategory(category: QuestionCategory) {
    return this.allQuestions.filter(question => question.category == category).map(question => question.englishName);
  }
}
