import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild
} from '@angular/core';
declare let ml5: any;

@Component({
  selector: 'app-image-recognition',
  templateUrl: 'image-recognition.page.html'
})
export class ImageRecognitionPage implements OnInit, AfterViewInit {
  public mobileNetFeatureExtractor;
  public featureClassifier;
  public label;
  public confidence;
  public newLabel;
  public currentProgress = 0;
  public loss: number;
  public iteration: number;
  public results: Array<object>;
  @ViewChild('video') public video: ElementRef;
  @ViewChild('canvas') public canvas: ElementRef;

  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.mobileNetFeatureExtractor = ml5.featureExtractor(
      'MobileNet',
      { numClasses: 3, numLabels: 3 },
      () => {
        this.featureClassifier = this.mobileNetFeatureExtractor.classification(
          this.video.nativeElement,
          () => console.log('Video ready')
        );
        console.log(this.mobileNetFeatureExtractor);
        console.log(this.featureClassifier);
      }
    );
  }

  async addImage() {
    await this.capture();
    this.featureClassifier.addImage(this.newLabel);
  }

  train() {
    this.iteration = 0;
    this.loss = 0;
    this.currentProgress = 0;
    this.featureClassifier.train(loss => {
      if (loss < 0.05) {
        this.iteration = 100;
        this.currentProgress = 100;
        this.mobileNetFeatureExtractor.classify((e, r) => {
          this.gotResults(e, r);
        });
      } else {
        this.zone.run(() => {
          ++this.currentProgress;
          ++this.iteration;
          this.loss = loss;
        });
      }
    });
  }

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }
  }

  public async capture() {
    await this.canvas.nativeElement
      .getContext('2d')
      .drawImage(this.video.nativeElement, 0, 0, 320, 240);
  }

  gotResults(err, results) {
    if (err) {
      return console.error(err);
    }

    this.zone.run(() => {
      this.label = results[0].label;
      this.confidence = results[0].confidence;
      this.results = results.join(',');
    });

    this.mobileNetFeatureExtractor.classify((e, r) => {
      this.gotResults(e, r);
    });
  }
}
