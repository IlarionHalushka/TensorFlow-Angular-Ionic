import {Component, OnInit, ViewChild} from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import {DrawableDirective} from './drawable.directive';

@Component({
  selector: 'app-predict-number',
  templateUrl: 'predict-number.page.html',
})
export class PredictNumberPage implements OnInit {
  linearModel: tf.Sequential;
  prediction: any;
  predictedNumber: string;
  model: any;
  predictions: any;
  loading: boolean;

  @ViewChild(DrawableDirective) canvas;

  ngOnInit() {
    this.loadModel();
  }

  async loadModel() {
    this.loading = true;
    this.model = await tf.loadLayersModel('/assets/model.json');
    this.loading = false;
  }

  async predict(imageData: ImageData) {
    const pred = await tf.tidy(() => {
      // Convert the canvas pixels to
      let img = tf.browser.fromPixels(imageData, 1);
      // @ts-ignore
      img = img.reshape([1, 28, 28, 1]);
      img = tf.cast(img, 'float32');

      // Make and format the predications
      const output = this.model.predict(img) as any;

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
