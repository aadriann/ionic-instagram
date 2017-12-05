import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

// Own Components
import { UploadPageComponent } from "../upload/upload.component";

// Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePageComponent {

  posts: Observable<any[]>;

  constructor(public modalCtrl: ModalController, afDB: AngularFireDatabase) {
    this.posts = afDB.list('post').valueChanges();
  }

  showPostModal() {
    let modal = this.modalCtrl.create(UploadPageComponent);
    modal.present();
  }

}
