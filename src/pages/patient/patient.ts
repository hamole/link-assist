import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PatientService} from "../../services/patient.service";
import {LangSelectPage} from "../lang-select/lang-select";
import {PatientSelectPage} from "../patient-select/patient-select";
import {Question} from "../../models/question";
import {QuestionOption} from "../../models/questionoption";
import {QuestionCategory} from "../../models/questioncategory";
import {StructuredAssessment} from "../../models/structuredassessment";
import {AssessmentPage} from "../assessment/assessment";

/*
  Generated class for the Patient page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-patient',
  templateUrl: 'patient.html'
})
export class PatientPage implements OnInit{
  constructor(public navCtrl: NavController, public navParams: NavParams, public patientService: PatientService) {}

  ngOnInit(){
    if(this.navParams.get('selectedLang')){
      this.basicAssessmentCallback(this.navParams.get('selectedLang'));
    }
    if(this.navParams.get('completedAssessment')){
      this.saveBasicAssessment(this.navParams.get('completedAssessment'));
    }
  }

  startBasicAssessment(){
    this.navCtrl.push(LangSelectPage, {patient: this.patientService.getCurrentPatient(), callback: this.basicAssessmentCallback})
  }

  basicAssessmentCallback(lang: string){
    const YES =  new QuestionOption(0,'YES','secondary','answer-button','checkmark');
    const NO =  new QuestionOption(1,'NO','danger','answer-button','close');

    const GENERAL = new QuestionCategory('General');
    let hearing = new Question('GLASSES', 'Do you usually wear glasses?',GENERAL,[YES,NO]);
    let vision = new Question('HEARING', 'Do you usually wear a hearing aid?',GENERAL,[YES,NO]);

    let questions = [hearing, vision];
    let basicAssessment = new StructuredAssessment('Basic Assessment', this.patientService.getCurrentPatient(),questions);
    this.navCtrl.push(AssessmentPage, {assessment: basicAssessment, callbackPage: PatientPage});
  }

  saveBasicAssessment(assessment: StructuredAssessment){
    console.log(assessment);
    this.patientService.addAssessment(assessment);
  }

  changePatient(){
    this.navCtrl.setRoot(PatientSelectPage);
  }
}
