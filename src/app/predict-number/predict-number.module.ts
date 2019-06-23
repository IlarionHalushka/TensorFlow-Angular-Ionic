import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {PredictNumberPage} from './predict-number.page';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DrawableDirective} from './drawable.directive';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: PredictNumberPage }])
  ],
  declarations: [PredictNumberPage, DrawableDirective]
})
export class Tab1PageModule {}

