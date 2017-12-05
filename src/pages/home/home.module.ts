import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePageComponent } from './home.component';

@NgModule({
  declarations: [
    HomePageComponent,
  ],
  imports: [
    IonicPageModule.forChild(HomePageComponent),
  ],
})
export class HistoricalPageModule {}
