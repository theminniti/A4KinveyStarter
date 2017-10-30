import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Kinvey } from 'kinvey-angular2-sdk';
import { Propelics } from './app/propelics';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Initialize Kinvey for DEV environment
// is this where initialization code should actually go?
const config = {
  apiHostname: Propelics.apiHostname,
  appKey: Propelics.appKey,
  appSecret: Propelics.appSecret
};

Kinvey.initialize(config)
.then(() => {
  enableProdMode();
  platformBrowserDynamic().bootstrapModule(AppModule);
});

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.log(err));
