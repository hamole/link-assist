import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LangSelectPage } from "../pages/lang-select/lang-select";
import { HearingPage } from "../pages/hearing/hearing"
import { TranslateService } from 'ng2-translate';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = LangSelectPage;
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, translate: TranslateService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');
      // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use('en');
    });
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Language Selection', component: LangSelectPage },
      { title: 'Do you need glasses?', component: HomePage },
      { title: 'Do you need a hearing aid?', component: HearingPage },
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
