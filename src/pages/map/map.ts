import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConnectivityService } from '../../providers/connectivity-service';
import { Geolocation } from 'ionic-native';
 
declare var google;
 
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
 
  @ViewChild('map') mapElement: ElementRef;
 
  map: any;
  mapInitialised: boolean = false;
  apiKey: "AIzaSyBcfih8wpdQJ5lgtD173GynrpZzcW__D-w";
 
  constructor(public nav: NavController, public connectivityService: ConnectivityService) {
    this.loadGoogleMaps();
  }
 
  loadGoogleMaps(){
 
    this.addConnectivityListeners();
 
  if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
    console.log("Google maps JavaScript needs to be loaded.");
    this.disableMap();
 
    if(this.connectivityService.isOnline()){
      console.log("online, loading map");
 
      //Load the SDK
      window['mapInit'] = () => {
        this.initMap();
        this.enableMap();
      }
 
      let script = document.createElement("script");
      script.id = "googleMaps";
 
      if(this.apiKey){
        script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
      } else {
        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
      }
 
      document.body.appendChild(script);  
 
    } 
  }
  else {
 
    if(this.connectivityService.isOnline()){
      console.log("showing map");
      this.initMap();
      this.enableMap();
    }
    else {
      console.log("disabling map");
      this.disableMap();
    }
 
  }
 
  }
 
  initMap(){
 
    this.mapInitialised = true;
 
    Geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker();
 	  this.addMissions();
    });
 
  }

  addMissions() {
//       37.8741, -122.2374
// 37.8922, -122.2730
// 37.8960, -122.2495
// 37.8860, -122.2295
// 37.8928, -122.2425
// 37.8854, -122.2631
// 37.8719, -122.2733
// 37.87995, -122.2694
// 37.8736, -122.2544
// 37.8792, -122.2465
// 37.8682, -122.2685
		  // var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
		  var Ice1 = "img/Ice_icon.svg";
      var beachMarker1 = new google.maps.Marker({
        position: {lat: 37.8741, lng: -122.2374},
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: Ice1
      });
      let iceContent1 = "<h6>Save endangered butterflies at the Botanical Gardens!</h6>";          
      this.addInfoWindow(beachMarker1, iceContent1);

      var Ice2 = "img/Ice_icon.svg";
      var beachMarker2 = new google.maps.Marker({
        position: {lat: 37.8922, lng: -122.2730},
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: Ice2
      });
      let iceContent2 = "<h6>Save family of squirells at Indian Rock Park!</h6>";          
      this.addInfoWindow(beachMarker2, iceContent2);

      var Ice3 = "img/Ice_icon.svg";
      var beachMarker3 = new google.maps.Marker({
        position: {lat: 37.8960, lng: -122.2495},
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: Ice3
      });
      let iceContent3 = "<h6>Save flock of geese at Tilden!</h6>";          
      this.addInfoWindow(beachMarker3, iceContent3);

      var Ice4 = "img/Ice_icon.svg";
      var beachMarker4 = new google.maps.Marker({
        position: {lat: 37.8860, lng: -122.2295},
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: Ice4
      });
      let iceContent4 = "<h6>Save pack of wolves at Tilden!</h6>";          
      this.addInfoWindow(beachMarker4, iceContent4);

      var Ice5 = "img/Ice_icon.svg";
      var beachMarker5 = new google.maps.Marker({
        position: {lat: 37.8928, lng: -122.2425},
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: Ice5
      });
      let iceContent5 = "<h6>Save herd of deer at Tilden!</h6>";          
      this.addInfoWindow(beachMarker5, iceContent5);

      var Ice6 = "img/Ice_icon.svg";
      var beachMarker6 = new google.maps.Marker({
        position: {lat: 37.8928, lng: -122.2425},
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: Ice6
      });
      let iceContent6 = "<h6>Save rare species of flowers at the Rose Garden!</h6>";          
      this.addInfoWindow(beachMarker5, iceContent6);

      var Fire1 = "img/Fire_icon.svg";
		  var beachMarker7 = new google.maps.Marker({
		    position: {lat: 37.8682, lng: -122.2685},
		    map: this.map,
		    animation: google.maps.Animation.DROP,
		    icon: Fire1
		  });
		  let fireContent1 = "<h6>Save Berkeley Public Library from fire!</h6>";          
		  this.addInfoWindow(beachMarker7, fireContent1);

		  var Fire2 = "img/Fire_icon.svg";
		  var beachMarker8 = new google.maps.Marker({
		    position: {lat: 37.8792, lng: -122.2465},
		    map: this.map,
		    animation: google.maps.Animation.DROP,
		    icon: Fire2
		  });
		  let fireContent2 = "<h6>Save Lawrence Hall of Science from fire!</h6>";          
		  this.addInfoWindow(beachMarker8, fireContent2);

      var Fire3 = "img/Fire_icon.svg";
      var beachMarker9 = new google.maps.Marker({
        position: {lat: 37.8736, lng: -122.2544},
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: Fire3
      });
      let fireContent3 = "<h6>Save Lawrence Hall of Science from fire!</h6>";          
      this.addInfoWindow(beachMarker9, fireContent3);

      var Fire4 = "img/Fire_icon.svg";
      var beachMarker10 = new google.maps.Marker({
        position: {lat: 37.87995, lng: -122.2694},
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: Fire4
      });
      let fireContent4 = "<h6>Save Cheeseboard from fire!</h6>";          
      this.addInfoWindow(beachMarker10, fireContent4);

      var Fire5 = "img/Fire_icon.svg";
      var beachMarker11 = new google.maps.Marker({
        position: {lat: 37.8719, lng: -122.2733},
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: Fire5
      });
      let fireContent5 = "<h6>Save Trader Joe's from fire!</h6>";          
      this.addInfoWindow(beachMarker11, fireContent5);

      var Fire6 = "img/Fire_icon.svg";
      var beachMarker12 = new google.maps.Marker({
        position: {lat: 37.8760, lng: -122.2588},
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: Fire6
      });
      let fireContent6 = "<h6> Oh no! Save Jacob's Hall from the Fire Villain</h6>";          
      this.addInfoWindow(beachMarker12, fireContent6);
      
	}
 
  addMarker(){
 		console.log("ad marker");
	  	let marker = new google.maps.Marker({
	    map: this.map,
	    animation: google.maps.Animation.DROP,
	    position: this.map.getCenter()
	    // position: new google.maps.LatLng(37.8716, -122.2727)
	  });
	 
	  let content = "<h5>Let's save the world!</h5>";          
	 
	  this.addInfoWindow(marker, content);
	 
	}

//   37.8682, 122.2685
// 37.87995, -122.2694
// 37.86628242, -122.26512909
// 37.8792, -122.2465
// 37.8928, -122.2425
// 37.8879, -122.2283
// 37.8960, -122.2495

  disableMap(){
    console.log("disable map");
  }
 
  enableMap(){
    console.log("enable map");
  }
  	addInfoWindow(marker, content){
 		
	  let infoWindow = new google.maps.InfoWindow({
	    content: content
	  });
	 
	  google.maps.event.addListener(marker, 'click', () => {
	    infoWindow.open(this.map, marker);
	  });
	 
	}
 
  addConnectivityListeners(){
 
    let onOnline = () => {
 
      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
          this.loadGoogleMaps();
 
        } else {
 
          if(!this.mapInitialised){
            this.initMap();
          }
 
          this.enableMap();
        }
      }, 2000);
 
    };
 
    let onOffline = () => {
      this.disableMap();
    };
 
    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);
 
  }
 
}
