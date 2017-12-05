import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadPageComponent } from './upload.component';

@NgModule({
  declarations: [
    UploadPageComponent,
  ],
  imports: [
    IonicPageModule.forChild(UploadPageComponent),
  ],
})
export class UploadPageModule {}
