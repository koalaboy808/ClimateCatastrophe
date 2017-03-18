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
  apiKey: any;
 
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
		  // var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
		  var image = "img/Fire-01.svg";
		  var beachMarker = new google.maps.Marker({
		    position: {lat: 37.87888445, lng: -122.26418495},
		    map: this.map,
		    animation: google.maps.Animation.DROP,
		    icon: image
		  });
		  let content = "<h6>Save the endangered kittens!</h6>";          
		  this.addInfoWindow(beachMarker, content);

		  var image2 = "img/Wind-01.svg";
		  var beachMarker2 = new google.maps.Marker({
		    position: {lat: 37.86997518, lng: -122.25633144},
		    map: this.map,
		    animation: google.maps.Animation.DROP,
		    icon: image2
		  });
		  let content2 = "<h6>Re-plant a baby tree!</h6>";          
		  this.addInfoWindow(beachMarker2, content2);

		  var image3 = "img/Rock-01.svg";
		  var beachMarker3 = new google.maps.Marker({
		    position: {lat: 37.86628242, lng: -122.26512909},
		    map: this.map,
		    animation: google.maps.Animation.DROP,
		    icon: image3
		  });
		  let content3 = "<h6>Put out the fire!</h6>";          
		  this.addInfoWindow(beachMarker3, content3);
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
