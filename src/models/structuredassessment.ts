/**
 * Created by hamish on 17/2/17.
 */
import {Question} from "./question";
import {Patient} from "./patient";

export class StructuredAssessment {
  title: string;
  patient: Patient;
  questions: Question[];
  answers: string[] = [];
  constructor(title: string, patient: Patient, questions: Question[]) {
    this.title = title;
    this.patient = patient;
    this.questions = questions;
  }
}


