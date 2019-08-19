import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';

declare let ml5: any;

@Component({
  selector: 'app-video-classifier',
  templateUrl: './video-classifier.page.html'
})
export class VideoClassifierPage implements OnInit, AfterViewInit {
  header = 'Video Classifier';
  loading: boolean;
  result: string;
  probability: number;
  @ViewChild('video') public video: ElementRef;

  constructor() {}

  async ngOnInit() {
    this.loading = true;
    const classifier = await ml5.imageClassifier('MobileNet');

    this.loading = false;
    setInterval(() => {
      this.classify(classifier);
    }, 5000);
  }

  classify = classifier => {
    classifier.classify(this.video.nativeElement).then(results => {
      console.log(results);
      this.result = results[0].label;
      this.probability = results[0].confidence.toFixed(4);
    });
  };

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }
  }
}
