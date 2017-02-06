import { Component, Input, Output, EventEmitter } from '@angular/core';
import {LangOption} from "../../models/langoption";

/*
  Generated class for the LangChoice component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'lang-choice',
  templateUrl: 'lang-choice.html'
})
export class LangChoiceComponent {

  @Input()
  langOption: LangOption;

  @Output()
  clicked: EventEmitter<LangOption> = new EventEmitter<LangOption>();

  constructor() {
    console.log('Hello LangChoice Component');
  }
  cardClicked(){
    this.clicked.emit(this.langOption);
  }
}
