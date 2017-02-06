import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { QuestionCardComponent } from '../components/question-card/question-card'
import { HearingPage } from "../pages/hearing/hearing";
import { PreviousVisitPage } from "../pages/previous-visit/previous-visit";
import {HttpModule, Http} from '@angular/http';
import {TranslateModule, TranslateLoader, TranslateStaticLoader } from "ng2-translate";
import {LangSelectPage} from "../pages/lang-select/lang-select";
import {LangChoiceComponent} from "../components/lang-choice/lang-choice";

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HearingPage,
    PreviousVisitPage,
    LangSelectPage,
    QuestionCardComponent,
    LangChoiceComponent,
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
    HomePage,
    HearingPage,
    PreviousVisitPage,
    LangSelectPage,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
