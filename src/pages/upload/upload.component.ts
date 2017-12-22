import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { UploadFileProvider } from '../../providers/upload-file/upload-file'
import { UploadFileInterface } from '../../interfaces/uploadFile.interface';

// Native Plugins
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPageComponent {

  title: string = "";
  previewImagePost: string = "";
  imagePost: string;

  constructor(private viewCtrl: ViewController,
    private camera: Camera,
    private imagePicker: ImagePicker,
    public _cap: UploadFileProvider) {}

  closeModal() {
    this.viewCtrl.dismiss();
  }

  openCamera() {
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.previewImagePost = 'data:image/jpeg;base64,' + imageData;
      this.imagePost = imageData;
     }, (err) => {
      // Handle error
      console.log("Error Camera", JSON.stringify(err));
     });
  }

  uploadGalleryPhoto() {
    let options: ImagePickerOptions = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
    // selection of a single image, the plugin will return it.
    quality: 70,
    outputType: 1,
    maximumImagesCount: 1,
    width: 8000,
    height: 8000
    // max width and height to allow the images to be.  Will keep aspect
    // ratio no matter what.  So if both are 800, the returned image
    // will be at most 800 pixels wide and 800 pixels tall.  If the width is
    // 800 and height 0 the image will be 800 pixels wide if the source
    // is at least that wide.

    // quality of resized image, defaults to 100

    // output type, defaults to FILE_URIs.
    // available options are
    // window.imagePicker.OutputType.FILE_URI (0) or
    // window.imagePicker.OutputType.BASE64_STRING (1)

    //https://ionicframework.com/docs/native/image-picker/
    }
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.previewImagePost = 'data:image/jpeg;base64,' + results[i];
        this.imagePost = results[i];
        console.log("Image", results[i]);
      }
    }, (err) => {
      console.log("Error Gallery", JSON.stringify(err));
     });
  }

  createPost() {
    let file: UploadFileInterface = {
      title: this.title,
      img: this.imagePost
    }
    this._cap.uploadFile(file).then( () => {
      this.closeModal();
    });
  }
}
