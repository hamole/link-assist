import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import {TranslateService, LangChangeEvent} from "ng2-translate";

@Injectable()
export class PatientService {
  patientList: string[];
  assessments: any[];
  currentPatient: string;
  noPatient: boolean;


  constructor(public storage: Storage) {
    storage.get('patientList').then((val) => {
      if(val == null){
        this.patientList =[''];
      } else {
        this.patientList = val
      }
    });

    storage.get('assesssments').then((val) => {
      this.assessments = val
    });
    this.currentPatient = '';
  };

  getCurrentPatient(){
    return this.currentPatient;
  }

  setCurrentPatient(urNumber: string): Promise<string>{
    return new Promise<string>((resolve,reject) => {
      if(this.patientList.findIndex(patient => patient == urNumber) == -1){
        return reject("There is no patient with that UR number in the patient list");
      } else {
        this.currentPatient = urNumber;
        this.noPatient = false;
        return resolve("success");
      }
    });

  }
  addAssessment(assessment: any){
    this.assessments.push(assessment);
    this.storage.set('assessments',this.assessments);
  }

  removeAssessment(assessment: any){
    this.assessments = this.assessments.filter(a => a != assessment);
    this.storage.set('assessments',this.assessments);
  }

  getPatientList(){
    return this.patientList;
  }
  addPatient(urNumber: string): Promise<string>{
    return new Promise<string>((resolve,reject) => {
      if(this.patientList.findIndex(patient => patient == urNumber) != -1){
        return reject("A patient with that urNumber already exists");
      }
      if(urNumber.length != 8){
        return reject("Invalid UR Number length");
      }
      if(urNumber.match(/^[0-9]+$/) == null){
        return reject("UR Numbers should only contain numbers")
      }
      this.patientList.push(urNumber);
      this.storage.set('patientList',this.patientList);
      return resolve("success");
    });
  }

  removePatient(urNumber: string){
    //this.assessments = this.assessments.filter(assessment => assessment.urNumber != urNumber);
    //this.storage.set('assessments',this.assessments).then(complete => {
      this.patientList = this.patientList.filter(patient => patient != urNumber);
      this.storage.set('patientList',this.patientList)
   // },);
  }
  clearPatientSelection(){
    this.currentPatient = '';
    this.noPatient = true;
  }
}
