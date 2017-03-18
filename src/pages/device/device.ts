import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {BLE} from 'ionic-native';
import { Geolocation } from 'ionic-native';

declare var google;

/*
  Generated class for the Device page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

Geolocation.getCurrentPosition().then(pos => {
  console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
});

let watch = Geolocation.watchPosition().subscribe(pos => {
  console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
});

@Component({
  selector: 'page-device',
  templateUrl: 'device.html'
})
export class DevicePage {
  characteristics: any;
  connecting: boolean;
  latlon_data: any;
  heroes: any;
  gps_data = [];
  a = '';
  index = 0;
  coordinates = '';
  clean_coordinates = '';
  index_N = 0;
  index_W = 0;
  latitude = 0.0;
  longitude = 0.0;

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let device = this.navParams.get('device');
    this.connecting = true;
    this.connect(device.id);
    this.latlon_data = ["hello","me","foop"];
    this.heroes = "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevicePage');
  }

  connect(deviceID) {
    this.characteristics = [];
    BLE.connect(deviceID).subscribe(peripheralData => {
      console.log("peripheralData:" + JSON.stringify(peripheralData));
      console.log("peripheralData.characteristics: " + JSON.stringify(peripheralData.characteristics));
      
      // BLE.read(deviceID, 'FFE0', 'FFE1').then(function (buffer) {
      //                       var data = new Uint8Array(buffer);
      //                       console.log("BLE.read start")
      //                       console.log(String.fromCharCode.apply(null,data));
      //                       console.log("BLE.read end")
      //                   }, function (error) {
      //                       console.log("## ERROR READ ##" + error);
      //                   });

      let subscription = BLE.startNotification(deviceID, "FFE0", "FFE1");
      subscription.subscribe(data => {
           this.getlatlong(this.bytesToString(data));
           this.latlon_data.push("meow");
       });
      this.characteristics = peripheralData.characteristics;
      this.connecting = false;
    },
    peripheralData => {
      console.log('disconnected');
    }
  );
  }

  getlatlong(string) {
    this.gps_data.push(string);
    this.a = this.gps_data.join();
    this.a = this.a.replace(/,/g, '');
    this.index = this.a.indexOf("$GPGLL");
    this.coordinates = this.a.slice(this.index+6,this.index+29);
    this.index_N = this.coordinates.indexOf("N");
    this.index_W = this.coordinates.indexOf("W");
    this.latitude = parseFloat(this.coordinates.slice(0,this.index_N))/100;
    this.longitude = parseFloat(this.coordinates.slice(this.index_N+1,this.index_W))/100;

    console.log("this is the lat: " + this.latitude);
    console.log("this is the lon: " + this.longitude);
    console.log("this is the   a: " + this.a);
    console.log("from button: " + this.a[0]);
    // console.log(this.gps_data[1]);
    // console.log(this.gps_data[2]);
    Geolocation.getCurrentPosition({enableHighAccuracy: true}).then((position) => {
   
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.log("latLng is: "+latLng);
        this.latlon_data.push("native push: " + latLng);
    });
    // this.latlon_data.push("lat push: " + this.latitude);
    // this.latlon_data.push("lat push: " + this.longitude);

    // just for effect
    var randomnumber = Math.floor(Math.random() * 2)
    if (randomnumber == 1) {
      // this.heroes.push("img/HeroWarrior2.png")
      this.heroes = "img/HeroMystic.png"
    } else {
      // this.heroes.push("img/HeroGatherer2.png")
      this.heroes = "img/HeroWarrior2.png"
    }

    // if (this.a[0] == "1") {
    //   // this.heroes.push("img/HeroWarrior2.png")
    //   this.heroes = "img/HeroMystic.png"
    // } else {
    //   // this.heroes.push("img/HeroGatherer2.png")
    //   this.heroes = "img/HeroWarrior2.png"
    // }
  }





  onData(data) { // data received from Arduino
    console.log(this.bytesToString(data));
  }

  failure = function() {
    console.log("Failed writing data to the redbear hardware");
  };

  connectToCharacteristic(deviceID, characteristic) {
    console.log('Connect To Characteristic');
    console.log(deviceID);
    console.log(characteristic);
  }

  // ASCII only
  stringToBytes(string) {
     var array = new Uint8Array(string.length);
     for (var i = 0, l = string.length; i < l; i++) {
         array[i] = string.charCodeAt(i);
      }
      return array.buffer;
  }
  // ASCII only
  bytesToString(buffer) {
      return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }

}
