import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ConnectivityService } from '../providers/connectivity-service';

import { HomePage } from '../pages/home/home';
// import { LegalPage } from '../pages/legal/legal';
import { ProfilePage } from '../pages/profile/profile';
// import { PebblPage } from '../pages/pebbl/pebbl';
import { FaqPage } from '../pages/faq/faq';
// import { CheckinPage } from '../pages/checkin/checkin';
// import { TimelinePage } from '../pages/timeline/timeline';
// import { AdventuresPage } from '../pages/adventures/adventures';
import { BluetoothPage } from '../pages/bluetooth/bluetooth';
import { DevicePage } from '../pages/device/device';
import { MapPage } from '../pages/map/map';
import { StatsPage } from '../pages/stats/stats';
import { HeroesPage } from '../pages/heroes/heroes';

//import services
// import {TimelineService} from '../pages/timeline/timeline.service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // LegalPage,
    ProfilePage,
    // PebblPage,
    FaqPage,
    // CheckinPage,
    // TimelinePage,
    // AdventuresPage,
    BluetoothPage,
    DevicePage,
    MapPage,
    StatsPage,
    HeroesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    // LegalPage,
    ProfilePage,
    // PebblPage,
    FaqPage,
    // CheckinPage,
    // TimelinePage,
    // AdventuresPage,
    BluetoothPage,
    DevicePage,
    MapPage,
    StatsPage,
    HeroesPage
  ],
  providers: [ConnectivityService]
  // providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
