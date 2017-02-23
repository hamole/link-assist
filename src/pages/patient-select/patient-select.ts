import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, NavParams, Nav} from 'ionic-angular';
import {PatientService} from "../../services/patient.service";
import { AlertController } from 'ionic-angular';
import {LangSelectPage} from "../lang-select/lang-select";
import {PatientPage} from "../patient/patient";
import {Patient} from "../../models/patient";

/*
  Generated class for the PatientSelect page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-patient-select',
  templateUrl: 'patient-select.html'
})
export class PatientSelectPage implements OnInit{
  @ViewChild(Nav) nav: Nav;

  searchActive: boolean;
  searchList: Patient[];
  inputVal: string;
  addError: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public patientService: PatientService,
              public alertCtrl: AlertController) {

  }

  ngOnInit(){
    this.searchActive = false;
    this.addError = '';
  }

  getPatients(ev: any){
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.inputVal = val.trim();
      this.searchActive = true;
      this.searchList = this.updateSearchList(this.inputVal);
    } else {
      this.searchActive = false;
    }
  }

  updateSearchList(input: string): Patient[]{
    return this.patientService.getPatientList().filter((patient) => {
      return (patient.urNumber && patient.urNumber.toLowerCase().indexOf(input.toLowerCase()) > -1);
    });
  }

  addPatient(urNumber: string){
    this.patientService.addPatient(urNumber)
      .then(success => {
        this.patientService.setCurrentPatient(urNumber)
          .then(success => {
            this.searchList = this.updateSearchList(this.inputVal);
            this.navCtrl.push(PatientPage)
          })
      })
      .catch(err => {
        let alert = this.alertCtrl.create({
          title: 'Error Adding Patient',
          subTitle: err,
          buttons: ['OK']
        });
        alert.present();
      })
  }

  selectPatient(urNumber: string){
    this.patientService.setCurrentPatient(urNumber)
      .then(success => this.navCtrl.push(PatientPage))
      .catch(err => {
        let alert = this.alertCtrl.create({
          title: 'Error Selecting Patient',
          subTitle: err,
          buttons: ['OK']
        });
        alert.present();
      });
    //this.nav.setRoot();
  }
  removePatient(event: Event,urNumber: string){
    event.stopPropagation();
    this.patientService.removePatient(urNumber);
    this.searchList = this.updateSearchList(this.inputVal);
  }
  noPatient(){
    this.patientService.clearPatientSelection();
    this.navCtrl.setRoot(LangSelectPage);
  }

}
