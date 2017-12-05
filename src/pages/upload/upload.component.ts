import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

// Native Plugins
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPageComponent {

  title: string;
  previewImagePost: string;
  
  constructor(private viewCtrl: ViewController, private camera: Camera, private imagePicker: ImagePicker) {}
  
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

  uploadGalleryPhoto() {
    const options: ImagePickerOptions = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
    // selection of a single image, the plugin will return it.
    maximumImagesCount: 1,
    
    // max width and height to allow the images to be.  Will keep aspect
    // ratio no matter what.  So if both are 800, the returned image
    // will be at most 800 pixels wide and 800 pixels tall.  If the width is
    // 800 and height 0 the image will be 800 pixels wide if the source
    // is at least that wide.
    
    // quality of resized image, defaults to 100
    quality: 100,

    // output type, defaults to FILE_URIs.
    // available options are 
    // window.imagePicker.OutputType.FILE_URI (0) or 
    // window.imagePicker.OutputType.BASE64_STRING (1)
    outputType: 1

    //https://ionicframework.com/docs/native/image-picker/
    }
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.previewImagePost = 'data:image/jpeg;base64,' + results[i];
      }
    }, (err) => {
      console.log("Error Gallery", JSON.stringify(err));
     });
  }
}
