import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CordovaProvider } from '../../providers/cordova/cordova';
declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	hvPlugin: any;
	castSession: any;
  	currentMedia: any;
  	sessionRequest: any;
  	apiConfig: any;

  constructor(public navCtrl: NavController, public cp: CordovaProvider) {



  	 this.hvPlugin = cordova.require("cordova-plugin-chromecast.ChromecastApi");
      console.log('hv', this.hvPlugin);
      this.initializeCastApi();

      setTimeout(() => {
         this.castConnect();

      },5000);

 }


 
initializeCastApi(){
  console.log(this.hvPlugin.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
    this.sessionRequest = new this.hvPlugin.SessionRequest(this.hvPlugin.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
    this.apiConfig = new this.hvPlugin.ApiConfig(this.sessionRequest,
        this.sessionListener,
        this.receiverListener);
    this.hvPlugin.initialize(this.apiConfig, this.onInitSuccess, this.onError);

};
 

 
/**
* Calling the castConnect function, a popup will show to choose from available devices
*/

   
  /**
  * | Event listeners
  * V
  */
   
  dal(e) {
    this.castSession = e;

		// HomePage.castSession = e;
  //        console.log('vamos pal dormitorio');
  //       HomePage.sendMedia('https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4', 'video/mp4');
      
     
  }
   
  onLaunchError(e) {
      console.error(e);
  }
   
  sessionListener(e) {
      console.log('sessionListener');
      console.log(e);
  }
   
  receiverListener(e) {
      console.log('receiverListener');

      console.log(e);
  }
   
  onInitSuccess(e) {
      console.log('onInitSuccess');
      console.log(e);
     
  }
   
  onError(e) {
      console.error('onError');
      console.error(e);
  }
   
  onMediaDiscovered(how, media) {
      console.log(how);
      this.currentMedia = media;
  }
   
  onMediaError(e) {
      console.error('onMediaError');
      console.error(e);
  }


  castConnect() {
      this.castSession = null;
      this.hvPlugin.requestSession( (e) => {
      	this.castSession = e;
      }, this.onLaunchError);
  }  
   
  /**
  * Sends media to the chromecast
  * NOTE: Default receiver only accepts media files (videos, audio and/or subtitles)  
  *
  * @param {string} url - url
  * @param {string} type - mime type 
  */
   
  sendMedia(url, type) {


      var mediaInfo = new this.hvPlugin.media.MediaInfo(url, type);
   
      var request =  new this.hvPlugin.media.LoadRequest(mediaInfo);
      this.castSession.loadMedia(request,

          this.onMediaDiscovered.bind(this, 'loadMedia'),
          this.onMediaError);
  }

}
