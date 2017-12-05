import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

// Native Plugins
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPageComponent {

  private title: string;
  private previewImagePost: string;
  
  constructor(private viewCtrl: ViewController, private camera: Camera) {}
  
  closeModal() {
    this.viewCtrl.dismiss();
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.previewImagePost = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
      console.log("Error Camera", JSON.stringify(err));
     });
  }
}
