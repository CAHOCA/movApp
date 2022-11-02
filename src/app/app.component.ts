import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  idioma: string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _translate: TranslateService,
    public globalization: Globalization
  ) {
    this.initializeApp();
    this.reconocerIdioma();
    setTimeout(() => {
      let userLang = navigator.language.split('-')[0];
      userLang = /(en|de|it|fr|es|be)/gi.test(userLang) ? userLang : this.idioma;
      this._translate.use(userLang);
      this._translate.setDefaultLang(this.idioma);
    }, 600);
  }

  reconocerIdioma() {
    this.globalization.getPreferredLanguage()
      .then(res => this.idioma = res.value)
      .catch(e => console.log(e));

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
