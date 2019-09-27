import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

declare let ml5: any;

interface IPrediction {
  label: string;
  confidence: number;
}

@Component({
  selector: 'app-pix2pix',
  templateUrl: './pix2pix.page.html',
  styleUrls: ['./pix2pix.page.scss']
})
export class Pix2pixPage implements OnInit {
  public header = 'Pix2Pix';
  public mobileNetFeatureExtractor;
  public featureClassifier;
  public label;
  public confidence;
  public newLabel;
  public loss: number;
  public iteration = 0;
  public results: string;
  private TRAIN_ITERATIONS_LIMIT = 100;
  private MINIMUM_LOSS = 0.01;
  public showTrainButton = false;
  public showPredictButton = false;
  public loading: boolean;
  predictions: Array<IPrediction>;
  @ViewChild('video') public video: ElementRef;
  @ViewChild('canvas') public canvas: ElementRef;

  @Input() classifier;

  constructor() {}

  async ngOnInit() {
    this.loading = true;
    this.classifier = await ml5.pix2pix('models/customModel.pict');
    this.loading = false;
  }

  async predict() {
    this.predictions = await this.classifier.transfer(
      this.canvas,
      (err, result) => {
        console.log(result);
      }
    );
  }
}
