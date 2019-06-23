import {Component, Input, OnInit} from '@angular/core';

declare let ml5: any;

@Component({
  selector: 'app-image-classifier',
  templateUrl: 'image-classifier.page.html',
})
export class ImageClassifierPage implements OnInit {
  MODEL = 'MobileNet';
  IMAGE_SIZE = 224;
  imageSrc: string | ArrayBuffer;
  predictions: Array<object>;

  @Input() classifier;
  @Input() image;

  constructor() {
  }

  ngOnInit() {
    this.classifier = ml5.imageClassifier(this.MODEL, () => {
      console.log('Model Loaded!');
    });
  }

  async predict(img) {
    console.log('PREDICT');
    this.predictions = await this.classifier.predict(img);
  }

  readURL(e: Event): void {
    const files: FileList = (e.target as HTMLInputElement).files;

    if (files && files[0]) {
      const file = files[0] as any;

      file.width = this.IMAGE_SIZE;
      file.height = this.IMAGE_SIZE;

      const reader = new FileReader();
      reader.onload = () => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }
}
