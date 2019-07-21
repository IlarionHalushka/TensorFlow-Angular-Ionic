import { Component, OnInit, ViewChild } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { DrawableDirective } from '../directives/drawable.directive';

const pathToModel = '/assets/model.json';

@Component({
  selector: 'app-predict-number',
  templateUrl: 'predict-number.page.html',
  styleUrls: ['predict-number.page.scss']
})
export class PredictNumberPage implements OnInit {
  predictedNumber: string;
  loading: boolean;
  private model: any;
  private predictions: any;

  @ViewChild(DrawableDirective) canvas;

  ngOnInit() {
    this.loadModel();
  }

  async loadModel() {
    this.loading = true;
    this.model = await tf.loadLayersModel(pathToModel);
    this.loading = false;
  }

  async predict(imageData: ImageData) {
    await tf.tidy(() => {
      // Convert the canvas pixels to
      let img = tf.browser.fromPixels(imageData, 1);
      // @ts-ignore
      img = img.reshape([1, 28, 28, 1]);
      img = tf.cast(img, 'float32');

      // Make and format the predications
      const output = this.model.predict(img);

      // Save predictions on the component
      this.predictions = Array.from(output.dataSync());

      let indexMaxValue = 0;

      for (let i = 0; i < this.predictions.length; i++) {
        if (this.predictions[i] > this.predictions[indexMaxValue]) {
          indexMaxValue = i;
        }
      }
      this.predictedNumber = `${indexMaxValue}`;
    });
  }

  clear() {
    this.predictedNumber = '';
  }
}
