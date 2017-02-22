/**
 * Created by hamish on 7/2/17.
 */

export class Patient {
  urNumber: string;
  preferredLanguage: string;
  assessments: any;
  constructor(urNumber: string) {
    this.urNumber = urNumber;
  }
}


