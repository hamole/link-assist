import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { QuestionCardComponent } from '../components/question-card/question-card'
import {HttpModule, Http} from '@angular/http';
import {TranslateModule, TranslateLoader, TranslateStaticLoader } from "ng2-translate";
import {LangSelectPage} from "../pages/lang-select/lang-select";
import {LangChoiceComponent} from "../components/lang-choice/lang-choice";
import {QuestionPage} from "../pages/question/question";
import {ChatPage} from "../pages/chat/chat";
import {AccordionListComponent} from "../components/accordion-list/accordion-list";
import {QuestionService} from "../services/question.service";
import { Storage } from '@ionic/storage';
import {PatientService} from "../services/patient.service";
import {PatientSelectPage} from "../pages/patient-select/patient-select";
import {PatientPage} from "../pages/patient/patient";

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    LangSelectPage,
    PatientSelectPage,
    PatientPage,
    QuestionCardComponent,
    LangChoiceComponent,
    AccordionListComponent,
    QuestionPage,
    ChatPage,
  ],
  imports: [
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LangSelectPage,
    PatientSelectPage,
    QuestionPage,
    PatientPage,
    ChatPage,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QuestionService,
    PatientService,
    Storage,
  ]
})
export class AppModule {}
