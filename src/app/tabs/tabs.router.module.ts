import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'image-recognition',
        children: [
          {
            path: '',
            loadChildren:
              '../image-recognition/image-recognition.module#ImageRecognitionPageModule'
          }
        ]
      },
      {
        path: 'predict-number',
        children: [
          {
            path: '',
            loadChildren:
              '../predict-number/predict-number.module#PredictNumberModule'
          }
        ]
      },
      {
        path: 'image-classifier',
        children: [
          {
            path: '',
            loadChildren:
              '../image-classifier/image-classifier.module#ImageClassifierPageModule'
          }
        ]
      },
      {
        path: 'video-classifier',
        children: [
          {
            path: '',
            loadChildren:
              '../video-classifier/video-classifier.module#VideoClassifierPageModule'
          }
        ]
      },
      {
        path: 'pix2pix',
        children: [
          {
            path: '',
            loadChildren: '../pix2pix/pix2pix.module#Pix2pixPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/image-recognition',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/image-recognition',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
