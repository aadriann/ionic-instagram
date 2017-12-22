import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

// Own Components
import { UploadPageComponent } from "../upload/upload.component";
import { UploadFileProvider } from '../../providers/upload-file/upload-file';

// Firebase
// import { AngularFireDatabase } from 'angularfire2/database';
// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePageComponent {

  // posts: Observable<any[]>;
  more: boolean = true;

  constructor(public modalCtrl: ModalController, private _ufp: UploadFileProvider) {
    // this.posts = afDB.list('post').valueChanges();
  }

  showPostModal() {
    let modal = this.modalCtrl.create(UploadPageComponent);
    modal.present();
  }

  doInfinite(infiniteScroll) {
    this._ufp.getImages().then(
      (more: boolean) => {
        this.more = more;
        infiniteScroll.complete();
      }
    );
  }
}
