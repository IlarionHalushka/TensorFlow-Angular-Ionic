import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  // { path: 'tabs', loadChildren: './tab1/tab1.module#Tab1PageModule' },
  { path: 'imageClassifier', loadChildren: './imageClassifier/image-classifier.module#ImageClassifierPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
