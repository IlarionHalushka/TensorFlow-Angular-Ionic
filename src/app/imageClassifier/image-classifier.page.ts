import {Component, OnInit} from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import {HttpClient} from '@angular/common/http';
import {ResponseContentType} from '@angular/http';

declare let ml5: any;
declare let require: any;

@Component({
  selector: 'app-image-classifier',
  templateUrl: 'image-classifier.page.html',
  styleUrls: ['image-classifier.page.scss']
})
export class ImageClassifierPage implements OnInit {
  classifier: any;
  result: any;
  image: any;
  probability: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.classifier = ml5.imageClassifier('MobileNet', () => {
      console.log('Model Loaded!');
      this.predict();
    });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.image = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  predict() {
    this.http.get(
        'https://images.unsplash.com/photo-1556228453-46a07da3df9a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&dl=curology-1540938-unsplash.jpg',
        { responseType: 'blob' }
        )
        .subscribe(image => {
          console.log('image:', image);
          this.createImageFromBlob(image);
          console.log('image:', this.image);
          this.classifier.predict(this.image, (err, results) => {
            this.result = results[0].className;
            this.probability = results[0].probability.toFixed(4);
            console.log(results);
          });
    });
  }
}
