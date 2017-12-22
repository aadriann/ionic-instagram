import { Injectable } from '@angular/core';

import { ToastController } from 'ionic-angular';
import { UploadFileInterface } from '../../interfaces/uploadFile.interface';

// Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import 'rxjs/add/operator/map';

@Injectable()
export class UploadFileProvider {

images: any[] = [];
lastKey: string = null;

  constructor(private toastCtrl: ToastController, private angularFirebaseDb: AngularFireDatabase) {
    this.getLastKey().subscribe(
      () => this.getImages());
  }

  private getLastKey() {
    return this.angularFirebaseDb.list('/post', ref => ref.orderByKey().limitToLast(1))
             .valueChanges()
             .map((post: any) => {
               console.log(post);
               this.lastKey = post[0].key;
               this.images.push(post[0]);
             })
  }

  getImages() {
    return new Promise((resolve, reject) => {
      this.angularFirebaseDb.list('/post', ref =>
      ref.limitToLast(3)
      .orderByKey()
      .endAt(this.lastKey))
      .valueChanges()
      .subscribe((posts: any) => {
        posts.pop();
          if( posts.length == 0 ){
            console.log('Ya no hay más registros');
            resolve(false);
            return;
          }
          this.lastKey = posts[0].key;
          for( let i = posts.length-1;  i >=0; i-- ){
            let post = posts[i];
            this.images.push(post);
          }
          resolve(true);
      })
    });
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
          let url = uploadTask.snapshot.downloadURL;
          this.createPost(file.title, url, fileName);
          resolve();
        }
      )
    });
    return promise;
  }

  private createPost(title: string, url: string, fileName: string) {
    let post: UploadFileInterface = {
      img: url,
      title: title,
      key: fileName
    };
    console.log("Post", JSON.stringify(post));
    //automatic id: this.angularFirebaseDb.list('/post').push(post);
    this.angularFirebaseDb.object(`/post/${fileName}`).update(post)
    .then((response) => {
      this.images.push(response);
    }, (error) => {
      this.showToast(error);
    });
  }

  showToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).present();
  }
}
