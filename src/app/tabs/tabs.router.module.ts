import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
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
        path: '',
        redirectTo: '/tabs/predict-number',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/predict-number',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
