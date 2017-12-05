import { Injectable } from '@angular/core';

import { ToastController } from 'ionic-angular';
import { UploadFileInterface } from '../../interfaces/uploadFile.interface';

// Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class UploadFileProvider {

  constructor(private toastCtrl: ToastController) {
    console.log('Hello UploadFileProvider Provider');
  }

  uploadFile(file: UploadFileInterface) {

    let promise = new Promise((resolve, reject) => {
      this.showToast("Loading...");
      let firebaseStorage = firebase.storage().ref();
      let fileName: string = new Date().valueOf().toString();
      let uploadTask: firebase.storage.UploadTask = 
        firebaseStorage.child(`img/${ fileName }`)
        .putString(file.img, 'base64', { contentType: 'image/jpeg' });

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
        () => {}, // Porcentage de cuantos MB se han subido
        (error) => { // Error
          console.error("Upload Error", JSON.stringify(error));
          this.showToast(JSON.stringify(error));
          reject(); // Throw catch
        }, 
        () => { // Success
          console.log("OK");
          this.showToast("Uploaded image");
          resolve();
        } 
      )
    });
    return promise;
  }

  showToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).present();
  }
}
