import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Pix2pixPage } from './pix2pix.page';
import { HttpClientModule } from '@angular/common/http';
import { ImageRecognitionPage } from '../image-recognition/image-recognition.page';
import { ProgressBarModule } from 'angular-progress-bar';
import { ComponentsModule } from '../components/components.module';

declare let ml5: any;

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: ImageRecognitionPage }]),
    ProgressBarModule,
    ComponentsModule
  ],
  declarations: [Pix2pixPage]
})
export class Pix2pixPageModule {}
