import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';

declare let ml5: any;
declare let require: any;

const URL = '.';

@Component({
  selector: 'app-image-classifier',
  templateUrl: 'image-classifier.page.html',
  styleUrls: ['image-classifier.page.scss']
})
export class ImageClassifierPage implements OnInit {
  result: any;
  imageSrc: string | ArrayBuffer;
  src = '../../assets/images/plane.jpg';
  probability: any;
  results = [{
    className : null,
    probability: null,
  }];
  inferenceTime = null;
  IMAGE_SIZE = 224;
  predictions: Array<object>;

  @Input() classifier;
  @Input() image;

  // public uploader: FileUploader = new FileUploader({ url: URL });

  constructor(private http: HttpClient) {
    // this.setImageSrc();
  }

  // async setImageSrc() {
  //   const reader = new FileReader();
  //
  //   reader.onload = (event) => { // called once readAsDataURL is completed
  //     this.src = event.target.result;
  //   };
  //
  //   reader.readAsDataURL(this.image.rawFile); // read file as data url
  // }

  ngOnInit() {
    this.classifier = ml5.imageClassifier('MobileNet', () => {
      console.log('Model Loaded!');
    });
    // this.setImageSrc();
  }

  // async classifyImage(image) {
  //   image.width = this.IMAGE_SIZE;
  //   image.height = this.IMAGE_SIZE;
  //
  //   const startTime = performance.now();
  //   this.results = await this.classifier.classifyImage(image);
  //   this.inferenceTime = Math.floor(performance.now() - startTime);
  //   console.log(this.results);
  // }

  // createImageFromBlob(image: Blob) {
  //   const reader = new FileReader();
  //   reader.addEventListener('load', () => {
  //     this.image = reader.result;
  //   }, false);
  //
  //   if (image) {
  //     reader.readAsDataURL(image);
  //   }
  // }

  predict(img) {
    // console.log('image:', this.image);
    // // this.createImageFromBlob(this.image);
    // console.log('image:', this.image);
    // const reader = new FileReader();
    // reader.readAsDataURL(image.rawFile);
    console.log(img);
    console.log(img instanceof HTMLImageElement);
    console.log(img instanceof HTMLCanvasElement);
    // this.classifier.classify(img, (err, results) => {
    //   // this.result = results[0].className;
    //   // this.probability = results[0].probability.toFixed(4);
    //   console.log(results);
    // });
    this.classifier.predict(img, (err, results) => {
      // this.result = results[0].className;
      // this.probability = results[0].probability.toFixed(4);
      this.predictions = results;
      console.log(results);
    });
  }

  readURL(event: Event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      file.width = this.IMAGE_SIZE;
      file.height = this.IMAGE_SIZE;

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }
}
