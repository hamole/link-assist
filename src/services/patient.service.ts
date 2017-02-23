import {Injectable, OnInit} from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import {TranslateService, LangChangeEvent} from "ng2-translate";
import {Patient} from "../models/patient";

@Injectable()
export class PatientService{
  patientList: Patient[];
  assessments: any[];
  currentPatient: Patient;
  noPatient: boolean;


  constructor(public storage: Storage) {
    //storage.clear();
    console.log('Why no log');
    this.storage.get('patientList').then((val) => {
      if(val == null){
        this.patientList = [];
      } else {
        this.patientList = val;
      }
      console.log(this.patientList)
    });

    this.storage.get('assessments').then((val) => {
      if(val == null){
        this.assessments = [];
      } else {
        this.assessments = val;
        console.log(this.assessments);
      }
    });


  };
  updatedPatient(patient: Patient){
    let index = this.patientList.findIndex(p => p.urNumber == patient.urNumber);
    console.log(patient)
    this.patientList[index] = patient;
    console.log(this.patientList[index]);
    console.log(this.patientList);
    this.storage.set('patientList',this.patientList);
  }
  getCurrentPatient(){
    return this.currentPatient;
  }

  getBasicAssessment(){
    return this.assessments.find(assessment => assessment.patient.urNumber == this.currentPatient.urNumber && assessment.title == 'Basic Assessment')
  }

  setCurrentPatient(urNumber: string): Promise<string>{
    return new Promise<string>((resolve,reject) => {
      if(this.patientList.findIndex(patient => patient.urNumber == urNumber) == -1){
        return reject("There is no patient with that UR number in the patient list");
      } else {
        this.currentPatient = this.patientList.find(patient => patient.urNumber == urNumber);
        this.noPatient = false;
        if(this.assessments.findIndex(assessment =>
            (assessment.patient.urNumber == this.currentPatient.urNumber && assessment.title == 'Basic Assessment')
        ) != -1) {
          this.currentPatient.hasBasicAssesment = true;
        }
        return resolve("success");
      }
    });

  }
  addAssessment(assessment: any){
    this.assessments.push(assessment);
    if(assessment.patient.urNumber == this.currentPatient.urNumber && assessment.title == 'Basic Assessment'){
      this.currentPatient.hasBasicAssesment = true;
      this.updatedPatient(this.currentPatient);
    }
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
      if(this.patientList.findIndex(patient => patient.urNumber == urNumber) != -1){
        return reject("A patient with that urNumber already exists");
      }
      if(urNumber.length != 8){
        return reject("Invalid UR Number length");
      }
      if(urNumber.match(/^[0-9]+$/) == null){
        return reject("UR Numbers should only contain numbers")
      }
      this.patientList.push(new Patient(urNumber));
      this.storage.set('patientList',this.patientList);
      return resolve("success");
    });
  }

  removePatient(urNumber: string){
    //this.assessments = this.assessments.filter(assessment => assessment.urNumber != urNumber);
    //this.storage.set('assessments',this.assessments).then(complete => {
      this.patientList = this.patientList.filter(patient => patient.urNumber != urNumber);
      this.storage.set('patientList',this.patientList)
   // },);
  }
  clearPatientSelection(){
    this.currentPatient = null;
    this.noPatient = true;
  }
}
