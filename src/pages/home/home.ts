import{Component}from'@angular/core';


import { NavController}from 'ionic-angular';
// import { CheckinPage}from '../checkin/checkin';
// import {TimelinePage}from '../timeline/timeline';
import {MapPage} from '../map/map';
import {HeroesPage} from '../heroes/heroes';
import {StatsPage} from '../stats/stats';
import {FaqPage} from '../faq/faq';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  navPages: Array<{title: string, icon: string, path: string, component: any}>;

  constructor(public navCtrl: NavController) {
    this.navPages = [
      { title: 'Heroes', icon: 'center', path: 'img/TImeline_Stretched-01.png', component: HeroesPage },
      { title: 'Map', icon: 'center', path: 'img/CheckIn-02.svg', component: MapPage },
      { title: 'Statistics', icon: 'center', path: 'img/Adventure_Stretched.svg', component: FaqPage }
    ];

  }

  pushPage(page) {
    this.navCtrl.push(page.component);;
  }


}